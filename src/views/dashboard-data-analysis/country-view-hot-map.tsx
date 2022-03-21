// @ts-nocheck

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Echarts from 'echarts'
import { Loading } from '@hi-ui/loading'
import { fetchCountryViewHotMap } from './api'
import { message } from '@hi-ui/hiui'

const generateChartOption = (data: any[]) => ({
  visualMap: {
    min: 0,
    max: 1600,
    realtime: false,
    calculable: true,
    orient: 'horizontal',
    inRange: {
      color: ['#fff', '#237FFA'],
    },
    itemWidth: 6,
    itemHeight: 160,
    textStyle: {
      lineHeight: 40,
    },
  },
  series: [
    {
      type: 'map',
      map: 'china',
      data: data.map((item) => ({
        name: item.title,
        value: item.num,
      })),
      top: 10,
      bottom: -40,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
  ],
})

export const CountryViewHotMap = (props: { style?: React.CSSProperties }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const chartRef = useRef<Echarts.EChartsType | undefined>()

  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const init = async () => {
      setIsFetching(true)
      const geo = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
        .then((e) => {
          if (e.status === 200) {
            return e.text()
          } else {
            return undefined
          }
        })
        .catch((e) => undefined)

      if (geo) {
        const geoObject = JSON.parse(geo)
        Echarts.registerMap('china', geoObject)

        const result = await fetchCountryViewHotMap([
          ...(geoObject.features as any[])
            .map((item) => item.properties.name)
            .filter((item) => item),
          '南海诸岛',
        ])

        setData(result.data)
        setIsFetching(false)
      } else {
        message.open({
          type: 'error',
          title: '获取全国GEO数据失败',
        })
      }
    }

    init()
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
