import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'GET', data, headers = {} } = config
  // 创建XMR实例
  const request = new XMLHttpRequest()
  // 设置请求
  request.open(method.toUpperCase(), url, true)
  Object.keys(headers).forEach(headerName => {
    // 如果content-type存在,但是没有data,则删除content-type请求头
    if (!data && headerName.toLocaleLowerCase() === 'content-type') {
      delete headers[headerName]
    } else {
      // data存在时,content-type一定存在,设置request的请求头
      request.setRequestHeader(headerName, headers[headerName])
    }
  })

  // 发送data
  request.send(data)
}
