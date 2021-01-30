/**
 * 获取url参数
 * @param name 参数名
 */
export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(decodeURI(r[2]))
  return null
}
