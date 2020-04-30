import { getFileExtension, getImageDimensions, getBase64Encoded } from 'utils/files'

import { Styles } from './style'
import { Gutters, Icons, PageBreakThreshold, FOOTER_TEXT } from './constants'
import { ExperienceSection, EducationSection } from './section'
import { Doc } from './base'


export class PdfWriter extends Doc {

  pageBreak = () => {
    this.doc.addPage()
    this.carriage.moveTo(this.frames.page.y0)
  }

  conditionalPageBreak = () => {
    if (this.carriage.y > PageBreakThreshold * Styles.page.size.height) {
      this.doc.addPage()
      this.carriage.moveTo(this.frames.page.y0)
    }
  }

  drawLogo = async (logo, { x0 = 0 }) => {
    let extension = getFileExtension(logo)

    // TODO: Catch error.  If there is an error loading the image, use a placeholder image.
    let dimensions = await getImageDimensions(logo)
    let data = await getBase64Encoded(logo)

    // Width should remain constant, height varies to maintain aspect ratio.
    const height = dimensions.inverseRatio * Styles.brand.size.width
    const mid = this.carriage.y + 0.5 * Styles.brand.size.height  // Desired vertical center location of image.
    const y0 = mid - 0.5 * height
    this.doc.addImage(data, extension, x0, y0, Styles.brand.size.width, height);
  }

  inlines = (profile) => {
    return [
      [
        { text: 'nickflorin.com', icon: Icons.Globe },
        { text: "nickflorin-api.com/api/v1/", icon: Icons.Database },
        { text: profile.github_url.replace('https://', '').replace('www.', ''), icon: Icons.Github },
        { text: profile.linkedin_url.replace('https://', '').replace('www.', ''), icon: Icons.LinkedIn },
        { text: profile.email, icon: Icons.Envelope},
      ],
      [
        { text: profile.address, icon: Icons.StreetView },
        { text: profile.phone, icon: Icons.Phone }
      ],
    ]
  }

  footer = async () => {

    const width = this.textWidth(FOOTER_TEXT, { textStyle: Styles.footer.textStyle })
    const height = this.textHeight(FOOTER_TEXT, { textStyle: Styles.footer.textStyle })
    const x0 = 0.5 * this.frames.page.width - 0.5 * width
    const y0 = this.frames.page.y1 - height

    this.setFont(Styles.footer.textStyle)
    this.doc.text(x0, y0, FOOTER_TEXT)
  }

  header = async (profile, { marginBottom = 0 }) => {
    await this.drawLogo(profile.logo, { x0: this.frames.page.x0 })

    const firstNamePart = `${profile.first_name} ${profile.middle_name[0]}.`

    this.inlineText(firstNamePart, {
      x0: Gutters.page.left + Styles.brand.size.width + 3,
      textStyle: Styles.firstName.textStyle,
    })
    const width = this.textWidth(firstNamePart, {
      textStyle: Styles.firstName.textStyle
    })

    this.inlineText(profile.last_name.toUpperCase(), {
      x0: this.frames.page.x0 + Styles.brand.size.width + 3 + width + 1,
      textStyle: Styles.lastName.textStyle
    })

    // Just use the first name as an estimate?  Maybe conglomerate for more exact
    // height.
    const height = this.textHeight(profile.last_name, Styles.lastName)
    this.carriage.increment(height)

    // TODO: Create Constant
    this.carriage.increment(4) // Spacing Between Name and Tagline

    this.blockText(profile.tagline, {
      x0: this.frames.page.x0 + Styles.brand.size.width + 3,
      textStyle: Styles.tagline.textStyle
    })

    // TODO: Create Constant
    this.carriage.increment(4) // Spacing Between Tagline and Inlines

    await this.drawInlines(this.inlines(profile)[0], {
      x0: this.frames.page.x0 + Styles.brand.size.width + 3,
      iconMargin: 3,
      spacing: 6,
      textStyle: Styles.pageInlines.textStyle,
    })

    // TODO: Create Constant
    this.carriage.increment(-2) // Inline rows are spaced too far apart...

    await this.drawInlines(this.inlines(profile)[1], {
      x0: this.frames.page.x0 + Styles.brand.size.width + 3,
      iconMargin: 3,
      spacing: 6,
      textStyle: Styles.pageInlines.textStyle,
    })

    this.carriage.increment(marginBottom)
  }

  write = async (data) => {
    const experienceSection = new ExperienceSection(this.config)
    const educationSection = new EducationSection(this.config)

    await this.header(data.profile, { marginBottom: 1 })
    await experienceSection.write(data.experience, {})
    await this.footer()

    this.pageBreak()

    await this.header(data.profile, { marginBottom: 1 })
    await educationSection.write(data.education, {})
    await this.footer()
  }
}
