// import React, { Component } from 'react'
// import EChartsForReact from 'echarts-for-react'
// import ECharts from 'echarts'
// // import Debounce from 'lodash/debounce'
// import theme from './echart-theme'
// import { Notification, DatePicker, Button, Dropdown, Table, Grid } from '@hi-ui/hiui'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import './index.scss'

// ECharts.registerTheme('hiui_theme', theme)
// const { Row, Col } = Grid

// // 防抖处理
// function debounce (fn, wait) {
//   let timeout = null
//   return function () {
//     if (timeout !== null) clearTimeout(timeout)
//     timeout = setTimeout(fn, wait)
//   }
// }

// class HomeDashboard extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       pageSize: 10,
//       total: 0,
//       page: 1,
//       tableDatas: [],
//       columns: []
//     }

//     this.columnMixins = {
//       id: {
//         sorter (pre, next) {
//           return pre.id - next.id
//         }
//       },
//       action: {
//         render: () => (
//           <React.Fragment>
//             <Link to='/form-unfold-group'>
//               <Button type='default' appearance='link' icon='edit' />
//             </Link>
//             <Button
//               type='default'
//               appearance='link'
//               icon='delete'
//               onClick={() => {
//                 Notification.open({
//                   type: 'success',
//                   title: '消息',
//                   content: '数据已删除'
//                 })
//               }}
//             />
//             <Button type='default' appearance='link' icon='more' onClick={() => {}} />
//           </React.Fragment>
//         )
//       }
//     }

//     this.echartRefs = []
//     this.indexData = [
//       {
//         amount: '1,300,800',
//         name: '总销售额(元)'
//       },
//       {
//         amount: '34,000',
//         name: '总销售额(元)'
//       },
//       {
//         amount: '82',
//         name: '耳机(个)'
//       }
//     ]
//     this.transportList = [
//       { title: '顺丰速运' },
//       { title: '中通快递' },
//       { title: '圆通快递' },
//       { title: '百世快递' },
//       { title: '韵达快递' }
//     ]
//     this.monthList = [{ title: '11月' }, { title: '10月' }, { title: '9月' }]
//   }

//   componentDidMount () {
//     window.onresize = debounce(() => {
//       this.echartRefs.forEach(chart => {
//         chart && chart.getEchartsInstance().resize()
//       })
//     }, 50)
//     this.fetchData()
//   }
//   fetchData (page) {
//     const { s } = this.state

//     axios
//       .get(`http://yapi.demo.qunar.com/mock/26534/hiui/list/order`, {
//         params: {
//           page,
//           s
//         }
//       })
//       .then(ret => {
//         const datas = []

//         if (ret && ret.data.code === 200) {
//           const data = ret.data.data
//           const columns = data.columns
//           const pageInfo = data.pageInfo

//           data.data.forEach(data => {
//             datas.push(data)
//           })
//           this.setState({
//             tableDatas: datas,
//             page: page,
//             total: pageInfo.total,
//             pageSize: pageInfo.pageSize,
//             columns: this.setTableColumns(columns)
//           })
//         }
//       })
//   }

//   setTableColumns (columns) {
//     const _columns = []

//     columns.forEach(column => {
//       const key = column.key

//       _columns.push({
//         ...column,
//         ...this.columnMixins[key]
//       })
//     })

//     return _columns
//   }

//   componentWillUnmount () {
//     window.onresize = null
//   }

//   columnarOption = {
//     tooltip: {
//       trigger: 'axis',
//       backgroundColor: 'rgba(56, 62, 71, 1)',
//       axisPointer: {
//         type: 'none'
//       }
//     },
//     legend: {
//       data: ['总参', '八期'],
//       icon: 'rect',
//       itemWidth: 8,
//       itemHeight: 8
//     },
//     grid: {
//       left: '0%',
//       right: '0%',
//       bottom: '0%',
//       containLabel: true
//     },
//     yAxis: {
//       type: 'value',
//       axisLine: {
//         show: false
//       },
//       splitLine: {
//         lineStyle: {
//           type: 'dashed'
//         }
//       },
//       boundaryGap: [0, 0.01]
//     },
//     xAxis: {
//       type: 'category',
//       splitLine: {
//         show: false
//       },
//       axisTick: {
//         show: true,
//         alignWithLabel: true,
//         lineStyle: {
//           color: '#BFBFBF'
//         }
//       },
//       data: ['顺丰速运', '中通快递', '圆通快递', '百世快递', '韵达快递']
//     },
//     series: [
//       {
//         name: '总参',
//         type: 'bar',
//         barWidth: 20,
//         data: [75, 35, 55, 42, 8]
//       },
//       {
//         name: '八期',
//         type: 'bar',
//         barWidth: 20,
//         data: [62, 83, 42, 42, 30]
//       }
//     ]
//   }

