import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		host: 'localhost',
		port: 3001,
		proxy: {
			'/api/': {
				target: 'http://localhost:2022',
				secure: false,
				ws: false
			}
		}
	}
});