import { useRequest, useSafeState } from 'ahooks'
import { message } from 'antd'
import React from 'react'

import * as api from '@/api'
import Layout from '@/components/Layout'
import MyPagination from '@/components/MyPagination'
import { detailPostSize, staleTime } from '@/utils/constant'

import { Title } from '../titleConfig'
import ArtList from './ArtList'
import Search from './Search'

const Articles: React.FC = () => {
  const [page, setPage] = useSafeState(1)

  const [isReset, setIsReset] = useSafeState(false)
  const [title, setTitle] = useSafeState(() => (''))

  const { data, loading, run } = useRequest(
    () =>
      api.strapiArticleList({ page, pageSize: detailPostSize, title }),
    {
      retryCount: 3,
      refreshDeps: [page],
      cacheKey: `Articles-articles-${title}-${page}`,
      staleTime,
      onSuccess: () => {
        if (isReset) {
          setIsReset(false)
          message.success('重置成功!')
        }
      }
    }
  )

  return (
    <Layout title={Title.Articles} loading={loading}>
      <Search
        page={page}
        setPage={setPage}
        title={title}
        setTitle={setTitle}
        run={run}
        setIsReset={setIsReset}
      />
      <ArtList articles={data?.data} loading={loading} />
      <MyPagination
        current={page}
        defaultPageSize={detailPostSize}
        total={data?.meta.pagination.total}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  )
}

export default Articles
