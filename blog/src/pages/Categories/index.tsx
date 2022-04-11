import { useRequest } from 'ahooks'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '@/components/Layout'
import { rootStore } from '@/mobx'

import { Title } from '../titleConfig'
import CategoriesBar from './CategoriesBar'
import s from './index.scss'

const Categories: React.FC = () => {
  const navigate = useNavigate()
  const store = useLocalObservable(() => rootStore)
  return useObserver(() =>
    <Layout title={Title.categories} className={s.classBox} rows={8}>
      {store.articleInfoStore.categories.data.map((item) => (
        <CategoriesBar
          className={s.classItem}
          key={item.id}
          content={item.attributes.categoryName}
          num={item.attributes.articles.data.length}
          onClick={() => navigate(`/artDetail?category=${encodeURIComponent(item.attributes.categoryName)}`)}
        />
      ))}
    </Layout>
  )
}

export default Categories
