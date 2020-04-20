import _ from 'underscore'

import { formatDegree, formatDateRange, formatGpa } from 'utils/formatting'
import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files'
import { sortExperienceEducation } from 'utils/sorting'
import { getAllExperience, getAllEducation, getExperience, getEducation,
  getProfile } from 'services'

import { Gutters, Sizes, Margins, Styles, Lines, PageBreakThreshold, CircleRadius } from './constants'
import { strip } from './utils'

import Pin from 'media/icons/Pin.png'
import Calendar from 'media/icons/Calendar.png'
import PaperPlane from 'media/icons/PaperPlane.png'
import Github from 'media/icons/Github.png'
import LinkedIn from 'media/icons/LinkedIn.png'
import Database from 'media/icons/Database.png'
import Phone from 'media/icons/Phone.png'
import StreetView from 'media/icons/StreetView.png'
import Envelope from 'media/icons/Envelope.png'
import Globe from 'media/icons/Globe.png'


class AbstractDoc {
  constructor(doc){
    this.doc = doc
  }
  get page() {
    var pg = this.doc.internal.getCurrentPageInfo();
    return pg.pageNumber;
  }

  setFont = ({ font=Styles.body.font, size=Styles.body.size, height=Styles.body.height,
      color=Styles.body.color }) => {
    this.doc.setFontType(font.type)
    this.doc.setFont(font.name)
    this.doc.setFontSize(size)
    this.doc.setLineHeightFactor(height)
    this.doc.setTextColor(color)
  }

  setLine = ({ ...options }) => {
    this.doc.setLineWidth(options.thickness)
    this.doc.setDrawColor(options.color)
    this.doc.setLineDash(options.dash || [])
  }
}


class Rung extends AbstractDoc {
  constructor(x1, y, doc){
    super(doc)
    this.x1 = x1
    this.y = y
    this.pageNumber = this.page
  }
  _draw(x){
    this.setLine(Lines.rung)
    this.doc.line(x + CircleRadius, this.y, this.x1, this.y)
    this.doc.circle(x, this.y, CircleRadius)
  }
  draw(x){
    this.doc.setPage(this.pageNumber)
    this._draw(x)
  }
}

class Ladder extends AbstractDoc {
  constructor(x, y, doc){
    super(doc)
    this.x = x
    this.y = y;
    this.rungs = [];
  }
  addRung(rung){
    this.rungs.push(rung)
  }
  _draw(){

  }
  draw(){
    // TODO: Don't include the circle radius for the first segment top.
    // TODO: What to do if ladder[i] and ladder[i+1] are on different pages?
    if (this.rungs.length === 0) {
      throw new Error('Cannot draw ladder without any rungs.')
    }

    this.setLine(Lines.ladder)
    this.doc.setPage(this.rungs[0].pageNumber)
    this.doc.line(this.x, this.y, this.x, this.rungs[0].y - CircleRadius)

    for (var i = 0; i < this.rungs.length; i++ ){
      this.rungs[i].draw(this.x)
      if (i !== this.rungs.length - 1) {
        this.setLine(Lines.ladder)
        this.doc.setPage(this.rungs[i].pageNumber)
        if (this.rungs[i].pageNumber !== this.rungs[i + 1].pageNumber) {
          // Temporary Guess of 560
          this.doc.line(this.x, this.rungs[i].y + CircleRadius, this.x, 560 - CircleRadius)
          // Have to Also Draw Continuation of Line on Next Page
        }
        else {
          this.doc.line(this.x, this.rungs[i].y + CircleRadius, this.x, this.rungs[i + 1].y - CircleRadius)
        }
      }
    }
  }
}

class Writer extends AbstractDoc {

  constructor(doc, carriage, frames){
    super(doc)
    this.frames = frames
    this.carriage = carriage
  }

  conditionalPageBreak = () => {
    if (this.carriage.y > PageBreakThreshold * Sizes.page.height) {
      this.doc.addPage()
      this.carriage.moveTo(this.frames.page.y0)
    }
  }

  totalTextHeight = (value, { x0: x0, ...style }) => {
    // Note that this calculation is problematic for inline text!
    const split = this.doc.splitTextToSize(value, this.frames.textContent.x1 - x0);
    const height = this.textHeight(value, { ...style })
    return split.length * height
  }

