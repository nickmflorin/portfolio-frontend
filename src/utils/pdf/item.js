import _ from 'underscore'

import { formatDegree, formatDateRange, formatGpa } from 'utils/formatting'
import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files'

import { Sizes, Margins, Styles, Icons } from './constants'
import { Doc } from './base'
import { Ladder, Rung } from './ladder'


class Project extends Doc {
  constructor(config, name, desc){
    super(config)
    this.name = name
    this.desc = desc
  }
  write = async ({ x0 = 0, marginBottom=0 }) => {

    const y0 = this.carriage.y // Store Ref for Lines
    const nameHeight = this.textHeight(this.name, Styles.projectTitle)
    const descHeight = this.totalTextHeight(this.desc, { x0: x0, ...Styles.body })

    const rung = new Rung(this.config, {
      x1: x0 - 4,
      y0: y0 + 0.5 * (nameHeight + descHeight)
    })

    await this.blockText(this.name, { x0: x0, ...Styles.projectTitle})
    await this.description(this.desc, { x0: x0, ...Styles.body })
    this.carriage.increment(marginBottom)
    this.conditionalPageBreak()
    return rung
  }
}


class Item extends Doc {

  constructor(config, obj) {
    super(config)
    this.obj = obj
    this.ladder = null;
  }

  get dates(){
    return formatDateRange(
      this.obj.start_year, this.obj.start_month, this.obj.end_year,
      this.obj.end_month, true)
  }

  get projects() {
    return _.filter(this.obj.projects, (project) => project.include_in_resume)
  }

  writeProjects = async ({ ...options }) => {

    for (var i = 0; i < this.projects.length; i++) {
      const description = this.projects[i].resume_description || this.projects[i].description
      const project = new Project(this.config, this.projects[i].name, description)
      const rung = await project.write(options)

      this.ladder.addRung(rung)
    }
    if (this.ladder.rungs.length !== 0){
        await this.ladder.draw()
    }
  }

  header = async ({ x0 = 0, marginBottom = 0 }) => {

    const drawLogo = async ({ x0 = 0 }) => {
      var extension = getFileExtension(this.logo)
      var dimensions = await getImageDimensions(this.logo)
      var data = await getBase64Encoded(this.logo)

      // Width should remain constant, height varies to maintain aspect ratio.
      const height = dimensions.inverseRatio * Sizes.logo.width
      const mid = this.carriage.y + 0.5 * Sizes.logo.height  // Desired vertical center location of image.

      const y0 = mid - 0.5 * height
      this.doc.addImage(data, extension, x0, y0, Sizes.logo.width, height);
    }

    await drawLogo({ x0: x0 })
    x0 = this.frames.textContent.x0

    await this.blockText(this.title, { x0: x0, ...Styles.title})
    await this.blockText(this.subtitle, { x0: x0, ...Styles.subtitle})

    if (this.inlines.length !== 0) {
      await this.drawInlines(this.inlines, {
        x0: x0,
        iconMargin: 3,
        spacing: 8,
        ...Styles.inlines
      })
    }
    this.carriage.increment(marginBottom)
  }

  write = async ({ x0 = 0, marginBottom=0 }) => {
    const rungY = this.carriage.y + 0.5 * Sizes.logo.height

    await this.header({x0: x0, marginBottom: 0})

    // Wait Until Carriage Below Header
    this.ladder = new Ladder(this.config, {
      x0: x0 + 0.5 * Sizes.logo.width,
      y0: this.carriage.y
    })

    await this.desc({
      marginBottom: 6,
      x0: x0 + Sizes.logo.width + Margins.logo,
      ...Styles.body
    })

    await this.writeProjects({
      marginBottom: 6,
      x0: x0 + Sizes.logo.width + Margins.logo
    })
    this.carriage.increment(marginBottom)

    return new Rung(this.config, {
      x1: this.frames.content.x0 - 4,
      y0: rungY
    })
  }
}

export class ExperienceItem extends Item {

  get location(){
    return `${this.obj.company.city}, ${this.obj.company.state}`
  }

  get title(){
    return this.obj.title
  }

  get subtitle() {
    return this.obj.company.name
  }

  get logo(){
    return this.obj.company.logo
  }

  get inlines() {
    return [
      { text: this.location, icon: Icons.Pin },
      { text: this.dates, icon: Icons.Calendar}
    ]
  }

  desc = async ({ ...options }) => {
    // Right now, we do not want to include the company description if the
    // experience has a description.
    if (this.obj.description) {
      await this.description(this.obj.description, options)
    }
    else if (this.obj.company.description) {
      await this.description(this.obj.company.description, options)
    }
  }
}

export class EducationItem extends Item {

  get location(){
    return `${this.obj.school.city}, ${this.obj.school.state}`
  }

  get title(){
    return formatDegree(this.obj.degree, this.obj.major)
  }

  get subtitle() {
    return this.obj.school.name
  }

  get logo(){
    return this.obj.school.logo
  }

  get inlines() {
    return [
      { text: this.location, icon: Icons.Pin },
      { text: this.dates, icon: Icons.Calendar},
      { text: formatGpa(this.obj.gpa), icon: Icons.PaperPlane}
    ]
  }

  desc = async ({ ...options }) => {
    if (this.obj.description) {
      await this.description(this.obj.description, options)
    }
    else if (this.obj.school.description) {
      await this.description(this.obj.school.description, options)
    }
    if (this.obj.minor) {
      await this.description(`Minor in ${this.obj.minor}`, {
        x0: options.x0,
        marginBottom: 0,
        // ...options
      })
    }
    if (this.obj.concentration) {
      await this.description(`Concentration in ${this.obj.concentration}`, {
        x0: options.x0,
        marginBottom: 0,
        // ...options
      })
    }
  }
}
