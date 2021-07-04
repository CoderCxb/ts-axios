import { isPlainObject } from './utils'

// 处理请求中的data
export function buildRequestData(data: any): any {
  // 如果是普通对象
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  } else {
    return data
  }
}
