import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Our new Asili Collective Palette
        asili: {
          'base': '#F8F1EA',  // The warm, light background color (exact from your logo)
          'gold': '#C59D3F',  // The rich gold border and text color (from your logo)
          'tan': '#DAA15F',   // The medium orange-tan in the patterned map
          'rust': '#BA6E3C',  // The darker reddish-brown in the patterned map
          'accent': '#DAA15F', // We can use the tan as an accent, e.g., for hovers
        },
      },
    },
  },
  plugins: [],
}
export default config



// Deep Repair Sync: 2026-04-11 17:28:30