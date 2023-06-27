/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          0: "#ffdd00",
          1: "#DABE0B",
          2: "#A59218",
          3: "#605720",
          4: "#262417",
        },
      },
    },
  },
  plugins: [],
};
