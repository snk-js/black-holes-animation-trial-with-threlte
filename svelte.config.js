import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$stores: './src/stores',
			$styles: './src/styles',
			$utils: './src/utils',
			$src: './src'
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapterStatic({
			pages: 'build',
			strict: false,
			fallback: 'index.html',
			assets: 'build',
			precompress: false
		}),

		paths: {
			base: '/rotating-black-holes-scene-with-threlte'
		}

	}
};

export default config;


