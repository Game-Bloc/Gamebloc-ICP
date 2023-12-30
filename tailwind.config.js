/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: { first: "#01070E", second: "#F6B8FC" },
      white: "#ffffff",
      black: "#000000",
      gray: "#808080",
    },
    extend: {
      fontFamily: {
        valorant: ["Valorant"],
        body: ["Open Sans"],
      },
    },
  },
  plugins: [],
};
