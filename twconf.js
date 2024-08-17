tailwind.config = {
  theme: {
    extend: {
      padding: ["last"],
      spacing: {
        "6/7": "86%",
        94: "23.5rem",
        90: "22.5rem",
        74: "18.5rem",
        30: "7.5rem",
        22: "5.5rem",
        1.25: "0.3125rem",
      },
      minWidth: {
        7.5: "1.875rem",
        50: "12.5rem",
        100: "25rem",
      },
      fontSize: {
        15: "15px",
        title: "22px",
      },
      screens: {
        phoneS: "320px",
        // => @media (min-width: 640px) { ... }

        phoneM: "375px",
        // => @media (min-width: 1024px) { ... }

        phoneL: "425px",
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        "main-blue": "#1C2627",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        context: ["Satoshi", "sans-serif"],
      },
    },
  },
};
