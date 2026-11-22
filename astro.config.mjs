import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dmitrakovich.github.io',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'always' },
});
