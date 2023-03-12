/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(--font-inter)`],
      },
      colors: {
        brand: {
          background: {
            DEFAULT: "#000814",
            400: "#000A1A",
          },
          primary: "#fb6f92",
          secondary: "#7371fc",
        },
      },
      backgroundImage: {
        "radial-gradient": `
        conic-gradient(from 0deg at 50% 50%, #7371fc 0%, #af99ff 2%, #073AFFFF 100%);
        `,
      },
      boxShadow: {
        "glow-primary": "0px 0px 53px 0px rgba(251,111,146,0.3)",
        "glow-secondary": "0px 0px 53px 0px rgba(115,113,252,0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
