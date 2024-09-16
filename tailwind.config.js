/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blackDark : "000000",
        blackBrand : "#222831",
        greyBrand : "393E46",
        whiteBrand : "#EEEEEE",
        greenBrand : "#00AD85",

      },
      fontFamily: {
        kanit: ['var(--font-kanit)'],
      },
    },
  },
  plugins: [],
};
