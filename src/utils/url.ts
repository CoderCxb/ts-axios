import { isDate, isPlainObject } from './utils'

// @ : $ , + [] 不需要进行encodeURIComponent,所以需要改回去
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  // params不存在时,直接返回url
  if (!params) {
    return url
  }
  // 存放params处理过的key=value形式的字符串数组
  const parts: string[] = []
  // 遍历params
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 忽略 null 和 undefined
    if (val === null || val === undefined) {
      return // 进入下次循环,因为forEach无法使用return中断
    }
    // values存放key对应的值 如果是数组,会有多个值对应
    let values: Array<any> = []
    // 数组
    if (Array.isArray(val)) {
      for (const v of val) {
        key += '[]' // axios中,属性是数组时,属性名为key[]
        values.push(v)
      }
      // 非数组
    } else {
      values.push(val)
    }
    // 遍历values
    values.forEach(val => {
      // Date使用toISOString()的字符串
      if (isDate(val)) {
        val = val.toISOString()
        // 普通对象直接JSON化
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // 将 key=value 形式的值存入parts
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // 将parts使用&进行拼接
  let serializedParams = parts.join('&')
  // 如果没有params,则parts为空,拼接结果为 ''
  if (serializedParams) {
    // 去除hash,将#后面的字符抛弃
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }
    // 如果原本的url已经带有?,则使用&拼接,若没有,使用?拼接
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
