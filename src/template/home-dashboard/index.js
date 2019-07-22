import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import Grid from '@hi-ui/hiui/es/grid'
// import Badge from '@hi-ui/hiui/es/badge'
import Button from '@hi-ui/hiui/es/button'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import Table from '@hi-ui/hiui/es/table'
// import Progress from '@hi-ui/hiui/es/progress'
import echarts from 'echarts'
import theme from './echart-theme'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import './index.scss'

echarts.registerTheme('hiui_theme', theme)
const { Row, Col } = Grid

// 防抖处理
function debounce (fn, wait) {
  let timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}

class HomeDashboard extends Component {
  constructor (props) {
    super(props)

    this.columns = [
      { title: 'Column 1', dataIndex: 'name', key: '1' },
      { title: 'Column 1', dataIndex: 'age', key: '2' },
      { title: 'Column 1', dataIndex: 'address', key: '3' },
      {
        title: () => <div>自定义标题</div>,
        dataIndex: 'address',
        key: '4',
        render (text, record, index) {
          return (
            <div>
              {text} --- {index} --- 自定义渲染
            </div>
          )
        }
      },
      {
        title: 'Action',
        key: 'operation',
        width: 100,
        render: () => <Button appearance='link' href='#'>action</Button>
      }
    ]

    this.tableDatas = []
    for (let i = 0; i < 10; i++) {
      this.tableDatas.push({
        // key: i,
        name: `Don Diablo ${i}`,
        age: `${i}${i}`,
        address: `EDC Las Vegas no. ${i}`
      })
    }

    this.echartRefs = []
    this.indexData = [
      {
        amount: '1,300,800',
        name: '总销售额(元)'
      },
      {
        amount: '34,000',
        name: '总销售额(元)'
      },
      {
        amount: '82',
        name: '耳机(个)'
      }
    ]
    this.transportList = [
      { title: '顺丰速运' },
      { title: '中通快递' },
      { title: '圆通快递' },
      { title: '百世快递' },
      { title: '韵达快递' }
    ]
    this.monthList = [
      { title: '11月' },
      { title: '10月' },
      { title: '9月' }
    ]
  }

  componentDidMount () {
    window.onresize = debounce(() => {
      this.echartRefs.forEach(chart => {
        chart && chart.getEchartsInstance().resize()
      })
    }, 50)
  }

  componentWillUnmount () {
    window.onresize = null
  }

  columnarOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(56, 62, 71, 1)',
      axisPointer: {
        type: 'none'
      }
    },
    legend: {
      data: ['总参', '八期'],
      icon: 'rect',
      itemWidth: 8,
      itemHeight: 8
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      boundaryGap: [0, 0.01]
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#BFBFBF'
        }
      },
      data: ['顺丰速运', '中通快递', '圆通快递', '百世快递', '韵达快递']
    },
    series: [
      {
        name: '总参',
        type: 'bar',
        barWidth: 20,
        data: [75, 35, 55, 42, 8]
      },
      {
        name: '八期',
        type: 'bar',
        barWidth: 20,
        data: [62, 83, 42, 42, 30]
      }
    ]
  }

  linearOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(56, 62, 71, 1)'
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      data: ['询价', '下单']
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#BFBFBF'
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '询价',
        data: [120, 165, 150, 240, 260, 180, 190],
        type: 'line',
        showSymbol: false,
        smooth: true,
        symbolSize: 3,
        itemStyle: {
          borderWidth: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(72, 161, 255, 0.24)' // 0% 处的颜色
            }, {
              offset: 0.6, color: 'rgba(126, 207, 255, 0)'
            }],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: '下单',
        data: [95, 98, 52, 125, 155, 115, 99],
        type: 'line',
        showSymbol: false,
        smooth: true,
        symbolSize: 3,
        itemStyle: {
          borderWidth: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(151, 115, 240, 0.24)' // 0% 处的颜色
            }, {
              offset: 0.6, color: 'rgba(151, 115, 240, 0)'
            }],
            global: false // 缺省为 false
          }
        }
      }]
  }

  circleData = [{ value: 45, name: '顺丰快递' },
    { value: 20, name: '申通快递' },
    { value: 25, name: '中通快递' },
    { value: 15, name: '韵达快递' },
    { value: 10, name: '其它快递' }]

  pieOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(56, 62, 71, 1)',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 20,
      top: 5,
      formatter: (name) => {
        let data = this.circleData
        let total = 0
        let target = ''
        data.map(item => {
          total += item.value
          if (item.name === name) {
            target = item.value
          }
        })
        return name + ' ' + ((target / total) * 100).toFixed(2) + '%'
      },
      itemGap: 20,
      textStyle: {
        color: '#333333'
      },
      data: ['顺丰快递', '申通快递', '中通快递', '韵达快递', '其它快递'],
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      borderRadius: 8
    },
    grid: {
      containLabel: true
    },
    series: [
      {
        type: 'pie',
        radius: [50, 68],
        center: ['25%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: this.circleData
      }
    ]
  }

  areaOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false
        },
        // axisLabel: {
        //   inside: true,
        //   interval: (index, value) => { return value >= 200 }
        // },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      }
    ],
    series: [
      {
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        showSymbol: false,
        smooth: 0.2,
        areaStyle: { color: 'rgba(103, 157, 246, 0.16)' },
        data: [540, 640, 688, 799, 732, 887, 1320]
      }
    ]
  }
  gaugeOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
    },
    series: [
      {
        name: '完成率',
        type: 'gauge',
        splitNumber: 4,
        detail: { formatter: '{value}%' },
        data: [{ value: 87 }],
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.25, '#EFF2F5'],
              [1, '#EFF2F5']
            ]
          }
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: '#699DF5'
          }
        },
        emphasis: {
          itemStyle: {
            color: '#fff',
            borderWidth: 3
          }
        },
        pointer: {
          width: 5,
          color: '#699DF5'
        },
        axisTick: {
          show: false
        }
      }
    ]
  }
  render () {
    this.echartRefs.length = 0
    return (
      <div className='page page--dashboard'>
        <Row gutter>
          <Col span={24}>
            <span className='dashboard-title'>首页</span>
          </Col>
        </Row>
        <Row gutter>
          <Col span={24}>
            <span className='tag-btn active'>最新报表</span>
            <span className='tag-btn'>昨日报表</span>
            <span className='tag-btn'>本月报表</span>
          </Col>
        </Row>
        <Row gutter>
          <Col span={12}>
            <Row gutter>
              {
                this.indexData.map((item, index) => {
                  return (
                    <Col span={8} >
                      <div className='info'>
                        <span className='info__amount'>{item.amount}</span>
                        <span className='info__name'>{item.name}</span>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter>
              {
                this.indexData.map((item, index) => {
                  return (
                    <Col span={8}>
                      <div className='info'>
                        <span className='info__amount'>{item.amount}</span>
                        <span className='info__name'>{item.name}</span>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Col>
        </Row>
        <Row gutter>
          <Col span={12}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>快递数量</span>
                <DatePicker
                  type='daterange'
                  shortcuts={['近一周', '近一月', '近三月', '近一年']}
                  onChange={(d) => { console.log(d) }}
                />
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.columnarOption}
                  style={{ height: '280px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>询价下单量</span>
                <div className='card__filter'>
                  <Dropdown list={this.transportList} title='物流公司' onClick={(val) => console.log(val)} />
                  <Dropdown list={this.monthList} title='本月' onClick={(val) => console.log(val)} />
                </div>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.linearOption}
                  opts={{ renderer: 'svg' }}
                  style={{ height: '280px', width: '100%' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter>
          <Col span={8}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>快递类别占比</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.pieOption}
                  opts={{ renderer: 'svg' }}
                  style={{ height: '164px', width: '100%' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>预算情况（万元）</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.areaOption}
                  opts={{ renderer: 'svg' }}
                  className='card__canvas'
                  style={{ height: '164px', width: '100%' }}
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>完成率</span>
              </div>
              <div className='card__body'>
                <ReactEcharts
                  ref={echart => this.echartRefs.push(echart)}
                  option={this.gaugeOption}
                  opts={{ renderer: 'svg' }}
                  style={{ height: '232px', width: '232px', position: 'absolute' }}
                  className='card__canvas'
                  theme='hiui_theme'
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className='card'>
              <div className='card__header'>
                <span className='card__title'>列表</span>
              </div>
              <div className='card__body'>
                <Table
                  columns={this.columns}
                  data={this.tableDatas}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HomeDashboard
