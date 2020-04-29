import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files';

import { Styles } from './style';
import { strip } from './utils';


export class Doc {

  constructor(config){
    this.config = config
    this.frames = config.frames
    this.carriage = config.carriage
    this.doc = config.doc
    // For whatever reason, JSPDF does not have a getFont() method...
    this.currentFont = {};
  }

  get page() {
    let pg = this.doc.internal.getCurrentPageInfo();
    return pg.pageNumber;
  }

  setFont = (textStyle) => {
    if (textStyle.font && textStyle.font.type) {
      this.currentFont['type'] = textStyle.font.type
      this.doc.setFontType(textStyle.font.type)
    }
    if (textStyle.font && textStyle.font.name) {
      this.currentFont['name'] = textStyle.font.name
      this.doc.setFont(textStyle.font.name)
    }
    if (textStyle.size) {
      this.doc.setFontSize(textStyle.size)
    }
    if (textStyle.height) {
      this.doc.setLineHeightFactor(textStyle.height)
    }
    if (textStyle.color) {
      this.doc.setTextColor(textStyle.color)
    }
  }

  getFont = () => {
    return {
      font: this.currentFont,
      size: this.doc.getFontSize(),
      height: this.doc.getLineHeightFactor(),
      color: this.doc.getTextColor()
    }
  }

  setLine = ({ dash=[], ...lineStyle}) => {
    this.doc.setLineDash(dash)
    if (lineStyle.thickness) {
      this.doc.setLineWidth(lineStyle.thickness)
    }
    if (lineStyle.color) {
      this.doc.setDrawColor(lineStyle.color)
    }
  }

  textHeight = (value, { textStyle = {} }) => {
    const originalStyle = this.getFont()
    this.setFont(textStyle)
    const height = this.doc.getTextDimensions(value).h
    this.setFont(originalStyle)
    return height
  }

  totalTextHeight = (value, { x0, textStyle = {} }) => {
    // Note that this calculation is problematic for inline text!
    const split = this.doc.splitTextToSize(value, this.frames.textContent.x1 - x0);
    const height = this.textHeight(value, textStyle)
    return split.length * height
  }

  textWidth = (value, { textStyle = {} }) => {
    const originalStyle = this.getFont()
    this.setFont(textStyle)
    const width = this.doc.getTextWidth(value)
    this.setFont(originalStyle)
    return width
  }

  text = (value, { x0 = 0, textStyle = {} }) => {
    const singleLineHeight = this.textHeight(value, { textStyle: textStyle })
    this.carriage.increment(singleLineHeight)
    this.setFont(textStyle)
    this.doc.text(x0, this.carriage.y, value, { maxWidth: this.frames.textContent.width })
    this.carriage.increment(-1.0 * singleLineHeight)
  }

  blockText = (value, { x0 = 0, marginBottom = 0, textStyle = {} }) => {
    this.text(value, { x0: x0, textStyle: textStyle })
    const totalHeight = this.totalTextHeight(value, { x0: x0, textStyle: textStyle })
    this.carriage.increment(marginBottom + totalHeight)
  }

  inlineText = (value, { x0 = 0, textStyle = {} }) => {
    this.text(value, { x0: x0, textStyle: textStyle })
  }

  description = (value, options) => {
    this.blockText(strip(value), options)
  }

  drawIcon = (icon, { x0 = 0 }) => {
    let self = this;

    let extension = getFileExtension(icon)

    // TODO: Catch error.  If there is an error loading the image, use a placeholder image.
    getImageDimensions(icon).then((dimensions) => {
      getBase64Encoded(icon).then((data) => {
        const width = dimensions.ratio * Styles.icon.size.height
        const mid = self.carriage.y + 0.5 * Styles.icon.size.height

        // Not sure why we need the + 0.5 here but it makes it line up vertically.
        const y0 = mid - 0.5 * Styles.icon.size.height + 0.5
        self.doc.addImage(data, extension, x0, y0, width, Styles.icon.size.height);
      })
    })
  }

  drawInline = (inline, { x0 = 0, spacing = 0, textStyle = {} }) => {
    if (inline.icon) {
      this.drawIcon(inline.icon, { x0: x0 })
      x0 = x0 + Styles.icon.size.width + spacing
    }
    this.inlineText(inline.text, { x0: x0, textStyle: textStyle })
  }

  drawInlines = (inlines, { x0 = 0, marginBottom = 0, iconMargin = 0, spacing = 0, textStyle = {} }) => {
    let fullText = ""
    for (let i = 0; i < inlines.length; i++ ){
      this.drawInline(inlines[i], { x0: x0, spacing: iconMargin, textStyle: textStyle })
      const width = this.textWidth(inlines[i].text, { textStyle: textStyle })
      x0 = x0 + width + Styles.icon.size.width + iconMargin + spacing
      fullText = fullText + inlines[i].text
    }
    let lineHeight = this.textHeight(fullText, { textStyle: textStyle })  // Use First Text as Approximation
    this.carriage.increment(lineHeight)
    this.carriage.increment(marginBottom + Styles.icon.size.height)
  }
}
