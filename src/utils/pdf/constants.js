import Github from 'media/icons/Github.png'
import LinkedIn from 'media/icons/LinkedIn.png'
import Database from 'media/icons/Database.png'
import Phone from 'media/icons/Phone.png'
import StreetView from 'media/icons/StreetView.png'
import Envelope from 'media/icons/Envelope.png'
import Globe from 'media/icons/Globe.png'
import Pin from 'media/icons/Pin.png'
import Calendar from 'media/icons/Calendar.png'
import PaperPlane from 'media/icons/PaperPlane.png'


export const FOOTER_TEXT = "This resume was auto generated.  Copyright © 2020 nickflorin-api.com.  All rights reserved."

export const DocConfig = {
  unit: "px",
  format: "letter",
  precision: 32,
  floatPrecision: "smart"
}

export const Icons = {
  Github: Github,
  LinkedIn: LinkedIn,
  Database: Database,
  Phone: Phone,
  StreetView: StreetView,
  Envelope: Envelope,
  Globe: Globe,
  Pin: Pin,
  Calendar: Calendar,
  PaperPlane: PaperPlane,
}

export const Gutters = {
  page: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  content: {
    left: 25,
    right: 0,
    top: 5, // This doesn't really matter, just for drawing grid.
    bottom: 0  // This will matter when we start using it for the page break.
  },
  textContent: {
    // left: Sizes.logo.width + Margins.logo,
    left: 24 + 5,
    top: 5,  // This doesn't really matter, just for drawing grid.
    bottom: 0, // This will matter when we start using it for the page break.
    right: 5,
  }
}

export const PageBreakThreshold = 0.9

export const Colors = {
  primary: '#282828',
  secondary: '#3C3C3C',
  tertiary: "#2b2e32",
  gray: "#696969",
  blue: "#2196F3",
  white: "#FFFFFF",
}

export const Fonts = {
  LatoBold: {
    name: 'Lato-Bold',
    type: 'bold',
  },
  OpenSansRegular: {
    name: 'OpenSans-Regular',
    type: 'normal',
  },
  OpenSansLight: {
    name: 'OpenSans-Light',
    type: 'normal',
  },
  RobotoRegular: {
    name: 'Roboto-Regular',
    type: 'normal',
  },
  RobotoLight: {
    name: 'Roboto-Light',
    type: 'normal',
  }
}
