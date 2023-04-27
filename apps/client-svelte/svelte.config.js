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
      '@views': './src/views',
      '@components': './src/components',
      '@stores': './src/stores',
      '@utils': './src/utils',
      '@styles': './src/styles',
    }
	}
};

export default config;
