import dayjs from 'dayjs'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import DisplayBar from '@/components/DisplayBar'
import { rootStore } from '@/mobx'

import s from './index.scss'

interface Props {
  articles?: api.typeArticleItem[]
  loading?: boolean
}

const ArtList: React.FC<Props> = ({ articles, loading }) => {
  const store = useLocalObservable(() => rootStore)
  const navigate = useNavigate()

  return (
    <>
      {articles?.length ? (
        articles?.map((item) => (
          <DisplayBar
            key={item.id}
            content={item.attributes.title}
            right={dayjs(item.attributes.createdAt).format('YYYY-MM-DD')}
            onClick={() => store.uiStore.toArticleDetailOrMsg(item.attributes.titleEng, navigate)}
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
