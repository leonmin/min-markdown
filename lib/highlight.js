const format = require('./fomart')
const { supports, engine, engineMap } = require('./config')
const { lt, bt } = engineMap[engine]

module.exports = (line, lanuage) => {
  // 步骤
  // 1. 分割代码和注释
  // 2. 获取tab
  // 样式覆盖
  // 1. < 小于或标签开
  // 2. > 大于或标签合
  // 3. . 访问符或小数
  console.log(line)
  let code  = line// 代码
  let codes = []
  let comment = '' // 注释
  let items = ''

  // 分割因子
  const keywords = supports[lanuage].keywords
  const custom = supports[lanuage].custom
  const factor = '[]().,{}><+=- '
  
  const isFactor = f => factor.includes(f)
  const split = arr => arr.reduce((acc, cur) => {
    if (isFactor(cur)) {
      return [...acc, cur, '']
    } else {
      return [...acc.slice(0, -1), acc.slice(-1)[0] + cur]
    }
  }, [''])
  // 分割代码和注释
  if (line.includes('// ')) {
    let cc = line.split('// ')
    code = cc[0]
    comment = '// ' + cc[1]
  }
  if (code) {
    codes = split(code.split(''))
  }
  // 高亮代码
  if (codes && codes.length > 0) {
    items = codes.reduce((acc, cur) => {
      if (cur === '') {
        return acc + cur
      } else if (cur === ' ') {
        return acc + format.space('sp')
      } else if ('<' === cur) {
        return acc + format.item(lt, 'lt') // '<'
      } else if ('{' === cur) {
        return acc + format.item(bt, 'lb') // '{'
      } else if (keywords && keywords.includes(cur)) {
        return acc + format.item(cur, 'kw') // 'keyword'
      } else if (cur === '.') {
        return acc + format.item(cur, 'do') // '.'
      } else if ('[](),>+=-'.includes(cur)) {
        return acc + format.item(cur, 'sy') // '[](),+=-'
      } else if (custom && custom.includes(cur)) {
        return acc + format.item(cur, 'cu') // 'custom'
      } else if (cur.startsWith('\'') && cur.endsWith('\'')
        || cur.startsWith('"') && cur.endsWith('"')) {
          return acc + format.item(cur, 'pv') // 'property value'
      } else if (/^[A-Z]+?/.test(cur)) {
        return acc + format.item(cur, 'uc') // 'Class'
      } else if (/\d+/.test(cur)) {
        return acc + format.item(cur, 'nu') // '1'
      } else {
        return acc + format.item(cur, 'de')
      }
    }, '')
  }
  // 处理注释 '<', '{' 在Taro中不处理显示异常
  if (comment && comment.length > 0) {
    comment = comment.replace(/{/g, bt)
    comment = comment.replace(/</g, lt)
    items += format.item(comment, 'co')
  }
  return format.line(items, 'li')
}

// class map

// 正文块
// line 行
// code 行内代码
// bold 粗体
// h4 标题
// ol 有序李彪
// ul 无序列表
// on order number 序号
// un unorder number 无序号
// 代码块
// sp space 空格
// sy symbol 符号
// lt less than 小于
// lb left brace 左括号
// kw keyword 关键字
// cu custom 自定义
// co comment 注释
// de default 默认
// do dot 点
// pv property value 属性值
// pk property key 数值名
// nu number 数字
// li line 行
// uc upper case
