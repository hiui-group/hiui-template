import React,{Component} from 'react'
import Cls from 'classnames'
import Debounce from 'lodash/debounce'
import {  Grid, Loading, DatePicker, Dropdown, Table } from '@hi-ui/hiui'
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
        },
        expressTypeInfos: [],
        activityExpectInfos: [],
        efficiencyRate: 0,
        inventoryDetailInfos: []
    }

    // 所有表格引用对象Map
    eChartRefMap = new Map()

    async componentDidMount(){
        // 当窗口尺寸变化的时候，canvas需要绘制的大小也会改变，所以需要主动的去重新绘制canvas
        // 增加防抖处理，以免函数频繁执行
        window.onresize = Debounce(() => {
            Array.from(this.eChartRefMap.values()).forEach(
                chart => {
                    chart && chart.getEchartsInstance().resize()
                }
            )
        }, 100)
    
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
            const { data: {data : {indicatorInfos = [], expressTypeInfos=[], activityExpectInfos=[],
                        efficiencyRate = 0, inventoryDetailInfos = []}} } = await Axios.get(path)
            this.setState({indicatorInfos,expressTypeInfos,activityExpectInfos, efficiencyRate, inventoryDetailInfos})
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

    // 绘制快递类别占比图表
    renderExpressTypeChart(){

        const { expressTypeInfos } = this.state
        // 注意，此处数组的类型结构为{value:number,name:string}，如原数据不是此类型结构，请先转换
        // 因为使用了MOCK数据，为了让数据看起来真一点所以才做了一些处理
        const chartData = [...expressTypeInfos].map(item => (
            {name: item.name + '快递',value: item.value})
        )
    
        const chartOption = {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(56, 62, 71, 1)',
                formatter: '{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 20,
                top: 5,
                // 格式化计算百分比显示在右侧
                formatter: name => {
                    const data = chartData
                    let total = 0
                    let target = 0
                    data.forEach(item => {
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
                data: chartData.map(item => item.name),
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
                    data: chartData
                }
            ]
        }
        return (
            <Col span={12}>
                <div className='card'>
                    <div className='card__header'>
                        <span className='card__title'>快递类别占比</span>
                    </div>
                    <div className='card__body'>
                        <EChartsForReact
                        ref={ref => this.eChartRefMap.set('expressType',ref)}
                        option={chartOption}
                        opts={{ renderer: 'svg' }}
                        style={{ height: '164px', width: '100%' }}
                        className='card__canvas'
                        theme='hiui_theme'
                        />
                    </div>
                </div>
            </Col>
        )
    }

    renderActivityExpectChart(){
        const { activityExpectInfos } = this.state
        // Y周分割数据点
        const segmentation = [
            {
                value: 1000,
                color: '#4caf60'
            },
            {
                value: 2000,
                color: '#03A9F4'
            }
        ]
        // 生成Y周分割段
        const pieces = segmentation.map(
            (item, index) => {
                const { value, color } = item
                const lastValue = index === 0 ? 0 : segmentation[index - 1].value
                return {
                    gt: lastValue,
                    lte: value,
                    color: color
                }
            }
        )
        pieces.push({
            gt: segmentation[segmentation.length - 1].value,
            color: '#cc0033'
        })
    

        const chartOption = {
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
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }],
            visualMap: {
                top: 0,
                right: 0,
                pieces,
                outOfRange: {
                    color: '#999'
                }
            },    
            series: [{
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                // 标记线
                markLine: {
                    silent: true,
                    data: segmentation.map((item) => ({ yAxis: item.value }))
                },        
                showSymbol: false,
                smooth: 0.2,
                areaStyle: { color: 'rgba(103, 157, 246, 0.16)' },
                data: activityExpectInfos
            }]
        }

        return (
            <Col span={24}>
                <div className='card'>
                    <div className='card__header'>
                        <span className='card__title'>活动预期情况预算</span>
                    </div>
                    <div className='card__body'>
                        <EChartsForReact
                        ref={ref => this.eChartRefMap.set('activityExpect',ref)}
                        option={chartOption}
                        opts={{ renderer: 'svg' }}
                        style={{ height: '300px', width: '100%' }}
                        className='card__canvas'
                        theme='hiui_theme'
                        />
                    </div>
                </div>
            </Col>
        )
    }

    renderEfficiencyChart(){
        const { efficiencyRate } = this.state
        const safeEfficiencyRate = Number(efficiencyRate).toFixed(1)

        const chartOption = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%',
                backgroundColor: 'rgba(56, 62, 71, 1)'
            },
            toolbox: {},
            series: [
            {
                name: '跳出率',
                type: 'gauge',
                radius: '80%',
                min: 0,
                max: 100,
                splitNumber: 20,
                data: [{ value: safeEfficiencyRate, name: '跳出率' }],
                axisLine: {
                    lineStyle: {
                        width: 0,
                        color: [[0, '#4387f4'],[safeEfficiencyRate/100,'#4387f4'], [safeEfficiencyRate/100,'#aaa'], [1, '#aaa']]
                    }
                },
                axisLabel: {
                    color: '#333',
                    formatter: (value) => {
                        // const valueMap = {
                        //     20: '差',
                        //     40: '中',
                        //     60: '良',
                        //     80: '优'
                        // }

                        // return valueMap[String(value)] || ''
                        const allowShowValues = [0,20,40,60,80,100]
                        return allowShowValues.includes(Number(value))?value:''
                    }
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                itemStyle: {
                    color: '#4387f4'
                },
                pointer: {
                    width: 2
                },
                axisTick: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: 'auto',
                        opacity: 0.6
                    }
                },
                title:{
                    fontSize: 12,
                    offsetCenter: [0, '50%%']
                },
                detail: {
                    offsetCenter: [0, '90%'],
                    fontSize: 26,
                    formatter: '{value}%',
                    color: '#333',
                    fontWeight: 'bolder'
                }
            }]
        }

        return (
            <Col span={12}>
                <div className='card'>
                    <div className='card__header'>
                        <span className='card__title'>合券效率</span>
                    </div>
                    <div className='card__body'>
                        <EChartsForReact
                            ref={ref => this.eChartRefMap.set('efficiency',ref)}
                            option={chartOption}
                            opts={{ renderer: 'svg' }}
                            style={{ height: '240px', width: '100%' }}
                            className='card__canvas'
                            theme='hiui_theme'
                        />
                    </div>
                </div>
            </Col>
        )
    }

    renderInventoryDetail(){
        const { inventoryDetailInfos } = this.state
        const tableData = inventoryDetailInfos.map(item => ({...item,key: item.id}))

        const tableColumns = [
            {
                title: '商品名',
                dataKey: 'name'
            },
            {
                title: '品类',
                dataKey: 'category'
            },
            {
                title: '规格',
                dataKey: 'specification'
            },
            {
                title: '单价',
                dataKey: 'price',
                align: 'right'
            },
            {
                title: '门店',
                dataKey: 'shop',
                align: 'right'
            },
            {
                title: '库存',
                dataKey: 'inventory',
                align: 'right'
            }
        ]
        return (
            <Row>
                <Col span={24}>
                    <div className='card'>
                    <div className='card__header'>
                        <span className='card__title'>库存详情</span>
                    </div>
                    <div className='card__body'>
                        <Table
                            columns={tableColumns}
                            data={tableData}
                        />
                    </div>
                    </div>
                </Col>
            </Row>
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
                <Row>
                    {this.renderActivityExpectChart()}
                </Row>
                <Row gutter>
                    {this.renderExpressTypeChart()}
                    {this.renderEfficiencyChart()}
                </Row>
                {this.renderInventoryDetail()}
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