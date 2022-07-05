import './index.custom.scss'

import {
  BgColorsOutlined,
  CheckOutlined,
  HomeOutlined,
  MenuOutlined,
  SettingOutlined
} from '@ant-design/icons'
import {
  useEventListener,
  useLocalStorageState,
  useSafeState,
  useUpdateEffect
} from 'ahooks'
import { Drawer as DrawerAny } from 'antd'
import classNames from 'classnames'
import { useLocalObservable, useObserver } from 'mobx-react'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { rootStore } from '@/mobx'
import { blogAdminUrl } from '@/utils/constant'
import { modeMap, modeMapArr } from '@/utils/modeMap'

import { useLinkList } from './config'
import s from './index.scss'

interface Props {
  mode?: number
  setMode?: Function
}

const Drawer: any = DrawerAny

const bodyStyle = window.document.getElementsByTagName('body')[0].style

const Nav: React.FC<Props> = () => {
  const store = useLocalObservable(() => rootStore)
  const navigate = useNavigate()

  const [localMode, setLocalMode] = useLocalStorageState('localMode')
  const { navArr, secondNavArr, mobileNavArr } = useLinkList()
  const [visible, setVisible] = useSafeState(false)

  const modeOptions = ['rgb(19, 38, 36)', 'rgb(110, 180, 214)', 'rgb(171, 194, 208)']

  useEventListener(
    'mousewheel',
    event => {
      event = event || window.event
      store.uiStore.setNavShow(event.wheelDeltaY > 0)
    },
    { target: document.body }
  )

  useEffect(() => {
    setLocalMode(store.uiStore.mode)
    for (const type of modeMapArr) {
      bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][store.uiStore.mode])
    }
  }, [store.uiStore.mode])

  return useObserver(() =>
    <>
      <nav className={classNames(s.nav, { [s.hiddenNav]: !store.uiStore.navShow })}>
        <div className={s.navContent}>
          {/* 主页 */}
          <div className={s.homeBtn} onClick={() => navigate('/')}>
            <HomeOutlined />
          </div>

          {/* 黑暗模式切换 */}
          <div className={s.modeBtn}>
            <BgColorsOutlined />
            <div className={s.modeOpions}>
              {modeOptions.map((backgroundColor, index) => (
                <div
                  key={index}
                  style={{ backgroundColor }}
                  className={classNames(s.modeItem, s[`modeItem${index}`])}
                  onClick={() => store.uiStore.setMode(index)}
                >
                  {store.uiStore.mode === index && <CheckOutlined />}
                </div>
              ))}
            </div>
          </div>

          {/* 文章单独按钮 */}
          <div className={s.articlesBtn}>
            <div className={s.articelsSecond}>
              {secondNavArr.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? s.sedActive : s.articelsSecondItem
                  }
                  to={item.to}
                  key={index}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            文章
          </div>

          {/* 其他按钮 */}
          {navArr.map((item, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? s.navActive : s.navBtn)}
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className={s.mobileNavBtn} onClick={() => setVisible(true)}>
        <MenuOutlined />
      </div>
      <Drawer
        placement='right'
        onClose={() => setVisible(false)}
        visible={visible}
        className='mobile-nav-box'
      >
        <div className={s.mobileNavBox}>
          {mobileNavArr.map((item, index) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? s.mobileNavActive : s.mobileNavItem
              }
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
          {modeOptions.map((backgroundColor, index) => (
            <div
              key={index}
              style={{ backgroundColor }}
              className={classNames(s.modeItem, s[`modeItem${index}`])}
              onClick={() => store.uiStore.setMode(index)}
            >
              {store.uiStore.mode === index && <CheckOutlined />}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  )
}

export default Nav
