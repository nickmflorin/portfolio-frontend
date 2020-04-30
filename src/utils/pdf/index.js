import jsPDF from 'jspdf';

import 'style/fonts/Lato-Light'
import 'style/fonts/Lato-Regular'
import 'style/fonts/Lato-Bold'

import 'style/fonts/OpenSans-Light'
import 'style/fonts/OpenSans-Regular'
import 'style/fonts/OpenSans-Bold'

import 'style/fonts/Roboto-Light'
import 'style/fonts/Roboto-Regular'
import 'style/fonts/Roboto-Medium'

import { PdfWriter } from './writer'
import { Styles } from './style'
import { Canvas } from './canvas'
import { Carriage } from './carriage'
import { Gutters, DocConfig } from './constants'


export const generateResume = async (resume) => {
  const doc = new jsPDF(DocConfig)

  let config = {
    doc: doc,
    frames: {},
  }

  config.frames.page = new Canvas(doc, {
    x0: Gutters.page.left,
    y0: Gutters.page.top,
    width: Styles.page.size.width - Gutters.page.left - Gutters.page.right,
    height: Styles.page.size.height - Gutters.page.top - Gutters.page.bottom
  })

  config.frames.content = new Canvas(doc, {
    x0: config.frames.page.x0 + Gutters.content.left,
    y0: config.frames.page.y0 + Gutters.content.top,
    width: config.frames.page.width - Gutters.content.left - Gutters.content.right,
    height: config.frames.page.height - Gutters.content.top - Gutters.content.bottom
  })

  config.frames.textContent = new Canvas(doc, {
    x0: config.frames.content.x0 + Gutters.textContent.left,
    y0: config.frames.content.y0 + Gutters.textContent.top,
    width: config.frames.content.width - Gutters.textContent.left - Gutters.textContent.right,
    height: config.frames.content.height - Gutters.textContent.top - Gutters.textContent.bottom
  })

  config.carriage = new Carriage(config.frames.page.coordinates.y0)
  const writer = new PdfWriter(config)
  await writer.write(resume)

  doc.save('Resume.pdf');
}
