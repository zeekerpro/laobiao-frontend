/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          'primary': "#103c58",
        }
      },
      "night"
    ],
    darkTheme: "night",
  }
}
