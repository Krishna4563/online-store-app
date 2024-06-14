/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        neon: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        colorChange: {
          "0%, 100%": { backgroundColor: "rgba(255, 0, 0, 0.5)" },
          "50%": { backgroundColor: "rgba(0, 255, 255, 0.5)" },
        },
      },
      animation: {
        neon: "neon 15s ease infinite",
        colorChange: "colorChange 5s ease infinite",
      },
      colors: {
        "custom-dark-blue": "#1a202c",
      },
    },
  },
  plugins: [],
};
