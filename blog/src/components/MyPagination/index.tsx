import './pagination.custom.scss'

import { Pagination } from 'antd'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'

import { rootStore } from '@/mobx'

import s from './index.scss'

interface Props {
  current?: number
  defaultPageSize?: number
  total?: number
  setPage?: Function
  scrollToTop?: number
  autoScroll?: boolean
}

const MyPagination: React.FC<Props> = ({
  current,
  defaultPageSize = 8,
  total = 0,
  setPage,
  scrollToTop = 0,
  autoScroll = false
}) => {
  const store = useLocalObservable(() => rootStore)
  const P = () => <div id='myPagination' className={s.pageBox}>
    <Pagination
      current={current}
      total={total}
      defaultPageSize={defaultPageSize}
      showSizeChanger={false}
      showTitle={false}
      onChange={(page: number) => {
        setPage?.(page)
        store.uiStore.setNavShow(false)
        autoScroll && window.scrollTo(0, scrollToTop)
      }}
    />
  </div>
  return useObserver(() =>
    <>
      {/* {total > defaultPageSize ? P() : null} */}
      <P />
    </>
  )
}

export default MyPagination
