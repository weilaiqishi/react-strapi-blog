import { useMount, useSafeState, useTitle } from 'ahooks'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'
import { connect } from 'react-redux'

import PageTitle from '@/components/PageTitle'
import { rootStore } from '@/mobx'
import { siteTitle } from '@/utils/constant'
import useTop from '@/utils/hooks/useTop'
import jinrishici from '@/utils/jinrishici'

import Aside from './Aside'
import s from './index.scss'
import Section from './Section'

interface Props {
  setNavShow?: Function
}


const Home: React.FC<Props> = () => {
  const store = useLocalObservable(() => rootStore)
  useTitle(siteTitle)
  useTop(store.uiStore.setNavShow.bind(store))

  const [poem, setPoem] = useSafeState('')
  useMount(() => {
    jinrishici(
      res => setPoem(res.data.content),
      err => { console.log(`jinrishici error -> ` + err) }
    )
  })

  return (
    <>
      <PageTitle title={siteTitle} desc={poem || ''} className={s.homeTitle} />
      <div className={s.body}>
        <Section />
        <Aside />
      </div>
    </>
  )
}

export default Home
