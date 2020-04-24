import { Colors, Fonts } from './constants'


export const Styles = {
  rung: {
    line: {
      color: Colors.blue,
      thickness: 1.0,
      dash: [],
    }
  },
  ladder: {
    line: {
      color: Colors.blue,
      thickness: 1.0,
      dash: [2, 2]
    }
  },
  section: {
    line: {
      padding: 10,
      width: 100,
      color: Colors.blue,
      thickness: 0.5,
      dash: [],
    }
  },
  brand: {
    size: {
      width: 15,
      height: 15
    }
  },
  page: {
    size: {
      width: 459,
      height: 594
    }
  },
  icon: {
    size: {
      width: 6,
      height: 6,
    }
  },
  logo: {
    margin: {
      right: 5,
    },
    size: {
      width: 24,
      height: 24,
    }
  },
  circle: {
    radius: 2,
  },
  title: {
    margin: {
      bottom: 3,
    },
    textStyle: {
      font: Fonts.LatoBold,
      size: 11,
      color: Colors.primary,
    },
  },
  subtitle: {
    margin: {
      bottom: 4,
    },
    textStyle: {
      font: Fonts.OpenSansRegular,
      color: Colors.secondary,
      size: 9,
    }
  },
  skill: {
    radius: 3.0,
    fillColor: Colors.blue,
    padding: {
      x: 3.0,
      y: 2.0,
    },
    textStyle: {
      font: Fonts.RobotoRegular,
      color: Colors.white,
      size: 8,
    },
  },
  skills: {
    padding: {
      x: 2.0,
      y: 2.0,
    }
  },
  firstName: {
    textStyle: {
      font: Fonts.OpenSansRegular,
      color: Colors.primary,
      size: 14,
    },
  },
  lastName: {
    textStyle: {
      font: Fonts.OpenSansRegular,
      color: Colors.blue,
      size: 14,
    }
  },
  tagline: {
    textStyle: {
      font: Fonts.OpenSansRegular,
      color: Colors.primary,
      size: 8,
    }
  },
  sectionTitle: {
    textStyle: {
      font: Fonts.OpenSansRegular,
      color: Colors.secondary,
      size: 10,
    }
  },
  inlines: {
    textStyle: {
      size: 7,
      color: Colors.gray,
      font: Fonts.RobotoRegular,
    },
  },
  pageInlines: {
    textStyle: {
      size: 8,
      color: Colors.gray,
      font: Fonts.RobotoRegular,
    }
  },
  body: {
    textStyle: {
      color: Colors.tertiary,
      size: 8,
      height: 1.2,
      font: Fonts.RobotoLight,
    }
  },
  footer: {
    textStyle: {
      color: Colors.gray,
      size: 7,
      height: 1.0,
      font: Fonts.RobotoLight,
    }
  },
  projectTitle: {
    margin: {
      bottom: 3,
    },
    textStyle: {
      color: Colors.secondary,
      size: 8,
      height: 1.0,
      font: Fonts.OpenSansRegular,
    }
  }
}
