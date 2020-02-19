const { engine, engineMap } = require('./config')
const formatCls = (p, c) => p + '-' + c
const { prefix, cls, line, item, wrap, image } = engineMap[engine]

module.exports = {
  codeStart: () => '<' + line +' ' + cls + '="' + prefix + '"><' + wrap +' scrollX ' + cls + '="pre">',
  codeEnd: () => '</' + wrap + '></' + line + '>',
  image: (alt, src, c1, c2) => {
    let o = '<' + line + ' ' + cls + '="' + c1 + '"><' + image + ' src="' + src + '" alt="' + alt + '"'
    if (c2) {
      o += ' ' + cls + '="' + c2 + '"'
    }
    o += ' /></' + line +'>'
    return o
  },
  h: (num, title) => '<' + line + ' ' + cls + '="h' + num + '">' + title + '</' + line + '>',
  text: (str) => '<' + item  + '>' + str + '</' + item + '>',
  line: (s, c) => '<' + line + ' ' + cls + '="' + formatCls(prefix, c) + '">' + s + '</' + line + '>',
  item: (s, c) => '<' + item + ' ' + cls + '="' + formatCls(prefix, c) + '">' + s + '</' + item + '>',
  space: (c) => '<' + item + ' ' + cls + '="' + formatCls(prefix, c) + '" decode>&nbsp;</' + item + '>',
}