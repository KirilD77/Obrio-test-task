import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'button-active': "linear-gradient(166deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A1 74.96%)",
        'explanatory-info-bg': "linear-gradient(166deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A1 74.96%)"

      },
      colors: {
        "button-active": "#FBFBFF"
      }
    },
  },
  plugins: [],
}
export default config
