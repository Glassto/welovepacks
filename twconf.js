tailwind.config = {
  theme: {
    extend: {
      minWidth: {
        50: "12.5rem",
        100: "25rem",
      },
      fontSize: {
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