  textWidth = (value, { ...style }) => {
    const originalStyle = {
      font: {
        type: 'normal', // Not sure if there is a method to get the font type.
        name: this.doc.getFont,
      },
      size: this.doc.getFontSize(),
      height: this.doc.getLineHeightFactor(),
      color: this.doc.getTextColor()
    }
    if (Object.keys(style).length) {
      this.setFont({ ...style })
    }
    const width = this.doc.getTextWidth(value)
    this.setFont({ ...originalStyle })
    return width
  }

  textHeight = (value, { ...style }) => {
    const originalStyle = {
      font: {
        type: 'normal', // Not sure if there is a method to get the font type.
        name: this.doc.getFont,
      },
      size: this.doc.getFontSize(),
      height: this.doc.getLineHeightFactor(),
      color: this.doc.getTextColor()
    }
    // TODO: Reset the font style back to original after it is updated.
    if (Object.keys(style).length) {
      this.setFont({ ...style })
    }
    const height = this.doc.getTextDimensions(value).h
    this.setFont({ ...originalStyle })
    return height
  }

  text = async (value, { x0 = Gutters.page.left, ...style }) => {
    const singleLineHeight = this.textHeight(value, { ...style })
    this.carriage.increment(singleLineHeight)

    this.setFont({...style})
    this.doc.text(x0, this.carriage.y, value, { maxWidth: this.frames.textContent.width })
    this.carriage.increment(-1.0 * singleLineHeight)
  }

  blockText = async (value, { x0 = 0, marginBottom = 0, ...style }) => {
    await this.text(value, { x0: x0, ...style })
    const totalHeight = this.totalTextHeight(value, { x0: x0, ...style })
    this.carriage.increment(marginBottom + totalHeight)
  }

  inlineText = async (value, { x0 = Gutters.page.left, marginRight = 2, ...style }) => {
    await this.text(value, { x0: x0, ...style })
  }

  description = async (value, { x0 = 0, marginBottom = 0 }) => {
    await this.blockText(strip(value), { x0: x0, marginBottom: marginBottom })
  }

  drawIcon = async (icon, { x0 = 0 }) => {
    var extension = getFileExtension(icon)
    var dimensions = await getImageDimensions(icon)
    var data = await getBase64Encoded(icon)

    const width = dimensions.ratio * Sizes.icon.height
    const mid = this.carriage.y + 0.5 * Sizes.icon.height

    // Not sure why we need the + 0.5 here but it makes it line up vertically.
    const y0 = mid - 0.5 * Sizes.icon.height + 0.5
    this.doc.addImage(data, extension, x0, y0, width, Sizes.icon.height);
  }

  drawInline = async (inline, { x0 = Gutters.page.left, spacing = 0, ...style }) => {
    if (inline.icon) {
      await this.drawIcon(inline.icon, { x0: x0 })
      x0 = x0 + Sizes.icon.width + spacing
    }
    await this.inlineText(inline.text, { x0: x0, ...style})
  }

  drawInlines = async (inlines, { x0 = 0, marginBottom = 0, iconMargin = 0, spacing = 0, ...style }) => {
    var fullText = ""
    for (var i = 0; i < inlines.length; i++ ){
      await this.drawInline(inlines[i], { x0: x0, spacing: iconMargin, ...style })
      const width = this.textWidth(inlines[i].text, { ...style })
      x0 = x0 + width + Sizes.icon.width + iconMargin + spacing
      fullText = fullText + inlines[i].text
    }
    var lineHeight = this.textHeight(fullText, { ...style })  // Use First Text as Approximation
    this.carriage.increment(lineHeight)
    this.carriage.increment(marginBottom + Sizes.icon.height)
  }
}


class Project extends Writer {
  constructor(name, desc, doc, carriage, frames){
    super(doc, carriage, frames)
    this.name = name
    this.desc = desc
    this.ladderEntry = null
  }
  peg = async ({ x0 = 0 }) => {
    const y0 = this.carriage.y // Store Ref for Lines
    const nameHeight = this.textHeight(this.name, Styles.projectTitle)
    const descHeight = this.totalTextHeight(this.desc, { x0: x0, ...Styles.body })

    const line_x1 = x0 - 4
    const mid = y0 + 0.5 * (nameHeight + descHeight)
    return new Rung(line_x1, mid, this.doc)
  }
  write = async ({ x0 = 0, marginBottom=0 }) => {
    const rung = await this.peg({ x0: x0 })
    await this.blockText(this.name, { x0: x0, ...Styles.projectTitle})
    await this.description(this.desc, { x0: x0, ...Styles.body })
    this.carriage.increment(marginBottom)
    this.conditionalPageBreak()
    return rung
  }
}

