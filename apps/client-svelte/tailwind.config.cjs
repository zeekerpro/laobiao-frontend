/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=winter]"],
          'primary': "#103c58",
        }
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          'primary': "#103c58",
        }
      }
    ],
  }
}
