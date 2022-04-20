import React from 'react'

import Card from '@/components/Card'
import { cardUrl, myName } from '@/utils/constant'
import { useTime } from '@/utils/hooks/useTime'

import s from './index.scss'

const BlogCard: React.FC = () => {
  const { timeText } = useTime()

  return (
    <Card className={s.card}>
      <p className={s.text}>
        {timeText}，<br />
        我叫<span className={s.color}>{myName}</span>，<br />
        欢迎来到
        <br />
        <span className={s.color}>我的博客</span>。
      </p>
      <img src={cardUrl} className={s.avatar} />
    </Card>
  )
}

export default BlogCard
