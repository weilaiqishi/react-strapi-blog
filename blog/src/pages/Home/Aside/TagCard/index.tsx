import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'

import Card from '@/components/Card'
import { rootStore } from '@/mobx'

import s from './index.scss'

const TagCard: React.FC = () => {
  const store = useLocalObservable(() => rootStore)
  return useObserver(() =>
    <Card className={s.card}>
      {store.articleInfoStore.tags.data.map(
        ({ attributes: { tagName } }) => (
          <span className={s.tag} key={tagName}>
            {tagName}
          </span>
        )
      )}
    </Card>
  )
}

export default TagCard
