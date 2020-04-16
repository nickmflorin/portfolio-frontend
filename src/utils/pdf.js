import jsPDF, { setFontSize } from 'jspdf';

import 'style/fonts/Lato-Light'
import 'style/fonts/Lato-Regular'
import 'style/fonts/Lato-Bold'

import 'style/fonts/OpenSans-Light'
import 'style/fonts/OpenSans-Regular'
import 'style/fonts/OpenSans-Bold'

import 'style/fonts/Roboto-Light'
import 'style/fonts/Roboto-Regular'
import 'style/fonts/Roboto-Medium'

import Pin from 'media/icons/Pin.png'

import _ from 'underscore'

import { getAllExperience, getAllEducation, getExperience, getEducation } from 'services'

import { formatDegree } from './formatting'
import { sortExperienceEducation } from './sorting'
import { getFileExtension, getImageDimensions, getBase64Encoded } from './files'

const MARGINS = {
  left: 10,
}

const LOGO_SIZE = {
  width: 14,
  height: 14,
}

var vmarker = 40

const strip = (value) => (
  value.replace(/(<([^>]+)>)/ig,"")
)

export const generateResume = async () => {
  var doc = new jsPDF();

  const yincrement = (value) => {
    vmarker = vmarker + value
    console.log(vmarker)
  }

  const description = async (value, marginBottom=8) => {
    doc.setFontType('normal')
    doc.setFont('Roboto-Light');

    doc.setFontSize(8)
    doc.setLineHeightFactor(1.0)
    doc.text(MARGINS.left + 3 + LOGO_SIZE.width, vmarker, strip(value), { maxWidth: 170 });
    yincrement(marginBottom)
  }

  const headerBlock = async (title, subtitle, image) => {
    const header = (value) => {
      doc.setFontType('bold')
      doc.setFont('Lato-Bold');

      doc.setFontSize(12)
      doc.setLineHeightFactor(1.0)

      doc.text(MARGINS.left + 3 + LOGO_SIZE.width, vmarker, value);

      yincrement(4)
    }

    const subheader = async (value) => {
      doc.setFontType('normal')
      doc.setFont('OpenSans-Light');

      doc.setFontSize(10)
      doc.setLineHeightFactor(1.0)
      doc.text(MARGINS.left + 3 + LOGO_SIZE.width, vmarker, value);

      yincrement(4)
    }

    var extension = getFileExtension(image)
    var dimensions = await getImageDimensions(image)
    var data = await getBase64Encoded(image)

    const height = dimensions.inverseRatio * LOGO_SIZE.width
    const mid = vmarker + 0.5 * LOGO_SIZE.height

    // Not sure why the -5 makes the image line up with the top of the header.
    // Image position is from center of image?
    const y0 = mid - 0.5 * height - 5
    doc.addImage(data, extension, MARGINS.left, y0, LOGO_SIZE.width, height);

    await header(title)
    await subheader(subtitle)
    yincrement(1)
  }

  const projectBlock = async (name, desc) => {
    const header = async (value) => {
      doc.setFontType('normal')
      doc.setFont('OpenSans-Light');

      doc.setFontSize(8)
      doc.setLineHeightFactor(1.0)
      doc.text(MARGINS.left + 3 + LOGO_SIZE.width, vmarker, value);

      yincrement(4)
    }
    await header(name)
    await description(strip(desc), 8)

    yincrement(6)
  }

  const addExperience = async (obj) => {
    await headerBlock(obj.title, obj.company.name, obj.company.logo)
    if (obj.description) {
        await description(obj.description, 8)
    }
    for (var i = 0; i<obj.projects.length; i++) {
      await projectBlock(obj.projects[i].name, obj.projects[i].description)
    }
    yincrement(2)
  }

  const addEducation = async (obj) => {
    await headerBlock(formatDegree(obj.degree, obj.major), obj.school.name, obj.school.logo)
    if (obj.description) {
        await description(obj.description, 8)
    }
    for (var i = 0; i<obj.projects.length; i++) {
      await projectBlock(obj.projects[i].name, obj.projects[i].description)
    }
    yincrement(6)
  }

  var experiences = await getAllExperience()
  experiences = sortExperienceEducation(experiences)
  for (var i = 0; i<experiences.length; i++) {
    const experience = await getExperience(experiences[i].id)
    await addExperience(experience)
  }

  var educations = await getAllEducation()
  educations = sortExperienceEducation(educations)
  for (var i = 0; i<educations.length; i++) {
    const education = await getEducation(educations[i].id)
    await addEducation(education)
  }
  doc.save('Resume.pdf');
}
