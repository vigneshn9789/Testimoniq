/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [

    // function ({ addComponents }) {
    //   const masonry = {
    //     '.masonry': {
    //       columnCount: '1',
    //       columnGap: '1.5rem',
    //     },
    //     '@screen sm': {
    //       '.sm\\:masonry-sm': {
    //         columnCount: '2',
    //       },
    //     },
    //     '@screen md': {
    //       '.md\\:masonry-md': {
    //         columnCount: '3',
    //       },
    //     },
    //     '@screen lg': {
    //       '.lg\\:masonry-lg': {
    //         columnCount: '4',
    //       },
    //     },
    //     '.masonry > *': {
    //       marginBottom: '1.5rem',
    //       display: 'inline-block',
    //       width: '100%',
    //     },
    //   };

    //   addComponents(masonry);
    // },
  ],
}