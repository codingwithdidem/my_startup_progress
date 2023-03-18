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
          primary: "#bd7a0e",
          secondary: "#390099",
        },
      },
      backgroundImage: {
        "radial-gradient": `
        conic-gradient(from 0deg at 50% 50%, #003249 0%, #af99ff 2%, #390099 100%);
        `,
      },
      boxShadow: {
        "glow-primary": "0px 0px 53px 0px rgba(0,50,73,0.7)",
        "glow-secondary": "0px 0px 53px 0px rgba(56,0,153,0.7)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
