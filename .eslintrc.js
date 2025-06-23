module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'react-app',
        'react-app/jest',
        'airbnb',
        'prettier'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    rules: {
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off'
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}; 