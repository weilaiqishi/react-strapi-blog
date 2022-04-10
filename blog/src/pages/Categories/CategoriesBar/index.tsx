import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'

import s from './index.scss'

interface Props {
  content: string
  num: number
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const CategoriesBar: React.FC<Props> = ({ content, num, onClick, className }) => {
  return (
    <div className={classNames(s.categoriesBar, className)} onClick={onClick}>
      {content}
      <div className={s.categoriesNum}>{num}</div>
    </div>
  )
}

export default CategoriesBar
