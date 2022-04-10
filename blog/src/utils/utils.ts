export function getFileType(filename) { // 获取文件类型
  const reg = /\.[^\.]+$/
  const matches = reg.exec(filename)
  if (matches) {
    return matches[0]
  }
  return ''
}

export function isNumber(str) { // 是否是数字
  return /^[0-9]+$/.test(str)
}

export const isEN = (str) => { // 是否是英文
  return /^[A-Za-z]+$/.test(str)
}

export function isZHEN(str) { // 是否是中英文
  return /^[\u4e00-\u9fa5A-Za-z ]+$/.test(str)
}

export function removeEmojis(string) { // 去除emoji
  const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
  return string.replace(regex, '')
}

export function removeIllegal(str) { // 去除非法字符
  // strip off illegal characters
  return str.replace(/[`~!@#$%^&*()_+<>?:"{},.\/'[\]]/g, "")
}

export function toThousands(num) { // 数据转钱的格式
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// 节流 防抖
export function throttle(callback, wait = 500) {
  let start = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - start >= wait) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      callback.call(this, ...args)
      start = now
    }
  }
}

export function debounce(callback, wait = 500) {
  let timeout = null
  return function (...args) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    // @ts-ignore
    timeout = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      callback.call(this, ...args)
      timeout = null
    }, wait)
  }
}

export function asyncThrottle(callback, wait = 1000) {
  // async节流 一定时间内调用同一个async函数，返回同一个promise

  let start = 0
  let cachePromise = null
  return async function (...args) {
    const now = new Date().getTime()
    if (now - start >= wait) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      cachePromise = callback.call(this, ...args)
      start = now
    }
    await cachePromise
  }
}


export function sleep(time = 1000) { // 睡眠
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time))
}

export function dateFormat(format, date = new Date()) { // 时间格式化
  // yyyy-MM-dd hh:mm:ss
  if (!(date instanceof Date)) throw new TypeError('date must be a Date')
  const timeObj = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1,
    M: date.getMonth() + 1,
    dd: date.getDate(),
    d: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
    SSS: date.getMilliseconds()
  }
  const padOptions = {
    MM: 2,
    dd: 2,
    hh: 2,
    mm: 2,
    ss: 2,
    SSS: 3
  }
  Object.keys(timeObj).forEach(key => {
    const option = padOptions[key]
    if (option) {
      timeObj[key] = String(timeObj[key]).padStart(option, '0')
    }
    format = format.replace(key, timeObj[key])
  })
  return format
}

export function getDate(date = new Date()) {
  return dateFormat('yyyy-MM-dd', date)
}

// ios时间格式
export function iosTimeString(str) {
  return str.replace(/-/g, '/')
}

// 随机数组项
export function randomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(arr) { // 洗牌
  const input = arr.concat([])
  for (let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = input[randomIndex]
    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

export function chunk(array, size) {
  // 数组分割
  // https://www.lodashjs.com/docs/lodash.chunk/
  // https://blog.csdn.net/gaochengyidlmu/article/details/55805563
  const length = array === null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0;
  let resIndex = 0;
  let result = Array(Math.ceil(length / size))
  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}


export function hexToRgba(color) {
  // 16进制转化成rgba
  // hexToRgba("#ffffff")  // rgb(255,255,255)

  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  color = color.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      color = color + color.substring(1, 4)
    }
    // 处理六位的颜色值，转为RGB
    // @ts-ignore
    const colorChange = []
    for (let i = 1; i < 7; i += 2) {
      // @ts-ignore
      colorChange.push(parseInt("0x" + color.slice(i, i + 2), 10))
    }
    return `rgb(${colorChange.join(",")})`
  } else {
    return color
  }
}

// 从url?号后一截获取query参数
export function getQuery(searchParamsString) {
  return searchParamsString.split('&').reduce((searchParams, curKV) => {
    const [k, v] = curKV.split('=').map(decodeURIComponent)
    searchParams[k] = v
    return searchParams
  }, {})
}

export function promiseConcurrence(arr, max, callback = () => { }) {
  // 现在要来实现多个异步的并发控制
  // arr存储的是调用后返回promise的函数

  // 存储并发max的promise数组
  let promiseArr = [] as any; let i = 0

  function runOne() {
    if (i === arr.length) {
      // 所有请求都处理完，返回resolve
      return Promise.resolve()
    }

    // 执行一个函数,i++，保存fetch返回的promise
    let one = arr[i++]()
    // 将当前promise存入并发数组
    promiseArr.push(one)
    // 当promise执行完毕后，从数组删除
    // then是异步的，放哪个位置都可以
    one.then(() => {
      // console.log(i, 'one.then', one)
      promiseArr.splice(promiseArr.indexOf(one), 1)
    })

    // 如果当并行数量达到最大
    if (promiseArr.length >= max) {
      // 用race等队列里有promise完成了才调用runOne
      // race返回值是一个待定的 Promise 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的值
      return Promise.race(promiseArr).then(() => { return runOne() })
    }
    // 否则直接调用runOne让下一个并发入列
    return runOne()
  }

  // arr循环完后
  // 现在promiseArr里面剩下最后max个promise对象
  // 使用all等待所有的都完成之后执行callback
  runOne()
    .then(() => Promise.all(promiseArr))
    .then(() => {
      callback()
    })
}