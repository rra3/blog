import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using the src directory:
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // You can add custom themes, colors, fonts, etc. here
      // For example:
      // colors: {
      //   'custom-blue': '#1da1f2',
      // },
    },
  },
  plugins: [typography],
};
