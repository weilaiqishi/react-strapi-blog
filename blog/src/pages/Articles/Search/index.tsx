import { ArrowRightOutlined, RedoOutlined } from '@ant-design/icons'
import { useKeyPress, useMemoizedFn, useSafeState } from 'ahooks'
import { message } from 'antd'
import React, { useRef } from 'react'

import s from './index.scss'

interface Props {
  page: number
  setPage: Function
  title: string
  setTitle: Function
  setIsReset: Function
  run: Function
}

const Search: React.FC<Props> = ({ page, setPage, title, setTitle, setIsReset, run }) => {
  const [input, setInput] = useSafeState('')
  const inputRef = useRef(null)

  const search = useMemoizedFn(() => {
    if (!input) {
      message.info('请输入关键词再搜索!')
      return
    }
    setTimeout(() => {
      setTitle(input)
      setPage(1)
      run()
    }, 0)
  })

  const reset = useMemoizedFn(() => {
    if (!title && page === 1 && !input) {
      message.info('无需重置!')
      return
    }
    setTimeout(() => {
      setIsReset(true)
      setInput('')
      setTitle()
      setPage(1)
      run()
    }, 0)
  })

  useKeyPress(13, search, {
    target: inputRef
  })

  useKeyPress(27, reset, {
    target: inputRef
  })

  return (
    <div className={s.searchBox}>
      <input
        ref={inputRef}
        autoFocus
        type='text'
        placeholder='搜索文章标题...'
        className={s.search}
        value={input}
        onChange={e => setInput?.(e.target.value)}
      />
      {/* 搜索按钮 */}
      <div className={s.searchBtn} onClick={search}>
        <ArrowRightOutlined />
      </div>
      {/* 重置按钮 */}
      <div className={s.searchBtn} onClick={reset}>
        <RedoOutlined />
      </div>
    </div>
  )
}

export default Search
