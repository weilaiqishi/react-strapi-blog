import useUrlState from '@ahooksjs/use-url-state'
import { useBoolean, useKeyPress, useRequest, useSafeState } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import Layout from '@/components/Layout'
import { staleTime } from '@/utils/constant'

import ImgItem from './ImgItem'
import ImgView from './ImgView'
import s from './index.scss'

const Img: React.FC = () => {
  const [query] = useUrlState()
  const { data, loading } = useRequest(() => api.strapiImgList({ galleryName: query.title }), {
    retryCount: 3,
    cacheKey: `Img-galleries-${query.title}`,
    staleTime
  })

  const [viewUrl, setViewUrl] = useSafeState('')
  const [isViewShow, { setTrue: openViewShow, setFalse: closeViewShow }] = useBoolean(false)
  useKeyPress(27, closeViewShow)

  return (
    <Layout title={query.title} className={s.imgBox} loading={loading}>
      <ImgView viewUrl={viewUrl} isViewShow={isViewShow} onClick={closeViewShow} />
      {data?.data.map((item) => (
        <ImgItem
          key={item.id}
          url={item.attributes.src.data.attributes.url}
          onClick={() => {
            setViewUrl(item.attributes.src.data.attributes.url)
            openViewShow()
          }}
        />
      ))}
    </Layout>
  )
}

export default Img
