import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import DisplayBar from '@/components/DisplayBar'

import s from './index.scss'

interface Props {
  articles?: api.typeArticleItem[]
  loading?: boolean
}

const ArtList: React.FC<Props> = ({ articles, loading }) => {
  const navigate = useNavigate()

  return (
    <>
      {articles?.length ? (
        articles?.map((item) => (
          <DisplayBar
            key={item.id}
            content={item.attributes.title}
            right={dayjs(item.attributes.createdAt).format('YYYY-MM-DD')}
            onClick={() => navigate(`/post?title=${encodeURIComponent(item.attributes.titleEng)}`)}
            loading={loading}
          />
        ))
      ) : (
        <div className={s.none}>暂时无相应文章 ~</div>
      )}
    </>
  )
}

export default ArtList
