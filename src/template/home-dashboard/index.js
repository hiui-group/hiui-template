import React, { Component, Fragment } from 'react'
import ReactEcharts from 'echarts-for-react'
import Grid from '@hi-ui/hiui/es/grid'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import Table from '@hi-ui/hiui/es/table'
import Icon from '@hi-ui/hiui/es/icon'
import Progress from '@hi-ui/hiui/es/progress'
import echarts from 'echarts'
import theme from './echart-theme'
import './index.scss'

echarts.registerTheme('my_theme', theme)
const { Row, Col } = Grid

// 防抖处理
function debounce (fn, wait) {
  var timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
class HomeDashboard extends Component {
  constructor (props) {
    super(props)

    this.columns = [
    { title: 'Column 1', dataIndex: 'name', key: '1'},
    { title: 'Column 1', dataIndex: 'age', key: '2'},
    { title: 'Column 1', dataIndex: 'address', key: '3'},
    { 
      title: ()=><div>自定义标题</div>, 
      dataIndex: 'address', key: '4',
      render(text,record,index){
      return (
        <div>
            {text} --- {index} --- 自定义渲染
        </div>
      )
    }},
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: () => <a href="javascript:;">action</a>,
    },
  ]
  
  this.tableDatas = []
  for (let i = 0; i < 10; i++) {
    this.tableDatas.push({
      // key: i,
      name: `Don Diablo ${i}`,
      age: `${i}${i}`,
      address: `EDC Las Vegas no. ${i}`,
    });
    }

    this.echartRefs = []
    this.indexData = [
      {
        amount: 100,
        name: 'index name'
      },
      {
        amount: 100,
        name: 'index name'
      },
      {
        amount: 100,
        name: 'index name'
      },
      {
        amount: 100,
        name: 'index name'
      }
    ]
    this.indexData = this.indexData.concat(this.indexData)
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
      axisPointer: {
        type: 'none'
      }
    },
    legend: {
      data: ['总参', '八期']
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    xAxis: {
      type: 'category',
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
      trigger: 'axis'
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      data: ['询价', '下单']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '询价',
        data: [120, 165, 150, 240, 260, 180, 190],
        type: 'line',
        smooth: true
      },
      {
        name: '下单',
        data: [95, 98, 52, 125, 155, 115, 99],
        type: 'line',
        smooth: true
      }]
  }

  pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['China', 'Europe', 'America', 'Others']
    },
    grid: {
      containLabel: true
    },
    series: [
      {
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 45, name: 'China' },
          { value: 20, name: 'Europe' },
          { value: 25, name: 'America' },
          { value: 10, name: 'Others' }
        ]
      }
    ]
  }

  render () {
    this.echartRefs.length = 0
    return (
      <div className='content'>
        <div className='dashboard-container'>
          <div className='dashboard-title'>首页</div>
          <div className='dashboard-content'>
            <div className='tab'>
              <div className='tab-item active'>标签</div>
              <div className='tab-item'>标签</div>
              <div className='tab-item'>标签</div>
              <div className='tab-item'>标签</div>
              <div className='tab-item'>标签</div>
            </div>
            <div className='content-box card'>
              <Row>
                {
                  this.indexData.map((item, index) => {
                    return (
                      <Col span={3} key={index}>
                        <div className='card-item'>
                          <span className='amount'>{item.amount}</span>
                          <span className='name'>{item.name}</span>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
            <div className='content-box chart'>
              <Row>
                <Col span={12}>
                  <div className='chart-item columnar'>
                    <div className='chart-item-header'>
                      <span>Title</span>
                      <div className='filter' />
                    </div>
                    <ReactEcharts
                      ref={echart => this.echartRefs.push(echart)}
                      option={this.columnarOption}
                      style={{ width: '100%' }}
                      opts={{ renderer: 'svg' }}
                      className='react_for_echarts'
                      theme='my_theme'
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className='chart-item linear'>
                    <div className='chart-item-header'>
                      <span>Title</span>
                      <div className='filter'>
                        <Dropdown list={this.transportList} title='物流公司' onClick={(val) => console.log(val)} />
                        <Dropdown list={this.monthList} title='本月' onClick={(val) => console.log(val)} />
                      </div>
                    </div>
                    <ReactEcharts
                      ref={echart => this.echartRefs.push(echart)}
                      option={this.linearOption}
                      style={{ width: '100%' }}
                      opts={{ renderer: 'svg' }}
                      className='react_for_echarts'
                      theme='my_theme'
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='content-box chart small'>
              <Row>
                <Col span={8}>
                  <div className='chart-item pie'>
                    <div className='chart-item-header'>Title</div>
                    <ReactEcharts
                      ref={echart => this.echartRefs.push(echart)}
                      option={this.pieOption}
                      style={{ width: '100%', height: '100%' }}
                      opts={{ renderer: 'svg' }}
                      className='react_for_echarts'
                      theme='my_theme'
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div className='chart-item columnar'>
                    <div className='chart-item-header'>Title</div>
                    <ReactEcharts
                      ref={echart => this.echartRefs.push(echart)}
                      option={this.linearOption}
                      style={{ width: '100%', height: '100%' }}
                      opts={{ renderer: 'svg' }}
                      className='react_for_echarts'
                      theme='my_theme'
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div className='chart-item columnar'>
                    <div className='chart-item-header'>Title</div>
                    <div className='chart-item-content'>
                      <span>PROJECT RISK</span>
                      <Progress percent={50} type='circle' status='error' radius={55} />
                      <span>Balanced</span>
                      <span className='action-button'>Change your risk</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className='content-box table'>
              <div className='table-title'>Title</div>
              <Table
                columns={this.columns}
                data={this.tableDatas}
                name='dashborad-table'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeDashboard
