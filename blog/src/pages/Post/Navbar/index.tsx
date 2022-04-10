import './index.custom.scss'

import { MenuFoldOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Drawer } from 'antd'
import classNames from 'classnames'
import MarkNav from 'markdown-navbar'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'

import { rootStore } from '@/mobx'

import s from './index.scss'

interface Props {
  content?: string
  setNavShow?: Function
}

const Navbar: React.FC<Props> = ({ content }) => {
  const store = useLocalObservable(() => rootStore)
  const [visible, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean(false)

  return (
    <>
      {/* 正常的目录 */}
      <MarkNav
        className={classNames('postNavBar', s.navBar)}
        source={content || ''}
        headingTopOffset={15}
        ordered={false}
        updateHashAuto={false}
        onNavItemClick={() => store.uiStore.setNavShow(false)}
      />
      {/* 中屏显示的按钮 */}
      <div className={s.hoverBar} onClick={openDrawer}>
        <MenuFoldOutlined />
      </div>
      {/* 中屏抽屉 */}
      <Drawer
        placement='right'
        onClose={closeDrawer}
        visible={visible}
        className={classNames(s.drawer, 'mobile-navBar-box')}
        width={340}
      >
        <MarkNav
          className='postNavBar'
          source={content || ''}
          headingTopOffset={15 + 60}
          ordered={false}
          updateHashAuto={false}
          onNavItemClick={() => store.uiStore.setNavShow(true)}
        />
      </Drawer>
    </>
  )
}

export default Navbar
