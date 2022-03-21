// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Echarts from 'echarts'
import { Loading } from '@hi-ui/loading'
import { fetchProductProblemAnalysis } from './api'
import { EChartsOptionsGenerator } from './common'

const generateChartOption = (data: any[]) => ({
  grid: {
    left: '68px',
    right: '24px',
    top: '28px',
    bottom: '48px',
  },
  tooltip: {
    show: true,
  },
  color: ['#237FFA', '#14CA64'],
  legend: EChartsOptionsGenerator.legend(['问题', '答复']),
  yAxis: [
    {
      type: 'category',
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
  xAxis: [
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
      name: '问题',
      type: 'bar',
      // symbol: 'none',
      data: data.map((item) => item.problem),
      barWidth: 12,
      itemStyle: {
        borderRadius: 4,
      },
    },
    {
      name: '答复',
      type: 'bar',
      // symbol: 'none',
      data: data.map((item) => item.replay),
      barWidth: 12,
      barGap: '50%',
      itemStyle: {
        borderRadius: 4,
      },
    },
  ],
})
export const ProductProblemAnalysis = (props: { style?: React.CSSProperties }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const chartRef = useRef<Echarts.EChartsType | undefined>()

  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setIsFetching(true)
    fetchProductProblemAnalysis().then((result) => {
      setData((result.data as any[]).sort((a, b) => a.problem - b.problem))
      setIsFetching(false)
    })
  }, [])

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
        </div>
      </Loading>
    </React.Fragment>
  )
}
