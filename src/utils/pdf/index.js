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
import { Canvas, Carriage } from './utils'
import { Gutters, DocConfig, Sizes } from './constants'


export const generateResume = async () => {
  const doc = new jsPDF(DocConfig)

  const page = new Canvas(doc, Gutters.page.left, Gutters.page.top, {
    width: Sizes.page.width - Gutters.page.left - Gutters.page.right,
    height: Sizes.page.height - Gutters.page.top - Gutters.page.bottom
  })
  const content = new Canvas(doc, page.x0 + Gutters.content.left, page.y0 + Gutters.content.top, {
    width: page.width - Gutters.content.left - Gutters.content.right,
    height: page.height - Gutters.content.top - Gutters.content.bottom
  })
  const textContent = new Canvas(doc, content.x0 + Gutters.textContent.left, content.y0 + Gutters.textContent.top, {
    width: content.width - Gutters.textContent.left - Gutters.textContent.right,
    height: content.height - Gutters.textContent.top - Gutters.textContent.bottom
  })

  const carriage = new Carriage(page.coordinates.y0)
  const writer = new PdfWriter(doc, carriage, {
    page: page,
    content: content,
    textContent: textContent,
  })
  await writer.write()

  doc.save('Resume.pdf');
}
