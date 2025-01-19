module.exports = {
  safelist: [
    {
      pattern: /basis-(\d+)/,
    },
  ],
  content: ["./src/**/*.{html,ts}"],
  plugins: [require("tailwindcss-primeui")],
};
