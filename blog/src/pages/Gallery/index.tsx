import { useRequest } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import Layout from '@/components/Layout'
import { staleTime } from '@/utils/constant'

import { Title } from '../titleConfig'
import ImgCard from './ImgCard'
import s from './index.scss'

const Gallery: React.FC = () => {
  const { data, loading } = useRequest(() => api.strapiGalleryList({}), {
    retryCount: 3,
    cacheKey: `Gallery-galleries`,
    staleTime
  })
  console.log('>>> strapiGalleryList -> ', data)

  return (
    <Layout title={Title.Gallery} loading={loading} className={s.imgBox}>
      {data?.data.map((item) => (
        <ImgCard
          key={item.id}
          cover={item.attributes.galleryCover.data.attributes.url}
          title={item.attributes.galleryName}
          descr={item.attributes.galleryDescription}
        />
      ))}
    </Layout>
  )
}

export default Gallery
