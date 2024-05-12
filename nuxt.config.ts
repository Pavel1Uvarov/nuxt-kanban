export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/image', 'shadcn-nuxt', 'nuxt-icon', ['@nuxtjs/google-fonts', {
		families: {
			'Roboto': true,
			'Inter': '200..700', // Merged the configurations for 'Inter'
			'Josefin+Sans': true,
			'Lato': [100, 300],
			'Raleway': {
				wght: [100, 400],
				ital: [100],
			},
			'Crimson Pro': {
				wght: '200..900',
				ital: '200..700',
			},
		},
	}]],
	css: ['~/assets/css/main.css'],
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	shadcn: {
		prefix: 'Ui',
		componentDir: './components/ui',
	},
});
