/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // No necesitas extender nada aquí si solo estás aplicando clases personalizadas
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".scrollbar-none": {
            overflow: "auto",
            "scrollbar-width": "none", // Firefox
            "-ms-overflow-style": "none", // IE, Edge
          },
          ".scrollbar-none::-webkit-scrollbar": {
            width: "0",
            height: "0", // Chrome, Safari, Edge
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
