import { AxiosRequestConfig } from './types'
import { buildURL } from './utils/url'
import { processHeaders } from './utils/header'
import { buildRequestData } from './utils/data'
import xhr from './xhr'

// 处理config参数
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  // header的处理需要放在data前,否则data被JSON字符串化,影响判断
  config.headers = transfromHeaders(config)
  config.data = transformRequestData(config)
}

// 转换URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 转换Request中的data
function transformRequestData(config: AxiosRequestConfig): any {
  return buildRequestData(config.data)
}

// 转换请求头
function transfromHeaders(config: AxiosRequestConfig): any {
  // 给header默认值是因为processHeaders中做了判断,不能为假值
  const { headers, data } = config
  return processHeaders(headers, data)
}

// axios
function axios(config: AxiosRequestConfig) {
  // 处理config参数
  processConfig(config)
  // xhr,对XMTHttpRequest进行封装
  xhr(config)
}

export default axios
