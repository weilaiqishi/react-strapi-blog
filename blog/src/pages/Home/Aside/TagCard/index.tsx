import { useRequest } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import Card from '@/components/Card'
import { staleTime } from '@/utils/constant'

import s from './index.scss'

const TagCard: React.FC = () => {
  const { data, loading } = useRequest(() => api.strapiTagList({}), {
    retryCount: 3,
    cacheKey: `TagCard-tag`,
    staleTime
  })

  return (
    <Card className={s.card} loading={loading}>
      {data?.data?.map(
        ({ attributes: { tagName } }) => (
          <span className={s.tag} key={tagName}>
            {tagName}
          </span>
        )
      )}
    </Card>
  )
}

export default TagCard
