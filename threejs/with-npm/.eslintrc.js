// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'func-names': 0,
        'arrow-body-style': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'no-return-assign': 0,
        'max-len': 0,
        'consistent-return': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
        'comma-dangle': ['error', 'never'],
        // warnning
        'no-debugger': 2,


        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'quotes': ['error', 'single'],
        // 'semi': ['error', 'always'],
        'vars-on-top': 2,
        'no-await-in-loop': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'no-mixed-operators': 0,
        'no-restricted-syntax': 0,
        'no-unused-vars': 0,
        'no-else-return': 0,
        'no-lonely-if': 0,
        'import/no-dynamic-require': 0,
        'global-require': 0,
        'radix': 0,
        'import/prefer-default-export': 0,
        'no-continue': 0,
        'linebreak-style': 0,
        'promise/always-return': 0,
        'promise/no-callback-in-promise': 0,
        'camelcase': 0,
        'no-restricted-globals': ['error', 'fdescribe'],
        'no-underscore-dangle': 0,
        'handle-callback-err': 0,

        // 'vue/require-v-for-key': 0,
        // 'no-shadow': 0,
        // 'prefer-arrow-callback': 0,
        // 'promise/catch-or-return': 0,
        // 'promise/no-nesting': 0,
        // 'array-callback-return': 0,
        // 'no-extra-semi': 0,
        // 'no-empty': 0,
        // 'vue/no-parsing-error': 0,
        // 'vue/no-invalid-template-root': 0,
        // 'import/no-duplicates': 0,
        // 'no-var': 0,
        // 'one-var': 0,
        // 'one-var-declaration-per-line': 0,
        // 'no-useless-return': 0,
        // 'no-unused-expressions': 0,
        // 'dot-notation': 0,
        // 'no-tabs': 0,
        // 'no-mixed-spaces-and-tabs': 0,
        // 'vue/no-invalid-v-model': 0,
        // 'vue/no-invalid-v-for': 0,
        // 'no-empty-function': 0,
        // 'no-use-before-define': 0,
        // 'default-case': 0,
        // 'object-curly-spacing': 0,

        'space-before-function-paren': 0,
        'no-useless-escape': 0,
        'promise/avoid-new': 0,
        'class-methods-use-this': 0,
        'quote-props': 0,
        'import/first': 0,
        'spaced-comment': 0,
        'object-shorthand': 0,
        'arrow-parens': 0,
        'guard-for-in': 0,
        'import/newline-after-import': 0,
        'no-plusplus': 0,
        'no-return-await': 0,
        'prefer-template': 0,
        'no-param-reassign': 0,
        'prefer-destructuring': 0
    }
}