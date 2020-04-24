import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files'
import { getProfile } from 'services'

import Github from 'media/icons/Github.png'
import LinkedIn from 'media/icons/LinkedIn.png'
import Database from 'media/icons/Database.png'
import Phone from 'media/icons/Phone.png'
import StreetView from 'media/icons/StreetView.png'
import Envelope from 'media/icons/Envelope.png'
import Globe from 'media/icons/Globe.png'

import { Gutters, Sizes, Styles, Colors } from './constants'
import { ExperienceSection, EducationSection } from './section'
import { Doc } from './base'


export class PdfWriter extends Doc {

  constructor(config){
    super(config)
    this.sections = [
      new ExperienceSection(this.config),
      new EducationSection(this.config),
    ]
  }

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

  inlines = (profile) => {
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
    await this.header({ marginBottom: 0 })
    for (var i = 0; i < this.sections.length; i++ ){
      await this.sections[i].write({ marginBottom: -2 })
    }

    var text = "Django REST Framework"
    this.doc.setFillColor(Colors.blue)
    this.doc.roundedRect(1.0, 1.0, 20, 10, 2.0, 2.0, 'F')

    await this.footer()
  }
}
