import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
// import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {enabled: true},
			manifest: {
				name: 'WholeSome Sounds',
				theme_color: '#FF5E3A',
				icons: [{
					src: 'images/icon.png',
					type: 'image/png',
					sizes: '192x192'
				}]
			},
			workbox: {
				globPatterns: ['**/*.{html,css,jpg,png,js}']
			}
		})
		// visualizer({open: true})
	],
	resolve: {
		alias: {'@': fileURLToPath(new URL('./src', import.meta.url))}
	},
	test: {globals: true}
});