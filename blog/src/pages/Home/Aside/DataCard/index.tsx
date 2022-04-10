import { useQuery } from '@apollo/client'
import { useRequest } from 'ahooks'
import { useLocalObservable, useObserver } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import Card from '@/components/Card'
import { rootStore } from '@/mobx'

import s from './index.scss'


const DataCard: React.FC = () => {
  const store = useLocalObservable(() => rootStore)
  const navigate = useNavigate()

  return useObserver(() => 
    <Card className={s.card}>
      <div className={s.blogData} onClick={() => navigate('/articles')}>
        <div className={s.name}>文章</div>
        <div className={s.num}>{store.articleInfoStore.articles.meta.pagination.total}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate('/categories')}>
        <div className={s.name}>分类</div>
        <div className={s.num}>{store.articleInfoStore.categories.meta.pagination.total}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate('/tags')}>
        <div className={s.name}>标签</div>
        <div className={s.num}>{store.articleInfoStore.tags.meta.pagination.total}</div>
      </div>
    </Card>
  )
}

export default memo(DataCard)
