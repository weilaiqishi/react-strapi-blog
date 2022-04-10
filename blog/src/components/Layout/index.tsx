import { useTitle } from 'ahooks'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'

import { rootStore } from '@/mobx'
import { siteTitle } from '@/utils/constant'
import useTop from '@/utils/hooks/useTop'

import Card from '../Card'
import LayoutLoading from '../LayoutLoading'
import PageTitle from '../PageTitle'
import s from './index.scss'

interface Props {
  title?: string
  className?: string
  setNavShow?: Function
  loading?: boolean
  isPost?: boolean
  categories?: string
  date?: number
  rows?: number
}

const Layout: React.FC<Props> = ({
  title,
  className,
  loading,
  children,
  categories,
  date,
  isPost = false,
  rows
}) => {
  const store = useLocalObservable(() => rootStore)
  useTitle(`${siteTitle} | ${title || ''}`)
  useTop(store.uiStore.setNavShow.bind(store))

  return (
    <>
      <PageTitle title={title} className={classNames({ [s.postTitle]: isPost })}>
        {isPost && (
          <div>
            <span className={s.articleClass}>{categories}</span>
            <span className={s.articleDate}>
              {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        )}
      </PageTitle>
      <Card isStatic={true} className={classNames(s.layoutCard, className)}>
        {loading ? <LayoutLoading rows={rows} /> : children}
      </Card>
    </>
  )
}

export default Layout
