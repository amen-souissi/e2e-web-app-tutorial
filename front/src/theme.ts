import { createMuiTheme } from "@material-ui/core/styles";
import Color from "color";

interface Props {
  primaryColor: string;
  secondaryColor: string;
}

export const createTheme = ({ primaryColor, secondaryColor }: Props) => {
  const primary = Color(primaryColor);
  const secondary = Color(secondaryColor);
  return createMuiTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: primary
          .lighten(1)
          .mix(Color("white"))
          .hex(),
        dark: primary.darken(0.2).hex()
      },
      secondary: {
        main: secondaryColor,
        light: secondary
          .lighten(1)
          .mix(Color("white"))
          .hex(),
        dark: secondary.darken(0.2).hex()
      }
    },

    typography: {
      htmlFontSize: 15,
      fontFamily:
        '"LatoWebMedium", "Helvetica Neue", Helvetica, Arial, sans-serif',
      body1: {
        letterSpacing: 0.3
      },
      body2: {
        letterSpacing: 0.3
      }
    }
  });
};

const aubergineTheme = {
  primaryColor: "#4D394B",
  secondaryColor: "#4C9689"
};

export default createTheme(aubergineTheme);
