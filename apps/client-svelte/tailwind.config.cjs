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
          ...require("daisyui/src/colors/themes")["[data-theme=winter]"],
          'primary': "#103c58",
        }
      },
      {
        night: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          'primary': "#103c58",
        }
      }
    ],
    darkTheme: "night",
  }
}
