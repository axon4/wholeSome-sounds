import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfiguration from './vite.config';

export default mergeConfig(
	viteConfiguration,
	defineConfig({
		test: {
			environment: 'jsdom',
			exclude: [...configDefaults.exclude, 'e2e/*'],
			root: fileURLToPath(new URL('./', import.meta.url)),
			transformMode: {
				web: [/\.[jt]sx$/],
			}
		}
	})
);