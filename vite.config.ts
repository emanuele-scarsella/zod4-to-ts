import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'zod4-to-ts',
            fileName: 'index',
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['zod'],
            output: {
                globals: {
                    zod: 'zod'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve('src/')
        }
    },
    test: {
        coverage: {
            reportsDirectory: 'coverage',
            exclude: ['*.*', '**/_*.*', '**/*.test.ts', '**/*.d.ts', 'dist', 'coverage']
        }
    },
    plugins: [dts({ rollupTypes: true })]
});
