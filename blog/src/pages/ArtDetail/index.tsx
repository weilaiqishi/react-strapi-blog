import useUrlState from '@ahooksjs/use-url-state'
import { useRequest, useSafeState } from 'ahooks'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import DisplayBar from '@/components/DisplayBar'
import Layout from '@/components/Layout'
import MyPagination from '@/components/MyPagination'
import { detailPostSize, staleTime } from '@/utils/constant'


const ArtDetail: React.FC = () => {
  const [{ tag = '', category = '' }] = useUrlState()
  const navigate = useNavigate()

  const [page, setPage] = useSafeState(1)

  const { data, loading } = useRequest(
    () =>
      api.strapiArticleList({ page, pageSize: detailPostSize, tagName: tag, categoryName: category }),
    {
      retryCount: 3,
      refreshDeps: [page],
      cacheKey: `ArtDetail-articles-${tag}+${category}-${page}`,
      staleTime
    }
  )

  return (
    <Layout title={tag || category}>
      {data?.data.map((item: api.typeArticleItem) => (
        <DisplayBar
          key={item.id}
          content={item.attributes.title}
          right={dayjs(item.attributes.createdAt).format('YYYY-MM-DD')}
          loading={loading}
          onClick={() => navigate(`/post?title=${encodeURIComponent(item.attributes.titleEng)}`)}
        />
      ))}
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

export default ArtDetail
