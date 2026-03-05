/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                luxury: {
                    black: "#1a1a1a",
                    gold: "#c5a059",
                    cream: "#f9f8f6",
                    lightGray: "#f5f5f5",
                },
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
