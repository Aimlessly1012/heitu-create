// 小驼峰转换
function toCamelCase(str) {
  return str
    .toLowerCase() // 将字符串全部转换为小写
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase()); // 将非字母数字字符后的字母转换为大写
}
// 大驼峰转换
function toPascalCase(str) {
  return str
    .toLowerCase() // 将字符串全部转换为小写
    .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (match, chr) => chr.toUpperCase()); // 将每个单词的首字母转换为大写
}
export { toPascalCase, toCamelCase };
