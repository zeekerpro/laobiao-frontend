import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
    alias: {
      '@views': './src/lib/views',
      '@components': './src/lib/components',
      '@stores': './src/lib/stores',
      '@utils': './src/lib/utils',
      '@styles': './src/lib/styles',
      '@apis': './src/apis'
    }
	},

};

export default config;
