import { useRequest } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import Card from '@/components/Card'
import MarkDown from '@/components/MarkDown'
import { staleTime } from '@/utils/constant'

import s from './index.scss'

const NoticeCard: React.FC = () => {
  const { data, loading } = useRequest(() => api.strapiNoticeList({}), {
    retryCount: 3,
    cacheKey: `NoticeCard-notice`,
    staleTime
  })

  return (
    <Card loading={loading}>
      {/* <div className={s.notice}>{data?.data[0].attributes.text}</div> */}
      <MarkDown content={data?.data[0].attributes.text} />
    </Card>
  )
}

export default NoticeCard