class Item extends Writer {

  constructor(obj, doc, carriage, frames) {
    super(doc, carriage, frames)
    this.obj = obj
    this.ladder = null;
    this.ladderEntry = null;
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
      const project = new Project(this.projects[i].name, description, this.doc, this.carriage, this.frames)
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
    this.ladder = new Ladder(
      this.frames.content.x0 + 0.5 * Sizes.logo.width, this.carriage.y, this.doc)

    x0 = x0 + Sizes.logo.width + Margins.logo
    await this.desc({ marginBottom: 6, x0: x0, ...Styles.body })

    await this.writeProjects({ marginBottom: 6, x0: x0 })
    this.carriage.increment(marginBottom)

    return new Rung(this.frames.content.x0 - 4, rungY, this.doc)
  }
}

class ExperienceItem extends Item {

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
      { text: this.location, icon: Pin },
      { text: this.dates, icon: Calendar}
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

class EducationItem extends Item {

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
      { text: this.location, icon: Pin },
      { text: this.dates, icon: Calendar},
      { text: formatGpa(this.obj.gpa), icon: PaperPlane}
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

class Section extends Writer {

  constructor(doc, carriage, frames) {
    super(doc, carriage, frames)
    this.ladder = null;
  }

  leadingLine = async (x0, y, width) => {
    const line_x1 = x0 - Lines.section.padding
    const line_x0 = line_x1 - Lines.section.width
    this.doc.line(line_x0, y, line_x1, y)
  }

  trailingLine = async (x0, y, width) => {
    const line_x0 = x0 + width + Lines.section.padding
    const line_x1 = line_x0 + Lines.section.width
    this.doc.line(line_x0, y, line_x1, y)
  }

  lines = async (x0, height, width) => {
    this.setLine(Lines.section)

    // No idea why the coefficient 0.7 adjust the vertical position of the line to
    // center of the vertical text (instead of 0.5), but it does...
    const lineY = this.carriage.y + 0.7 * height
    await this.leadingLine(x0, lineY, width)
    await this.trailingLine(x0, lineY, width)
  }

  header = async(text, { marginBottom = 0 }) => {
    const width = this.textWidth(text, { ...Styles.sectionTitle })
    const x0 = 0.5 * this.frames.page.width - 0.5 * width + this.frames.page.x0
    const height = this.textHeight(text, { ...Styles.sectionTitle })

    await this.lines(x0, height, width)
    await this.blockText(text, { x0: x0, ...Styles.sectionTitle })
    this.carriage.increment(marginBottom)
  }
}

class ExperienceSection extends Section {

  write = async ({ marginBottom = 0 }) => {

    // Quarter of the way in between page left and content left looks good.
    const x = this.frames.page.x0 + 0.25 * (this.frames.content.x0 - this.frames.page.x0)
    this.ladder = new Ladder(x, this.carriage.y, this.doc)

    await this.header('Experience', { marginBottom: 2 })
    var experiences = await getAllExperience()
    experiences = sortExperienceEducation(experiences)

    for (var i = 0; i<experiences.length; i++) {
      if (experiences[i].include_in_resume) {
        const experience = await getExperience(experiences[i].id)
        const item = new ExperienceItem(experience, this.doc, this.carriage, this.frames)
        const rung = await item.write({ x0: this.frames.content.x0, marginBottom: 2 })
        this.ladder.addRung(rung)
        this.conditionalPageBreak()
      }
    }
    if (this.ladder.rungs.length !== 0){
        await this.ladder.draw()
    }
    this.carriage.increment(marginBottom)
  }

}

class EducationSection extends Section {

