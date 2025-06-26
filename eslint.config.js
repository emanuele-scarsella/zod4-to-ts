import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: {
            js
        },
        extends: ['js/recommended']
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'none'
                }
            ],
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'zod',
                            message: "Please import from 'zod/v4' instead."
                        }
                    ]
                }
            ]
        }
    },
    tseslint.configs.recommended,
    {
        files: ['**/*.json'],
        plugins: {
            json
        },
        language: 'json/json',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.jsonc'],
        plugins: {
            json
        },
        language: 'json/jsonc',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.md'],
        plugins: {
            markdown
        },
        language: 'markdown/gfm',
        extends: ['markdown/recommended']
    },
    {
        ignores: ['dist', 'package-lock.json', '.husky', 'coverage']
    },
    eslintPluginPrettierRecommended
]);
