import { isPlainObject } from './utils'

/**
 * 在HTTP请求中,header是不区分大小写的
 * axios会改变headers中指定名称的header的key,如 将content-type改为 Content-Type
 * @param {*} headers 请求头
 * @param {string} normalizeName 需要改变的header
 * @return {*}
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  // 遍历headers
  Object.keys(headers).forEach(name => {
    // 如果headers中的key和normalizeKey(Content-Type这样的驼峰式)只有大小写一样,那么将原本的key替换成normalizeKey,主要是为了同意headers中的格式
    if (name !== normalizeName && name.toLocaleUpperCase() === normalizeName.toLocaleUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理请求头 headers设置默认值 后续无需再判断header是否存在,有默认值 必存在
export function processHeaders(headers = {} as any, data: any): any {
  // 如果 Content-Type已经存在,无论是哪种大小写形式,先将其转换为Content-Type
  // 否则 Content-Type各种形式,后续很难做判断
  normalizeHeaderName(headers, 'Content-Type')
  // data存在并且Content-Type不存在
  if (isPlainObject(data)) {
    // 找到Content-Type,如果上面没做转换 那么这一步不好做
    if (!headers['Content-Type']) {
      // 设置请求头,否则对象无法正常传递
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
