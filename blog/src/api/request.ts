import type { RequestConfig } from './axios'
import MyAxios from './axios'
import { baseURL } from './baseUrl'

interface TheRequestConfig<T> extends RequestConfig {
    data?: T
}

const request = new MyAxios({
    baseURL ,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        // 响应拦截器
        responseInterceptors: result => result
    }
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {RequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const Request = <T = any, D = any>(config: TheRequestConfig<D>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<T>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
    return request.cancelAllRequest()
}

export default Request