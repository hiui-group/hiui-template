import React,{Component} from 'react'
import Cls from 'classnames'
import {  Grid, Loading, DatePicker, Dropdown } from '@hi-ui/hiui'
import Axios from 'axios'
import EChartsForReact from 'echarts-for-react'
import ECharts from 'echarts'
// 此为页面定制化图表📈主题，用户可以拷贝下来自行修改
import Theme from './echart-theme'
import './index.scss'

// 注册页面定制化图表📈主题
ECharts.registerTheme('hiui_theme', Theme)
const { Row, Col } = Grid

export default class HomeDashboard extends Component{
    // state 的层级不建议太深，尽量拆分其层级
    state = {
        // tab栏信息
        tabInfos: [],
        isLoadingData: true,
        // 是否正在获取物流信息
        isLoadingLogistics: true,
        isLoadingEnquiryOrder: true,
        logisticsInfo:{
            // 总部物流信息
            headOffice:[],
            // 八期物流信息
            eightOffice: []
        },
        logisticsStart: new Date(),
        logisticsEnd: new Date(),
        nowActiveTabId: 0,
        // 指标名称信息
        indicatorInfos: [],
        // 下单量表格选择物流企业Id
        orderChartSelectLogisticCompanyId: 1,
        // 下单表格选择时间范围id
        orderChartSelectTimeRangeId: 1,
        // 询价下单表格数据
        enquiryAndOrderInfo:{
            enquiry: [],
            order: []
        }
    }

    eChartRefMap = new Map()

    async componentDidMount(){
        this.setState({isLoadingData: true})
        // 获取面板分类信息
        const {data: {data = []} } = await Axios.get('http://mock.be.mi.com/mock/2532/home/dashboard/tabs')

        this.setState({tabInfos:data})
        // 做容错处理，以防止后端传回数据为空
        this.setState({nowActiveTabId:(data[0] || {}).id})

        this.setState({isLoadingData: false})

        // 容错校验
        if(data[0]){
            this.updatePageInfos(data[0].id)
        }
    }

    async updatePageInfos(id){
        this.setState({isLoadingData: true})
        const {logisticsStart,logisticsEnd, orderChartSelectLogisticCompanyId, orderChartSelectTimeRangeId} = this.state
        const fetchPageMatchIdInfo = async () => {
            const path = `http://mock.be.mi.com/mock/2532/home/dashboard/info?id=${id}`
            // 根据id获取页面信息
            const { data: {data : {indicatorInfos = []}} } = await Axios.get(path)
            this.setState({indicatorInfos})
        }
        // 由于整个页面数据从三个接口获取，使用promise.all，三个数据获取同时进行 
        Promise.all([
            fetchPageMatchIdInfo(),
            this.updateLogisticsInfo(id,logisticsStart.getTime(),logisticsEnd.getTime()),
            this.updateEnquiryOrderInfo(id,orderChartSelectLogisticCompanyId, orderChartSelectTimeRangeId)
        ]).finally(() => {
            this.setState({isLoadingData: false})
        })

    }

    async updateLogisticsInfo(id,start,end){
        this.setState({isLoadingLogistics: true})
        const path = `http://mock.be.mi.com/mock/2532/home/dashboard/logistics?id=${id}&start=${start}&end=${end}`
        // 根据id获取页面信息
        const { data: {data : {headOffice = [], eightOffice = []}} } = await Axios.get(path)
        this.setState({logisticsInfo:{headOffice,eightOffice},isLoadingLogistics: false})
    }

    async updateEnquiryOrderInfo(id,logisticsId,timeId){
        this.setState({isLoadingEnquiryOrder: true})
        const path = `http://mock.be.mi.com/mock/2532/home/dashboard/order?id=${id}&logisticsId=${logisticsId}&timeId=${timeId}`
        // 根据id获取页面信息
        const { data: {data : {enquiry = [], order = []}} } = await Axios.get(path)
        this.setState({enquiryAndOrderInfo:{enquiry,order},isLoadingEnquiryOrder: false})
    }

    /**
     * 渲染右上角，tab切换信息部分
     */
    renderTabInfos(){
        const { tabInfos, nowActiveTabId } = this.state
        const changeActiveTabDel = (newActiveId) => {
            if(newActiveId !== nowActiveTabId){
                this.setState({nowActiveTabId: newActiveId})
                this.updatePageInfos(newActiveId)
            }
        }
        return (
            <Col>
                {
                    tabInfos.map(({title,id}) => {
                        const tagClassName = Cls('tag-btn',{
                            active: id === nowActiveTabId
                        })

                        return <span onClick={() => changeActiveTabDel(id)} key={id} className={tagClassName}>{title}</span>
                    })
                }
            </Col>
        )
    }

    // 渲染指标部分
    renderIndicatorInfos(){
        const { indicatorInfos } = this.state
        return (
            <Row gutter>
                {indicatorInfos.map(({id,title,num,tooltip}) => {
                    return (
                    <Col key={id} span={8}>
                        <div className='info'>
                        <span className='info__amount'>{num}</span>
                        <span className='info__name'>{title}</span>
                        </div>
                    </Col>
                )
                })}
            </Row>
        )
    }

