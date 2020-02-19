
module.exports = {
  engine: 'js',
  // 支持的编程语言
  // 属性高亮(keywords, operator..)
  supports: {
    javascript: {
      keywords: [
        'abstract',	'arguments',	'boolean',	'break',	'byte', 'case',	'catch',	'char',	'class',	'const', 'continue',	'debugger',	'default',	'delete',	'do', 'double',	'else',	'enum',	'eval',	'export', 'extends',	'false',	'final',	'finally',	'float', 'for',	'function',	'goto',	'if',	'implements', 'import',	'in',	'instanceof',	'int',	'interface', 'let',	'long',	'native',	'new',	'null', 'package',	'private',	'protected',	'public',	'render', 'return', 'short',	'static',	'super',	'switch',	'synchronized', 'this',	'throw',	'throws',	'transient',	'true', 'try',	'typeof',	'var',	'void',	'volatile', 'while',	'with',	'yield',
      ],
      custom: []
    },
    bash: {
      keywords: [],
    }
  },
  engineMap: {
    taro: {
      prefix: 'hl',
      cls: 'className',
      line: 'View',
      item: 'Text',
      wrap: 'ScrollView',
      image: 'Image',
      lt: '{String.fromCharCode(60)}',
      gt: '',
      bt: '{String.fromCharCode(123)}'
    },
    js: {
      prefix: 'hl',
      cls: 'class',
      line: 'div',
      item: 'span',
      wrap: 'pre',
      image: 'img',
      lt: '<',
      gt: '',
      bt: '{'
    }
  }
}
