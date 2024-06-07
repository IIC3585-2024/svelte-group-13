import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@stores': '/src/stores.js',
			'@firebaseconf': '/src/routes/(auth)/firebase.js'
		}
	}
});
