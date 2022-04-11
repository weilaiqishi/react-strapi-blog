import { useRequest } from 'ahooks'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '@/components/Layout'
import { rootStore } from '@/mobx'

import { Title } from '../titleConfig'
import s from './index.scss'

const Tags: React.FC = () => {
  const navigate = useNavigate()
  const store = useLocalObservable(() => rootStore)
  return (
    <Layout title={Title.Tags} className={s.tagsBox} rows={3}>
      {store.articleInfoStore.tags.data.map((item) => (
        <span
          className={s.tagItem}
          key={item.id}
          onClick={() => navigate(`/artDetail?tag=${encodeURIComponent(item.attributes.tagName)}`)}
        >
          {item.attributes.tagName}
        </span>
      ))}
    </Layout>
  )
}

export default Tags
