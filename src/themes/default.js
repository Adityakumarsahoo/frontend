const theme = {
    // Temp fonts
    fonts: {
      title: "Space Grotesk, sans-serif",
      main: "Space Grotesk, sans-serif"
    },
    // Colors for layout
    colors: {
      primary1: "#854CE6",
      background1: "#222A35",
      button: "#854CE6",
      background2: "#19212C",
      text: "#C8CFD8",
      text1: "#F2F5F7",
      text2: "#626970",
      text3: "#575C66",
      footerBackground: "#00012B"
    },
    // Breakpoints for responsive design
    breakpoints: {
      sm: 'screen and (max-width: 640px)',
      md: 'screen and (max-width: 768px)',
      lg: 'screen and (max-width: 1024px)',
      xl: 'screen and (max-width: 1280px)'
    },
  }

export const darkTheme = {
    ...theme,
    primary: "#854CE6",
    white: "#FFFFFF",
    bg: "#0F0F1A",
    card: "#191928",
    card_light: "#1E1E2F",
    text_primary: "#F0F0F5",
    text_secondary: "#A0A0B5",
    soft: "#C8CFD8",
    soft2: "#8A8A9D",
}

export const lightTheme = {
    ...theme,
    primary: "#854CE6",
    white: "#000000",
    bg: "#F8F9FC",
    card: "#FFFFFF",
    card_light: "rgba(255,255,255,0.8)",
    text_primary: "#1A1A2E",
    text_secondary: "#4A4A5E",
    soft: "#2C2C3E",
    soft2: "#6A6A7D",
}