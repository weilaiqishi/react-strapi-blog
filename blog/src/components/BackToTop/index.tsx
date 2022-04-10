import './index.custom.scss'

import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { BackTop } from 'antd'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'

import { rootStore } from '@/mobx'

import s from './index.scss'

interface Props {
  setNavShow?: Function
}

const BackToTop: React.FC<Props> = () => {
  const store = useLocalObservable(() => rootStore)
  return (
    <BackTop
      duration={700}
      visibilityHeight={300}
      onClick={() => store.uiStore.setNavShow(true)}
      className='BackTop'
    >
      <div className={s.backTop}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  )
}

export default BackToTop
