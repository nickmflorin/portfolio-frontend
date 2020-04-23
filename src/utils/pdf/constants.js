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

export const Sizes = {
  brand: {
    width: 15,
    height: 15,
  },
  page: {
    width: 459,
    height: 594
  },
  icon: {
    width: 6,
    height: 6,
  },
  logo: {
    width: 24,
    height: 24,
  }
}

export const Margins = {
  logo: 5,
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
    left: Sizes.logo.width + Margins.logo,
    top: 5,  // This doesn't really matter, just for drawing grid.
    bottom: 0, // This will matter when we start using it for the page break.
    right: 5,
  }
}

export const PageBreakThreshold = 0.9

export const CircleRadius = 2

export const Colors = {
  primary: '#282828',
  secondary: '#3C3C3C',
  tertiary: "#2b2e32",
  gray: "#696969",
  blue: "#2196F3",
}

export const Lines = {
  rung: {
    color: Colors.blue,
    thickness: 1.0,
    dash: [],
  },
  ladder: {
    color: Colors.blue,
    thickness: 1.0,
    dash: [2, 2]
  },
  section: {
    padding: 10,
    width: 100,
    color: Colors.blue,
    thickness: 0.5,
    dash: [],
  }
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

export const Styles = {
  title: {
    marginBottom: 3,
    font: Fonts.LatoBold,
    size: 11,
    color: Colors.primary,
  },
  subtitle: {
    marginBottom: 4,
    font: Fonts.OpenSansRegular,
    color: Colors.secondary,
    size: 9,
  },
  firstName: {
    font: Fonts.OpenSansRegular,
    color: Colors.primary,
    size: 14,
  },
  lastName: {
    font: Fonts.OpenSansRegular,
    color: Colors.blue,
    size: 14,
  },
  tagline: {
    font: Fonts.OpenSansRegular,
    color: Colors.primary,
    size: 8,
  },
  sectionTitle: {
    font: Fonts.OpenSansRegular,
    color: Colors.secondary,
    size: 10,
  },
  inlines: {
    size: 7,
    color: Colors.gray,
    font: Fonts.RobotoRegular,
  },
  pageInlines: {
    size: 8,
    color: Colors.gray,
    font: Fonts.RobotoRegular,
  },
  body: {
    color: Colors.tertiary,
    size: 8,
    height: 1.2,
    font: Fonts.RobotoLight,
  },
  footer: {
    color: Colors.gray,
    size: 7,
    height: 1.0,
    font: Fonts.RobotoLight,
  },
  projectTitle: {
    color: Colors.secondary,
    size: 8,
    height: 1.0,
    font: Fonts.OpenSansRegular,
    marginBottom: 3
  }
}
