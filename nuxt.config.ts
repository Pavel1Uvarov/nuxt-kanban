export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/image', 'shadcn-nuxt', 'nuxt-icon', '@pinia/nuxt', ['@nuxtjs/google-fonts', {
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
	runtimeConfig: {
		public: {
			APP_WRITE_PROJECT_ID: process.env.APP_WRITE_PROJECT_ID,
			APP_WRITE_PROJECT_DB_ID: process.env.APP_WRITE_PROJECT_DB_ID,
			APP_WRITE_RECORDS_COLLECTION_ID: process.env.APP_WRITE_RECORDS_COLLECTION_ID,
			APP_WRITE_STAFF_COLLECTION_ID: process.env.APP_WRITE_STAFF_COLLECTION_ID,
			APP_WRITE_COMMENTS_COLLECTION_ID: process.env.APP_WRITE_COMMENTS_COLLECTION_ID,
			APP_WRITE_STORAGE_ID: process.env.APP_WRITE_STORAGE_ID,
		},
	},
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
	pinia: {
		storeDirs: ['./store/**'],
	},
});
