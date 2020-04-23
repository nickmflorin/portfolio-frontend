import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files'

import { Gutters, Sizes, Styles, PageBreakThreshold } from './constants'
import { strip } from './utils'


export class Doc {

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


export class Writer extends Doc {

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

  totalTextHeight = (value, { x0, ...style }) => {
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
