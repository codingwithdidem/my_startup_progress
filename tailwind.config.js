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
          primary: "#CB3E79",
          secondary: "#390099",
        },
      },
      backgroundImage: {
        "conic-gradient": `
        conic-gradient(from 0deg at 50% 50%, #390099 35%, #CB3E79 100%);
        `,
      },
      boxShadow: {
        "glow-primary": "0px 0px 53px 0px rgba(203,62,121,0.7)",
        "glow-secondary": "0px 0px 53px 0px rgba(56,0,153,0.7)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
