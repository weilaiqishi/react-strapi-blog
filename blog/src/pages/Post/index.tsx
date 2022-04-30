import useUrlState from '@ahooksjs/use-url-state'
import { useRequest } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import Comment from '@/components/Comment'
import ErrorBoundary from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'
import MarkDown from '@/components/MarkDown'
import { staleTime } from '@/utils/constant'

import CopyRight from './CopyRight'
import s from './index.scss'
import Navbar from './Navbar'
import PostTags from './PostTags'

const Post: React.FC = () => {
  const [{ title: titleEng }] = useUrlState()

  const { data, loading } = useRequest(
    () =>
      api.strapiArticleList({ page: 1, pageSize: 1, titleEng }),
    {
      retryCount: 3,
      cacheKey: `Post-articles-${titleEng}`,
      staleTime
    })

  const article = data?.data[0]

  return (
    <ErrorBoundary>
      <Layout
        title={article?.attributes.title}
        loading={loading}
        categories={article?.attributes.category}
        date={article?.attributes.createdAt}
        isPost={true}
        rows={14}
      >
        <MarkDown content={article?.attributes.content} className={s.mb} />
        <PostTags tags={article?.attributes.tags || []} />
        <CopyRight title={article?.attributes.title} titleEng={article?.attributes.titleEng} />
        <Comment titleEng={titleEng} title={article?.attributes.title} />
        <Navbar content={article?.attributes.content} />
      </Layout>
    </ErrorBoundary>
  )
}

export default Post