    // 渲染物流图表
    renderLogisticsChart(){
        const { isLoadingLogistics,isLoadingData, logisticsStart, logisticsEnd, logisticsInfo:{headOffice, eightOffice}} = this.state
        // 物流表格表格配置
        const chartOption = {
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
            // 数据回填
            series: [
                {
                    name: '总参',
                    type: 'bar',
                    barWidth: 20,
                    data: headOffice
                },
                {
                    name: '八期',
                    type: 'bar',
                    barWidth: 20,
                    data: eightOffice
                }
            ]
        }
        return (
            <Col span={12}>
                {/* 如果页面正在加载数据，则表格loading不显示 */}
                <Loading visible={!isLoadingData&&isLoadingLogistics}>
                    <div className='card'>
                        <div className='card__header'>
                            <span className='card__title'>物流运单数对比</span>
                            <DatePicker
                                type='daterange'
                                shortcuts={['近一周', '近一月', '近三月', '近一年']}
                                value={{start: logisticsStart, end: logisticsEnd}}
                                onChange={d => {
                                    // 根据 id 和 时间段获取最新数据
                                    this.updateLogisticsInfo(this.state.nowActiveTabId,d.start.getTime(),d.end.getTime())
                                    // 更新时间段的值
                                    this.setState({logisticsEnd: d.end, logisticsStart: d.start})
                                }}
                            />
                        </div>
                        <div className='card__body'>
                            <EChartsForReact
                                // 将引用添加到map对象中，页面resize使用
                                ref={ref => this.eChartRefMap.set('logistics',ref)}
                                option={chartOption}
                                style={{ height: '280px', width: '100%' }}
                                opts={{ renderer: 'svg' }}
                                className='card__canvas'
                                theme='hiui_theme'
                            />
                        </div>
                    </div>
                </Loading>
            </Col>
        )
    }

    renderOrderInfoChart(){
        const {orderChartSelectLogisticCompanyId,orderChartSelectTimeRangeId, nowActiveTabId,
                enquiryAndOrderInfo:{enquiry,order}, isLoadingData, isLoadingEnquiryOrder } = this.state
        const chartOption = {
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
                    data: enquiry,
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
                        colorStops: [
                            {
                            offset: 0,
                            color: 'rgba(72, 161, 255, 0.24)' // 0% 处的颜色
                            },
                            {
                            offset: 0.6,
                            color: 'rgba(126, 207, 255, 0)'
                            }
                        ],
                        global: false // 缺省为 false
                        }
                    }
                },
                {
                    name: '下单',
                    data: order,
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
                        colorStops: [
                            {
                            offset: 0,
                            color: 'rgba(151, 115, 240, 0.24)' // 0% 处的颜色
                            },
                            {
                            offset: 0.6,
                            color: 'rgba(151, 115, 240, 0)'
                            }
                        ],
                        global: false // 缺省为 false
                        }
                    }
                }
            ]
        }

        const logisticsCompanyInfos = [{
            id: 1,
            title: '顺丰快递'
        },{
            id: 2,
            title: '圆通快递'
        },{
            id: 3,
            title: '申通快递'
        }]
        const logisticsCompanyTitle = logisticsCompanyInfos.find(item => item.id === orderChartSelectLogisticCompanyId).title

        const timeInfos = [
            {
                id: 1,
                title: '本周'
            },{
                id: 2,
                title: '本月'
            },{
                id: 3,
                title: '本季'
            }
        ]
        const timeTitle = timeInfos.find(item => item.id === orderChartSelectTimeRangeId).title
        
        return (
            <Col span={12}>
                {/* 如果页面正在加载数据，则表格loading不显示 */}
                <Loading visible={!isLoadingData && isLoadingEnquiryOrder}>
                    <div className='card'>
                        <div className='card__header'>
                            <span className='card__title'>询价下单量</span>
                            <div className='card__filter'>
                            <Dropdown
                                data={logisticsCompanyInfos}
                                title={logisticsCompanyTitle}
                                onClick={id => {
                                    // 勾选改变，获取最新数据
                                    this.updateEnquiryOrderInfo(nowActiveTabId,id, orderChartSelectTimeRangeId)
                                    this.setState({orderChartSelectLogisticCompanyId: id})
                                }}
                                className="order-info__company-select"
                            />
                            <Dropdown data={timeInfos} title={timeTitle} onClick={id => {
                                // 勾选改变，获取最新数据
                                this.updateEnquiryOrderInfo(nowActiveTabId,orderChartSelectLogisticCompanyId, id)
                                this.setState({orderChartSelectTimeRangeId: id})
                            }} />
                        </div>
                        </div>
                        <div className='card__body'>
                            <EChartsForReact
                                ref={ref => this.eChartRefMap.set('order',ref)}
                                option={chartOption}
                                opts={{ renderer: 'svg' }}
                                style={{ height: '280px', width: '100%' }}
                                className='card__canvas'
                                theme='hiui_theme'
                            />
                        </div>
                    </div>
                </Loading>
            </Col>
        )
    }

    render (){
        const { isLoadingData } = this.state
        return (
            <div className="page page--dashboard">
                <Row justify='space-between'>
                    <Col>
                        <span className='dashboard-title'>首页</span>
                    </Col>
                    {this.renderTabInfos()}
                </Row>
                {this.renderIndicatorInfos()}
                <Row gutter>
                    {this.renderLogisticsChart()}
                    {this.renderOrderInfoChart()}
                </Row>
                {/* loading状态遮罩，通过css修改为了透明背景，在Loading时页面无法操作 */}
                {isLoadingData && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}
            </div>
            

        )
    }
}