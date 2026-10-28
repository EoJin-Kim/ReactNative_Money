module.exports = {
    tabWidth: 4,
    singleQuote: true,
    semi: false,
    trailingComma: 'es5',

    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    tailwindAttributes: ['className'],
}
