import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    clean: true,
    sourcemap: true,
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
    entry: ['./src/index.ts'],
    format: ['esm'],
    outDir: 'dist',
    dts: true,
    publicDir: 'public'
  }
]);