//   linearOption = {
//     tooltip: {
//       trigger: 'axis',
//       backgroundColor: 'rgba(56, 62, 71, 1)'
//     },
//     grid: {
//       left: '0%',
//       right: '0%',
//       bottom: '0%',
//       containLabel: true
//     },
//     legend: {
//       icon: 'circle',
//       itemWidth: 8,
//       itemHeight: 8,
//       data: ['询价', '下单']
//     },
//     xAxis: {
//       type: 'category',
//       splitLine: {
//         show: false
//       },
//       axisTick: {
//         show: true,
//         alignWithLabel: true,
//         lineStyle: {
//           color: '#BFBFBF'
//         }
//       },
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     },
//     yAxis: {
//       type: 'value',
//       axisLine: {
//         show: false
//       },
//       splitLine: {
//         lineStyle: {
//           type: 'dashed'
//         }
//       }
//     },
//     series: [
//       {
//         name: '询价',
//         data: [120, 165, 150, 240, 260, 180, 190],
//         type: 'line',
//         showSymbol: false,
//         smooth: true,
//         symbolSize: 3,
//         itemStyle: {
//           borderWidth: 3
//         },
//         areaStyle: {
//           color: {
//             type: 'linear',
//             x: 0,
//             y: 0,
//             x2: 0,
//             y2: 1,
//             colorStops: [
//               {
//                 offset: 0,
//                 color: 'rgba(72, 161, 255, 0.24)' // 0% 处的颜色
//               },
//               {
//                 offset: 0.6,
//                 color: 'rgba(126, 207, 255, 0)'
//               }
//             ],
//             global: false // 缺省为 false
//           }
//         }
//       },
//       {
//         name: '下单',
//         data: [95, 98, 52, 125, 155, 115, 99],
//         type: 'line',
//         showSymbol: false,
//         smooth: true,
//         symbolSize: 3,
//         itemStyle: {
//           borderWidth: 3
//         },
//         areaStyle: {
//           color: {
//             type: 'linear',
//             x: 0,
//             y: 0,
//             x2: 0,
//             y2: 1,
//             colorStops: [
//               {
//                 offset: 0,
//                 color: 'rgba(151, 115, 240, 0.24)' // 0% 处的颜色
//               },
//               {
//                 offset: 0.6,
//                 color: 'rgba(151, 115, 240, 0)'
//               }
//             ],
//             global: false // 缺省为 false
//           }
//         }
//       }
//     ]
//   }

//   circleData = [
//     { value: 45, name: '顺丰快递' },
//     { value: 20, name: '申通快递' },
//     { value: 25, name: '中通快递' },
//     { value: 15, name: '韵达快递' },
//     { value: 10, name: '其它快递' }
//   ]

//   pieOption = {
//     tooltip: {
//       trigger: 'item',
//       backgroundColor: 'rgba(56, 62, 71, 1)',
//       formatter: '{a} <br/>{b}: {c} ({d}%)'
//     },
//     legend: {
//       orient: 'vertical',
//       right: 20,
//       top: 5,
//       formatter: name => {
//         let data = this.circleData
//         let total = 0
//         let target = ''
//         data.forEach(item => {
//           total += item.value
//           if (item.name === name) {
//             target = item.value
//           }
//         })
//         return name + ' ' + ((target / total) * 100).toFixed(2) + '%'
//       },
//       itemGap: 20,
//       textStyle: {
//         color: '#333333'
//       },
//       data: ['顺丰快递', '申通快递', '中通快递', '韵达快递', '其它快递'],
//       icon: 'circle',
//       itemWidth: 8,
//       itemHeight: 8,
//       borderRadius: 8
//     },
//     grid: {
//       containLabel: true
//     },
//     series: [
//       {
//         type: 'pie',
//         radius: [50, 68],
//         center: ['25%', '50%'],
//         avoidLabelOverlap: false,
//         label: {
//           normal: {
//             show: false,
//             position: 'center'
//           },
//           emphasis: {
//             show: true,
//             textStyle: {
//               fontSize: '14',
//               fontWeight: 'bold'
//             }
//           }
//         },
//         labelLine: {
//           normal: {
//             show: false
//           }
//         },
//         data: this.circleData
//       }
//     ]
//   }

