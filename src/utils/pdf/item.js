import _ from 'underscore';

import { formatDegree, formatDateRange, formatGpa } from 'utils/formatting';
import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files';

import { Styles } from './style';
import { Icons, Colors } from './constants';
import { Doc } from './base';
import { Ladder, Rung } from './ladder';


class Project extends Doc {
  constructor(config, name, desc){
    super(config)
    this.name = name
    this.desc = desc
  }
  write = ({ x0 = 0, marginBottom=0 }) => {

    const y0 = this.carriage.y // Store Ref for Lines
    const nameHeight = this.textHeight(this.name, { textStyle: Styles.projectTitle.textStyle })
    const descHeight = this.totalTextHeight(this.desc, { x0: x0, textStyle: Styles.body.textStyle })

    const rung = new Rung(this.config, {
      x1: x0 - 4,
      y0: y0 + 0.5 * (nameHeight + descHeight)
    })

    this.blockText(this.name, {
      x0: x0,
      textStyle: Styles.projectTitle.textStyle,
      marginBottom: 2,
    })
    this.description(this.desc, {
      x0: x0,
      textStyle: Styles.body.textStyle
    })
    this.carriage.increment(marginBottom)
    // this.conditionalPageBreak()
    return rung
  }
}


class Skill extends Doc {
  constructor(config, text){
    super(config)

    this.text = text
    this.textW = this.textWidth(this.text, { textStyle: Styles.skill.textStyle })
    this.textH = this.textHeight(this.text, { textStyle: Styles.skill.textStyle })
    this.width = this.textW + 2.0 * Styles.skill.padding.x
    this.height = this.textH + 2.0 * Styles.skill.padding.y
  }

  write = ({ x0 = 0 }) => {
    this.doc.setFillColor(Styles.skill.fillColor)
    this.setFont(Styles.skill.textStyle)

    this.doc.roundedRect(
      x0,
      this.carriage.y,
      this.width,
      this.height,
      Styles.skill.radius,
      Styles.skill.radius,
      "F"
    )

    // No idea why the -1.0 offset is needed to center vertically.
    this.doc.text(
      x0 + Styles.skill.padding.x,
      this.carriage.y + Styles.skill.padding.y + this.textH - 1.0,
      this.text
    )
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

  writeProjects = ({ marginBottom = 0, ...options }) => {

    if (this.projects.length !== 0) {
      for (var i = 0; i < this.projects.length; i++) {
        const description = this.projects[i].resume_description || this.projects[i].description
        const project = new Project(this.config, this.projects[i].name, description)

        let rung = null;
        if (i !== this.projects.length - 1) {
          rung = project.write({ marginBottom: 6, ...options })
        }
        else {
          rung = project.write({ marginBottom: 0, ...options })
        }

        this.ladder.addRung(rung)
      }
      if (this.ladder.rungs.length !== 0){
          this.ladder.draw()
      }
      this.carriage.increment(marginBottom)
    }
  }

  header = async ({ x0 = 0, marginBottom = 0 }) => {

    const drawLogo = async ({ x0 = 0 }) => {
      let extension = getFileExtension(this.logo)
      let dimensions = await getImageDimensions(this.logo)
      let data = await getBase64Encoded(this.logo)

      // Width should remain constant, height varies to maintain aspect ratio.
      const height = dimensions.inverseRatio * Styles.logo.size.width
      const mid = this.carriage.y + 0.5 * Styles.logo.size.height  // Desired vertical center location of image.

      const y0 = mid - 0.5 * height
      this.doc.addImage(data, extension, x0, y0, Styles.logo.size.width, height);
    }

    await drawLogo({ x0: x0 })
    x0 = this.frames.textContent.x0

    this.blockText(this.title, {
      x0: x0,
      marginBottom: Styles.title.margin.bottom,
      textStyle: Styles.title.textStyle
    })
    this.blockText(this.subtitle, {
      x0: x0,
      marginBottom: Styles.subtitle.margin.bottom,
      textStyle: Styles.subtitle.textStyle
    })

    if (this.inlines.length !== 0) {
      await this.drawInlines(this.inlines, {
        x0: x0,
        iconMargin: 3,
        spacing: 8,
        textStyle: Styles.inlines.textStyle,
      })
    }
    this.carriage.increment(marginBottom)
  }

  writeSkills = ({ x0 = 0, marginBottom = 0 }) => {

    const originalX0 = x0
    let y0 = this.carriage.y

    let skills = [];
    if (this.obj.skills.length !== 0) {
      for (let i = 0; i < this.obj.skills.length; i++ ){
        const skill = new Skill(this.config, this.obj.skills[i].name)

        // Adjust for New Line
        if ( x0 + skill.width + Styles.skills.padding.x > this.frames.content.x1 && i !== this.obj.skills.length - 1) {
          x0 = originalX0
          if (skills.length >= 1) {
            this.carriage.increment(skills[i - 1].height + Styles.skills.padding.y)  // Vertical Padding
          }
        }
        skill.write({ x0: x0 })
        x0 = x0 + skill.width + Styles.skills.padding.x // Horizontal Padding
        skills.push(skill)
      }
      const lastSkill = _.last(skills)
      this.carriage.increment(lastSkill.height)
      this.carriage.increment(marginBottom)
    }
  }

  write = async ({ x0 = 0, marginBottom=0 }) => {
    const rungY = this.carriage.y + 0.5 * Styles.logo.size.height

    await this.header({x0: x0, marginBottom: 0})
    // Wait Until Carriage Below Header
    this.ladder = new Ladder(this.config, {
      x0: x0 + 0.5 * Styles.logo.size.width,
      y0: this.carriage.y
    })

    this.writeDescription({
      marginBottom: 6,
      x0: x0 + Styles.logo.size.width + Styles.logo.margin.right,
      textStyle: Styles.body.textStyle,
    })

    this.writeProjects({
      marginBottom: 10,
      x0: x0 + Styles.logo.size.width + Styles.logo.margin.right
    })

    this.writeSkills({
      marginBottom: 6,
      x0: x0 + Styles.logo.size.width + Styles.logo.margin.right
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

  writeDescription = ({ marginBottom = 0, ...options }) => {
    // Right now, we do not want to include the company description if the
    // experience has a description.
    if (this.obj.description) {
      this.description(this.obj.description, options)
    }
    else if (this.obj.company.description) {
      this.description(this.obj.company.description, options)
    }
    this.carriage.increment(marginBottom)
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

  writeDescription = ({ marginBottom = 0, ...options }) => {
    if (this.obj.description) {
      this.description(this.obj.description, options)
    }
    else if (this.obj.school.description) {
      this.description(this.obj.school.description, options)
    }
    if (this.obj.minor) {
      this.description(`Minor in ${this.obj.minor}`, options)
    }
    if (this.obj.concentration) {
      this.description(`Concentration in ${this.obj.concentration}`, options)
    }
    this.carriage.increment(marginBottom)
  }
}
