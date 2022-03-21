// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Echarts from 'echarts'
import { RadioGroup } from '@hi-ui/radio'
import { Loading } from '@hi-ui/loading'
import { fetchViewTrend } from './api'
import { EChartsOptionsGenerator } from './common'

enum ViewRange {
  day = 'day',
  week = 'week',
  month = 'month',
}

const ViewRangeRadioData = [
  {
    id: ViewRange.day,
    title: '日',
  },
  {
    id: ViewRange.week,
    title: '周',
  },
  {
    id: ViewRange.month,
    title: '月',
  },
]

const generateChartOption = (data: any[]) => ({
  grid: {
    left: '48px',
    right: '24px',
    top: '60px',
    bottom: '48px',
  },
  color: ['#237FFA', '#14CA64'],
  legend: EChartsOptionsGenerator.legend(['用户量', '访问量']),
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: data.map((item) => item.title),
      axisTick: {
        show: false,
      },
      offset: 12,
      axisLine: {
        lineStyle: {
          color: '#EBEDF0',
        },
      },
      axisLabel: {
        color: '#1F2733',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#1F2733',
        },
      },
      offset: 12,
      splitLine: {
        lineStyle: {
          color: '#EBEDF0',
        },
      },
    },
  ],
  series: [
    {
      name: '用户量',
      type: 'line',
      areaStyle: {
        opacity: 0.8,
        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#BDE2EF',
          },
          {
            offset: 1,
            color: '#fff',
          },
        ]),
      },
      smooth: true,
      symbol: 'none',
      emphasis: {
        focus: 'series',
      },
      stack: 'Total',
      data: data.map((item) => item.user),
    },
    {
      name: '访问量',
      type: 'line',
      stack: 'Total',
      areaStyle: {
        opacity: 0.8,
        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#B3F2C6',
          },
          {
            offset: 1,
            color: '#fff',
          },
        ]),
      },
      symbol: 'none',
      smooth: true,
      emphasis: {
        focus: 'series',
      },
      data: data.map((item) => item.view),
    },
  ],
})
export const ViewTrend = (props: { style?: React.CSSProperties }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const chartRef = useRef<Echarts.EChartsType | undefined>()

  const [isFetching, setIsFetching] = useState(true)
  const [viewRange, setViewRange] = useState(ViewRange.day)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setIsFetching(true)
    fetchViewTrend(viewRange).then((result) => {
      setData(result.data)
      setIsFetching(false)
    })
  }, [viewRange])

  useEffect(() => {
    if (!chartRef.current && container) {
      chartRef.current = Echarts.init(container)
    }
  }, [container])

  useEffect(() => {
    if (container && data.length) {
      chartRef.current?.clear()
      chartRef.current?.setOption(generateChartOption(data))
    }
  }, [data, container])

  const resize = useCallback(() => {
    chartRef.current?.resize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [resize])

  return (
    <React.Fragment>
      <Loading visible={isFetching}>
        <div style={{ ...props.style, position: 'relative' }}>
          <div ref={(e) => setContainer(e)} style={{ width: '100%', height: '100%' }} />
          <RadioGroup
            style={{
              position: 'absolute',
              left: 0,
              top: '-2px',
            }}
            type={'button'}
            data={ViewRangeRadioData}
            value={viewRange}
            onChange={(e) => setViewRange(e as ViewRange)}
          />
        </div>
      </Loading>
    </React.Fragment>
  )
}
