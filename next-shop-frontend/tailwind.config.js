/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		}
		return `rgb(var(${variableName}))`;
	};
}

module.exports = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/common/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-vazir)", ...fontFamily.sans],
			},
			colors: {
				primary: {
					900: withOpacity("--color-primary-900"),
					800: withOpacity("--color-primary-800"),
					700: withOpacity("--color-primary-700"),
					600: withOpacity("--color-primary-600"),
					500: withOpacity("--color-primary-500"),
					400: withOpacity("--color-primary-400"),
					300: withOpacity("--color-primary-300"),
					200: withOpacity("--color-primary-200"),
					100: withOpacity("--color-primary-100"),
				},
				secondary: {
					900: withOpacity("--color-secondary-900"),
					800: withOpacity("--color-secondary-800"),
					700: withOpacity("--color-secondary-700"),
					600: withOpacity("--color-secondary-600"),
					500: withOpacity("--color-secondary-500"),
					400: withOpacity("--color-secondary-400"),
					300: withOpacity("--color-secondary-300"),
					200: withOpacity("--color-secondary-200"),
					100: withOpacity("--color-secondary-100"),
					50: withOpacity("--color-secondary-50"),
					0: withOpacity("--color-secondary-0"),
				},
				success: withOpacity("--color-success"),
				warning: withOpacity("--color-warning"),
				error: withOpacity("--color-error"),
			},
			container: {
				center: true,
			},
			fontSize: {
				sm: "0.8rem",
				base: "1rem",
				xl: "1.25rem",
				"2xl": "1.563rem",
				"3xl": "1.953rem",
				"4xl": "2.441rem",
				"5xl": "3.052rem",
				xs: "0.75rem",
				xxs: "0.7rem",
				xxxs: "0.6rem",
				md: "0.9rem",
			},
			boxShadow: {
				"input-focus": "0 12px 24px -8px rgb(var(--color-primary-300))",
			},
			gridTemplateColumns: {
				15: "repeat(15, minmax(0, 1fr))",
			},
			gridColumn: {
				"span-14": "span 14 / span 14",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		// ...
	],
};
