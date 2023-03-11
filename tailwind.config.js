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
          secondary: "#af99ff",
        },
      },
    },
  },
  plugins: [],
};
