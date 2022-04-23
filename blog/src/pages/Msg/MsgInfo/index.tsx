import React from 'react'

import { myAvatar, myDescr, myLink, myName } from '@/utils/constant'
import { useTime } from '@/utils/hooks/useTime'

import s from './index.scss'

const mySite = [
  {
    key: 'name',
    value: myName
  },
  {
    key: 'link',
    value: myLink
  },
  {
    key: 'avatar',
    value: myAvatar
  },
  {
    key: 'descr',
    value: myDescr
  }
]

const MsgInfo: React.FC = () => {
  const { timeText } = useTime()

  return (
    <>
      <div className={s.info}>
        <div>
          {timeText}，我叫<span className={s.hoverName}>{myName}</span>，
        </div>
        <div>欢迎来到我的博客!</div>
        <div>可以在这里留言、吐槽，</div>
      </div>
      <div className={s.siteLink}>
        <div className={s.link}>本站链接：</div>
        {mySite.map(
          (
            item: {
              key: string
              value: string
            },
            index
          ) => (
            <div key={index}>
              <span>{item.key}:</span>
              <span className={s.value}>{item.value}</span>
            </div>
          )
        )}
      </div>
    </>
  )
}

export default MsgInfo
