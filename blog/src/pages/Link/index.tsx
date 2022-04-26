import { useRequest } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import Layout from '@/components/Layout'
import { staleTime } from '@/utils/constant'

import { Title } from '../titleConfig'
import s from './index.scss'
import LinkItem from './LinkItem'

const Link: React.FC = () => {
  const { data, loading } = useRequest(() => api.strapiSiteList({}), {
    retryCount: 3,
    cacheKey: `Link-links`,
    staleTime
  })

  return (
    <Layout title={Title.Link} loading={loading} className={s.box}>
      {(data?.data || []).map((item) => (
        <LinkItem
          key={item.id}
          link={item.attributes.link}
          avatar={item.attributes.avatar}
          name={item.attributes.siteName}
          descr={item.attributes.description}
        />
      ))}
    </Layout>
  )
}

export default Link