//   areaOption = {
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'cross',
//         label: {
//           backgroundColor: '#6a7985'
//         }
//       }
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     xAxis: [
//       {
//         type: 'category',
//         boundaryGap: false
//       }
//     ],
//     yAxis: [
//       {
//         type: 'value',
//         axisLine: {
//           show: false
//         },
//         // axisLabel: {
//         //   inside: true,
//         //   interval: (index, value) => { return value >= 200 }
//         // },
//         splitLine: {
//           lineStyle: {
//             type: 'dashed'
//           }
//         }
//       }
//     ],
//     series: [
//       {
//         type: 'line',
//         stack: '总量',
//         label: {
//           normal: {
//             show: true,
//             position: 'top'
//           }
//         },
//         showSymbol: false,
//         smooth: 0.2,
//         areaStyle: { color: 'rgba(103, 157, 246, 0.16)' },
//         data: [540, 640, 688, 799, 732, 887, 1320]
//       }
//     ]
//   }
//   gaugeOption = {
//     tooltip: {
//       formatter: '{a} <br/>{b} : {c}%',
//       backgroundColor: 'rgba(56, 62, 71, 1)'
//     },
//     toolbox: {},
//     series: [
//       {
//         name: '完成率',
//         type: 'gauge',
//         splitNumber: 4,
//         data: [{ value: 87 }],
//         axisLine: {
//           lineStyle: {
//             width: 10,
//             color: [[0.25, '#EFF2F5'], [1, '#EFF2F5']]
//           }
//         },
//         axisLabel: {
//           color: '#333'
//         },
//         splitLine: {
//           length: 15,
//           lineStyle: {
//             color: '#699DF5',
//             width: 4
//           }
//         },
//         itemStyle: {
//           color: '#699DF5'
//         },
//         pointer: {
//           width: 2
//         },
//         axisTick: {
//           show: false
//         },
//         detail: {
//           offsetCenter: [0, '90%'],
//           fontSize: 22,
//           formatter: '{value}%',
//           color: '#333'
//         }
//       },
//       {
//         name: '完成率',
//         type: 'gauge',
//         splitNumber: 4,
//         startAngle: 225,
//         endAngle: -12.5,
//         data: [{ value: 100 }],
//         axisLine: {
//           lineStyle: {
//             width: 10,
//             color: [[0.25, '#699DF5'], [1, '#699DF5']]
//           }
//         },
//         axisLabel: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         },
//         pointer: {
//           show: false
//         },
//         axisTick: {
//           show: false
//         },
//         itemStyle: {},
//         title: { show: false },
//         detail: { show: false }
//       }
//     ]
//   }
//   render () {
//     this.echartRefs.length = 0
//     const { columns, tableDatas, pageSize, total, page } = this.state
//     return (
//       <div className='page page--dashboard'>
//         <Row gutter>
//           <Col span={24}>
//             <span className='dashboard-title'>首页</span>
//           </Col>
//         </Row>
//         <Row gutter>
//           <Col span={24}>
//             <span className='tag-btn active'>最新报表</span>
//             <span className='tag-btn'>昨日报表</span>
//             <span className='tag-btn'>本月报表</span>
//           </Col>
//         </Row>
//         <Row gutter>
//           <Col span={12}>
//             <Row gutter>
//               {this.indexData.map((item, index) => {
//                 return (
//                   <Col span={8} key={index}>
//                     <div className='info'>
//                       <span className='info__amount'>{item.amount}</span>
//                       <span className='info__name'>{item.name}</span>
//                     </div>
//                   </Col>
//                 )
//               })}
//             </Row>
//           </Col>
//           <Col span={12}>
//             <Row gutter>
//               {this.indexData.map((item, index) => {
//                 return (
//                   <Col span={8} key={index}>
//                     <div className='info'>
//                       <span className='info__amount'>{item.amount}</span>
//                       <span className='info__name'>{item.name}</span>
//                     </div>
//                   </Col>
//                 )
//               })}
//             </Row>
//           </Col>
//         </Row>
//         <Row gutter>
//           <Col span={12}>
//             <div className='card'>
//               <div className='card__header'>
//                 <span className='card__title'>快递数量</span>
//                 <DatePicker
//                   type='daterange'
//                   shortcuts={['近一周', '近一月', '近三月', '近一年']}
//                   onChange={d => {
//                     console.log(d)
//                   }}
//                 />
//               </div>
//               <div className='card__body'>
//                 <EChartsForReact
//                   ref={echart => this.echartRefs.push(echart)}
//                   option={this.columnarOption}
//                   style={{ height: '280px', width: '100%' }}
//                   opts={{ renderer: 'svg' }}
//                   className='card__canvas'
//                   theme='hiui_theme'
//                 />
//               </div>
//             </div>
//           </Col>
//           <Col span={12}>
//             <div className='card'>
//               <div className='card__header'>
//                 <span className='card__title'>询价下单量</span>
//                 <div className='card__filter'>
//                   <Dropdown
//                     data={this.transportList}
//                     title='物流公司'
//                     onClick={val => console.log(val)}
//                   />
//                   <Dropdown data={this.monthList} title='本月' onClick={val => console.log(val)} />
//                 </div>
//               </div>
//               <div className='card__body'>
//                 <EChartsForReact
//                   ref={echart => this.echartRefs.push(echart)}
//                   option={this.linearOption}
//                   opts={{ renderer: 'svg' }}
//                   style={{ height: '280px', width: '100%' }}
//                   className='card__canvas'
//                   theme='hiui_theme'
//                 />
//               </div>
//             </div>
//           </Col>
//         </Row>
//         <Row gutter>
//           <Col span={8}>
//             <div className='card'>
//               <div className='card__header'>
//                 <span className='card__title'>快递类别占比</span>
//               </div>
//               <div className='card__body'>
//                 <EChartsForReact
//                   ref={echart => this.echartRefs.push(echart)}
//                   option={this.pieOption}
//                   opts={{ renderer: 'svg' }}
//                   style={{ height: '164px', width: '100%' }}
//                   className='card__canvas'
//                   theme='hiui_theme'
//                 />
//               </div>
//             </div>
//           </Col>
//           <Col span={8}>
//             <div className='card'>
//               <div className='card__header'>
//                 <span className='card__title'>预算情况（万元）</span>
//               </div>
//               <div className='card__body'>
//                 <EChartsForReact
//                   ref={echart => this.echartRefs.push(echart)}
//                   option={this.areaOption}
//                   opts={{ renderer: 'svg' }}
//                   className='card__canvas'
//                   style={{ height: '164px', width: '100%' }}
//                   theme='hiui_theme'
//                 />
//               </div>
//             </div>
//           </Col>
//           <Col span={8}>
//             <div className='card'>
//               <div className='card__header'>
//                 <span className='card__title'>完成率</span>
//               </div>
//               <div className='card__body'>
//                 <EChartsForReact
//                   ref={echart => this.echartRefs.push(echart)}
//                   option={this.gaugeOption}
//                   opts={{ renderer: 'svg' }}
//                   style={{ height: '232px', width: '232px', position: 'absolute' }}
//                   className='card__canvas'
//                   theme='hiui_theme'
//                 />
//               </div>
//             </div>
//           </Col>
//         </Row>
//         <Row>
//           <Col span={24}>
//             <div className='card'>
//               <div className='card__header'>
//                 <span className='card__title'>列表</span>
//               </div>
//               <div className='card__body'>
//                 <Table
//                   columns={columns}
//                   data={tableDatas}
//                   pagination={{
//                     pageSize: pageSize,
//                     total: total,
//                     current: page,
//                     onChange: page => {
//                       this.fetchData(page)
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     )
//   }
// }

// export default HomeDashboard
