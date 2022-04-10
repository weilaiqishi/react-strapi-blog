import { PieChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react'

import { rootStore } from '@/mobx'

import { ClassType } from '../index'
import s from './index.scss'
import { useOption } from './useOption'

interface Props {
  categories: ClassType[]
  artSum: number
}

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

const Chart: React.FC<Props> = ({ categories, artSum }) => {
  const store = useLocalObservable(() => rootStore)
  const option = useOption(categories, artSum, store.uiStore.mode)

  return useObserver(() =>
    <div className={s.box}>
      <h3>📊文章分布</h3>
      <ReactEChartsCore
        style={{
          height: '400px'
        }}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme='theme_name'
      />
    </div>
  )
}

export default Chart
