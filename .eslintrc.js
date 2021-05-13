module.exports = {
	env: {
		browser: true,
		node: true,
		mocha: true,
		es2021: true,
	},
	extends: ['eslint:recommended'],
	globals: {
		define: 'readonly',
	},
	parserOptions: {},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
	},
};
