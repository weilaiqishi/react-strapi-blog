import { useRequest, useSafeState } from 'ahooks'
import { useLocalObservable, useObserver } from 'mobx-react'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import MyPagination from '@/components/MyPagination'
import { rootStore } from '@/mobx'
import { homeSize, staleTime } from '@/utils/constant'

import s from './index.scss'
import PostCard from './PostCard'


const Section: React.FC = () => {
  const store = useLocalObservable(() => rootStore)
  const navigate = useNavigate()
  const [page, setPage] = useSafeState(1)

  const { data, loading } = useRequest(
    () => api.strapiArticleList({ page, pageSize: homeSize }),
    {
      retryCount: 3,
      refreshDeps: [page],
      cacheKey: `Section-articles-${page}`,
      staleTime
    }
  )

  console.log('Section-articles data -> ', data)

  return (
    <section className={s.section}>
      {data?.data?.map(({ id, attributes: { title, content, createdAt, tags, titleEng } }) => (
        <PostCard
          key={id}
          title={title}
          content={content}
          date={createdAt}
          tags={tags}
          loading={loading}
          onClick={() => store.uiStore.toArticleDetailOrMsg(titleEng, navigate)}
        />
      ))}
      <MyPagination
        current={page}
        defaultPageSize={homeSize}
        total={data?.meta.pagination.total}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />
    </section>
  )
}

export default Section