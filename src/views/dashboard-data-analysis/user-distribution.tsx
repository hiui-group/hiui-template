// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Echarts from 'echarts'
import { Loading } from '@hi-ui/loading'
import { fetchUserDistribution } from './api'
import { EChartsOptionsGenerator } from './common'

const generateChartOption = (data: any[]) => ({
  color: ['#237FFA', '#14CA64', '#FAB007', '#2BC7C7', '#9772fB'],
  legend: {
    ...EChartsOptionsGenerator.legend(data.map((item) => item.title)),
    bottom: 12,
  },
  series: [
    {
      name: '用户数',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 2,
      },
      labelLine: {
        show: false,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          formatter: '{title|{c}}\n{des|{b}} {percentage|{d}%}',
          rich: {
            title: {
              fontSize: '24',
              fontWeight: 'bold',
              lineHeight: '34',
              color: '#1F2733',
            },
            des: {
              fontSize: '14',
              color: '#929AA6',
              lineHeight: '20',
            },
            percentage: {
              color: '#237FFA',
            },
          },
        },
      },
      data: data.map((item) => ({
        value: item.num,
        name: item.title,
      })),
      bottom: 40,
      top: -40,
    },
  ],
})
export const UserDistribution = (props: { style?: React.CSSProperties }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const chartRef = useRef<Echarts.EChartsType | undefined>()

  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [isShowTotal, setIsShowTotal] = useState(true)

  useEffect(() => {
    setIsFetching(true)
    fetchUserDistribution().then((result) => {
      setData(result.data)
      setIsFetching(false)
    })
  }, [])

  useEffect(() => {
    if (!chartRef.current && container) {
      chartRef.current = Echarts.init(container)
      chartRef.current?.on('mouseover', (e) => {
        setIsShowTotal(false)
      })
      chartRef.current?.on('mouseout', (e) => {
        setIsShowTotal(true)
      })
      chartRef.current?.on('highlight', (e) => {
        setIsShowTotal(false)
      })
      chartRef.current?.on('downplay', (e) => {
        setIsShowTotal(true)
      })
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
          {/* TODO: 此处不高亮则展示总数的功能，暂时没有找到方法直接通过配置EChart 实现，故而使用了监听事件展示方法 */}
          {isShowTotal && !isFetching && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(calc(-50% - 40px))',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  fontWeight: 'bold',
                  color: '#1F2733',
                  textAlign: 'center',
                }}
              >
                {data.map((item) => item.num).reduce((pre, cur) => pre + cur, 0)}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#929AA6',
                  textAlign: 'center',
                }}
              >
                用户数
              </div>
            </div>
          )}
        </div>
      </Loading>
    </React.Fragment>
  )
}
