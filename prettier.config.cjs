/*
 * @author KaySaith
 * @date 2020/8/30
 */

module.exports = {
  printWidth: 80,
  stylelintIntegration: true,
  eslintIntegration: true,
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: true,
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: 'none',
  // 对象大括号之间是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true,
  // 代码的解析引擎，默认为babylon，与babel相同。
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'strict',
  jsxBracketSameLine: false,
  endOfLine: 'lf'
};
