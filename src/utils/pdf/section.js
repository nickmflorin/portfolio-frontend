import _ from 'underscore';

import { sortExperienceEducation } from 'utils/sorting'
import { getAllExperience, getAllEducation, getExperience, getEducation } from 'services'

import { Styles, Lines} from './constants'

import { Ladder } from './ladder'
import { EducationItem, ExperienceItem } from './item'
import { Writer } from './base'


class SectionHeader extends Writer {

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

  write = async(text, { marginBottom = 0 }) => {
    const width = this.textWidth(text, { ...Styles.sectionTitle })
    const x0 = 0.5 * this.frames.page.width - 0.5 * width + this.frames.page.x0
    const height = this.textHeight(text, { ...Styles.sectionTitle })

    await this.lines(x0, height, width)
    await this.blockText(text, { x0: x0, ...Styles.sectionTitle })
    this.carriage.increment(marginBottom)
  }
}


class Section extends Writer {

  constructor(doc, carriage, frames) {
    super(doc, carriage, frames)
    this.ladder = null;
    this.header = new SectionHeader(doc, carriage, frames);
  }
}

export class ExperienceSection extends Section {

  getData = async () => {
    var data = await getAllExperience()
    data = _.filter(data, (dt) => dt.include_in_resume)
    return sortExperienceEducation(data)
  }

  write = async ({ marginBottom = 0 }) => {
    // Quarter of the way in between page left and content left looks good.
    const x = this.frames.page.x0 + 0.25 * (this.frames.content.x0 - this.frames.page.x0)
    this.ladder = new Ladder(this.doc, { x0: x, y0: this.carriage.y })

    await this.header.write('Experience', { marginBottom: 2 })

    const data = await this.getData()
    for (var i = 0; i<data.length; i++) {
      const experience = await getExperience(data[i].id)
      const item = new ExperienceItem(experience, this.doc, this.carriage, this.frames)
      const rung = await item.write({
        x0: this.frames.content.x0,
        marginBottom: 2
      })
      this.ladder.addRung(rung)
      this.conditionalPageBreak()
    }
    if (this.ladder.rungs.length !== 0){
        await this.ladder.draw()
    }
    this.carriage.increment(marginBottom)
  }

}

export class EducationSection extends Section {

  getData = async () => {
    var data = await getAllEducation()
    data = _.filter(data, (dt) => dt.include_in_resume)
    return sortExperienceEducation(data)
  }

  write = async ({ marginBottom = 0 }) => {
    // Quarter of the way in between page left and content left looks good.
    const x = this.frames.page.x0 + 0.25 * (this.frames.content.x0 - this.frames.page.x0)
    this.ladder = new Ladder(this.doc, { x0: x, y0: this.carriage.y })

    await this.header.write('Education', { marginBottom: 2 })

    const data = await this.getData()
    for (var i = 0; i<data.length; i++) {
      const data_item = await getEducation(data[i].id)
      const item = new EducationItem(data_item, this.doc, this.carriage, this.frames)
      const rung = await item.write({
        x0: this.frames.content.x0,
        marginBottom: 2
      })
      this.ladder.addRung(rung)
    }
    if (this.ladder.rungs.length !== 0){
        await this.ladder.draw()
    }
    this.carriage.increment(marginBottom)
  }
}
