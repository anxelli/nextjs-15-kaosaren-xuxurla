import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const tsRules = compat.config({
	extends: ['next/core-web-vitals', 'next/typescript']
})

const jsRules = {
	files: ['**/*.js', '**/*.jsx'],
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'no-unused-vars': 'warn',
		'no-undef': 'error'
	}
}

export default [...tsRules, jsRules]
