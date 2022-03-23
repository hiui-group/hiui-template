import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Echarts from 'echarts'
import { Loading } from '@hi-ui/loading'
import { fetchContentDistribution } from './api'
import { EChartsOptionsGenerator } from './common'

const generateChartOption = (data: any[]): any => ({
  grid: {
    left: '48px',
    right: '24px',
    top: '20px',
    bottom: '48px',
  },
  tooltip: {
    show: true,
  },
  color: ['#237FFA'],
  xAxis: [
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
      type: 'bar',
      // symbol: 'none',
      emphasis: {
        focus: 'series',
      },
      data: data.map((item) => item.num),
      barWidth: 36,
      itemStyle: {
        borderRadius: 4,
      },
    },
  ],
})
export const ContentDistribution = (props: { style?: React.CSSProperties }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const chartRef = useRef<Echarts.EChartsType | undefined>()

  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setIsFetching(true)
    fetchContentDistribution().then((result) => {
      setData(result.data)
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