  write = async ({ marginBottom = 0 }) => {

    // Quarter of the way in between page left and content left looks good.
    const x = this.frames.page.x0 + 0.25 * (this.frames.content.x0 - this.frames.page.x0)
    this.ladder = new Ladder(x, this.carriage.y, this.doc)

    await this.header('Education', { marginBottom: 2 })
    var educations = await getAllEducation()
    educations = sortExperienceEducation(educations)

    for (var i = 0; i<educations.length; i++) {
      if (educations[i].include_in_resume) {
        const education = await getEducation(educations[i].id)
        const item = new EducationItem(education, this.doc, this.carriage, this.frames)
        const rung = await item.write({ x0: this.frames.content.x0, marginBottom: 2 })
        this.ladder.addRung(rung)
      }
    }
    if (this.ladder.rungs.length !== 0){
        await this.ladder.draw()
    }
    this.carriage.increment(marginBottom)
  }
}

export class PdfWriter extends Writer {

  drawLogo = async (logo, { x0 = 0 }) => {
    var extension = getFileExtension(logo)
    var dimensions = await getImageDimensions(logo)
    var data = await getBase64Encoded(logo)

    // Width should remain constant, height varies to maintain aspect ratio.
    const height = dimensions.inverseRatio * Sizes.brand.width
    const mid = this.carriage.y + 0.5 * Sizes.brand.height  // Desired vertical center location of image.
    const y0 = mid - 0.5 * height
    this.doc.addImage(data, extension, x0, y0, Sizes.brand.width, height);
  }

  inlines(profile) {
    return [
      [
        { text: 'nickflorin.com', icon: Globe },
        { text: "nickflorin-api.com/api/v1/", icon: Database },
        { text: profile.github_url.replace('https://', '').replace('www.', ''), icon: Github },
        { text: profile.linkedin_url.replace('https://', '').replace('www.', ''), icon: LinkedIn },
        { text: profile.email, icon: Envelope},
      ],
      [
        { text: profile.address, icon: StreetView },
        { text: profile.phone, icon: Phone }
      ],
    ]
  }

  footer = async () => {
    const text = "This resume was auto-generated from nickflorin-api.com."
    this.setFont(Styles.footer)

    const width = this.doc.getTextWidth(text)
    const height = this.doc.getTextDimensions(text).h
    const x0 = this.frames.page.x1 - width
    const y0 = this.frames.page.y1 - height
    this.doc.text(x0, y0, text)
  }

  header = async () => {
    const profile = await getProfile()
    await this.drawLogo(profile.logo, { x0: this.frames.page.x0 })

    const firstNamePart = `${profile.first_name} ${profile.middle_name[0]}.`
    await this.inlineText(firstNamePart, { x0: Gutters.page.left + Sizes.brand.width + 3, ...Styles.firstName })
    const width = this.textWidth(firstNamePart, Styles.firstName)
    await this.inlineText(profile.last_name.toUpperCase(), { x0: this.frames.page.x0 + Sizes.brand.width + 3 + width + 1, ...Styles.lastName})

    // Just use the first name as an estimate?  Maybe conglomerate for more exact
    // height.
    const height = this.textHeight(profile.last_name, Styles.lastName)
    this.carriage.increment(height)

    this.carriage.increment(4) // Spacing Between Name and Tagline
    await this.blockText(profile.tagline, { x0: this.frames.page.x0 + Sizes.brand.width + 3, ...Styles.tagline })
    this.carriage.increment(4) // Spacing Between Tagline and Inlines

    await this.drawInlines(this.inlines(profile)[0], {
      x0: this.frames.page.x0 + Sizes.brand.width + 3,
      iconMargin: 3,
      spacing: 6,
      ...Styles.pageInlines
    })
    this.carriage.increment(-2) // Inline rows are spaced too far apart...
    await this.drawInlines(this.inlines(profile)[1], {
      x0: this.frames.page.x0 + Sizes.brand.width + 3,
      iconMargin: 3,
      spacing: 6,
      ...Styles.pageInlines
    })
  }

  write = async () => {
    const sections = [
      new ExperienceSection(this.doc, this.carriage, this.frames),
      new EducationSection(this.doc, this.carriage, this.frames),
    ]
    await this.header({ marginBottom: 0 })
    for (var i = 0; i < sections.length; i++ ){
      await sections[i].write({ marginBottom: -2 })
    }
    await this.footer()
  }
}
