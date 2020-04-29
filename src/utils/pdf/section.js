import { sortExperienceEducation } from 'utils/sorting';

import { Styles} from './style';
import { Ladder } from './ladder';
import { EducationItem, ExperienceItem } from './item';
import { Doc } from './base';


class SectionHeader extends Doc {

  leadingLine = (x0, y, width) => {
    const line_x1 = x0 - Styles.section.line.padding
    const line_x0 = line_x1 - Styles.section.line.width
    this.doc.line(line_x0, y, line_x1, y)
  }

  trailingLine = (x0, y, width) => {
    const line_x0 = x0 + width + Styles.section.line.padding
    const line_x1 = line_x0 + Styles.section.line.width
    this.doc.line(line_x0, y, line_x1, y)
  }

  lines = (x0, height, width) => {
    this.setLine(Styles.section.line)

    // No idea why the coefficient 0.7 adjust the vertical position of the line to
    // center of the vertical text (instead of 0.5), but it does...
    const lineY = this.carriage.y + 0.7 * height
    this.leadingLine(x0, lineY, width)
    this.trailingLine(x0, lineY, width)
  }

  write = (text, { marginBottom = 0 }) => {
    const width = this.textWidth(text, {
      textStyle: Styles.sectionTitle.textStyle
    })
    const x0 = 0.5 * this.frames.page.width - 0.5 * width + this.frames.page.x0
    const height = this.textHeight(text, {
      textStyle: Styles.sectionTitle.textStyle
    })

    this.lines(x0, height, width)
    this.blockText(text, { x0: x0,
      textStyle: Styles.sectionTitle.textStyle
    })
    this.carriage.increment(marginBottom)
  }
}


class Section extends Doc {

  constructor(config) {
    super(config)
    this.ladder = null;
    this.header = new SectionHeader(this.config);
  }
}

export class ExperienceSection extends Section {

  write = (data, { marginBottom = 0 }) => {
    // Quarter of the way in between page left and content left looks good.
    const x = this.frames.page.x0 + 0.25 * (this.frames.content.x0 - this.frames.page.x0)
    this.ladder = new Ladder(this.config, { x0: x, y0: this.carriage.y })

    this.header.write('Experience', { marginBottom: 4 })

    data = sortExperienceEducation(data)
    for (let i = 0; i < data.length; i++) {
      const item = new ExperienceItem(this.config, data[i])
      const rung = item.write({
        x0: this.frames.content.x0,
        marginBottom: 2
      })
      this.ladder.addRung(rung)
    }
    if (this.ladder.rungs.length !== 0){
        this.ladder.draw()
    }
    this.carriage.increment(marginBottom)
  }

}

export class EducationSection extends Section {

  write = (data, { marginBottom = 0 }) => {
    // Quarter of the way in between page left and content left looks good.
    const x = this.frames.page.x0 + 0.25 * (this.frames.content.x0 - this.frames.page.x0)
    this.ladder = new Ladder(this.config, { x0: x, y0: this.carriage.y })

    this.header.write('Education', { marginBottom: 4 })

    data = sortExperienceEducation(data)
    for (let i = 0; i < data.length; i++) {
      const item = new EducationItem(this.config, data[i])
      const rung = item.write({
        x0: this.frames.content.x0,
        marginBottom: 2
      })
      this.ladder.addRung(rung)
    }
    if (this.ladder.rungs.length !== 0){
        this.ladder.draw()
    }
    this.carriage.increment(marginBottom)
  }
}
