import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ErrorBoundary from '@/components/ErrorBoundary'
import Home from '@/pages/Home'

import s from './index.scss'

const Articles = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Articles'))
const Categories = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Categories'))
const Tags = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Tags'))
const Gallery = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Gallery'))
const Img = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Img'))
const Msg = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Msg'))
const Link = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Link'))
const Post = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Post'))
const ArtDetail = lazy(() => import(/* webpackPrefetch:true */ '@/pages/ArtDetail'))

const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <div className={s.center}>
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='articles' element={<Articles />} />
              <Route path='categories' element={<Categories />} />
              <Route path='tags' element={<Tags />} />
              <Route path='gallery' element={<Gallery />} />
              <Route path='img' element={<Img />} />
              <Route path='msg' element={<Msg />} />
              <Route path='link' element={<Link />} />
              <Route path='post' element={<Post />} />
              <Route path='artDetail' element={<ArtDetail />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  )
}

export default Main
