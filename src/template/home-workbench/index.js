/**
 * 
 * @author xuhuihuang@xiaomi.com
 */
import React, { Component } from 'react'
import Axios from 'axios'
import {  Grid,Input,Button, Carousel } from '@hi-ui/hiui'
import { demoGlobalData } from '../../index'
import './index.scss'

const { Row, Col } = Grid

export default class Workbench extends Component{
    state = {
        searchKeyValue: '',
        carouselUrls: [],
        waitToBeDoneTotal: 0,
        waitToBeDoneInfos: [],
        waitToBeDoneNowPage: 1
    }

    async componentDidMount(){
        const { data : { data: {carouselUrls = [], waitToBeDoneTotal = 0}}} = await Axios.get('http://mock.be.mi.com/mock/2532/home/workbench/info')
        this.setState({carouselUrls,waitToBeDoneTotal})
        this.updateWaitToBeDoneInfos(this.state.waitToBeDoneNowPage)
    }

    updateWaitToBeDoneInfos = async (nowPage) => {
        // 此处是为了演示效果，直接将size定死，定为4
        const urlPath = `http://mock.be.mi.com/mock/2532/home/workbench/waitToBeDoneInfos?nowPage=${nowPage}&size=4`
        const {data:{data: waitToBeDoneInfos = []}} = await Axios.get(urlPath)
        this.setState({waitToBeDoneInfos})
    }

    // 搜索按钮被点击事件，在此函数中执行对应操作
    searchButtonClick = () => {
        console.log('Search keywords')
        console.log(this.state.searchKeyValue)
    }
    
    renderTopPart = () => {
        const { searchKeyValue } = this.state
        const userInfo = demoGlobalData.userInfo || {}
        return (
            <Row justify="space-between" gutter>
                <Col className="top_part_col">
                    <img className="user_icon" src={userInfo.iconUrl} alt=''/>
                    <span>{`${userInfo.name}，欢迎，美好的一天又开始了`}</span>
                </Col>
                <Col className="top_part_col">
                    <Input
                        style={{ width: '304px' }}
                        append={
                            <Button icon='search' onClick={this.searchButtonClick}/>
                        }
                        value={searchKeyValue}
                        placeholder='关键词搜索'
                        onChange={(e) => {
                            this.setState({searchKeyValue:e.target.value})
                        }}
                    />
                </Col>
            </Row>
        )
    }

    renderCarouselPart = () => {
        const { carouselUrls } = this.state

        return (
            <Col span={16}>
                <div style={{width:'744px'}}>
                    <Carousel duration={2000} showPages={true}>
                        {carouselUrls.map((url,index) => {
                            return <div className="carousel_image_container" key={index}><img className="carousel_image" src={url} key={index} alt=''/></div>
                        })}
                    </Carousel>
                </div>
                
            </Col>
        )
    }

    renderWaitToBeDone = () => {
        const { waitToBeDoneTotal/*, waitToBeDoneInfos*/ } = this.state
        // const statusMap = {
        //     1: {
        //         tag:'未开始',
        //         type: 'primary'
        //     },
        //     2: {
        //         tag:'即将开始',
        //         type: 'danger'
        //     },
        //     3: {
        //         tag:'已完成',
        //         type: 'success'
        //     }
        // }
        // const listData = waitToBeDoneInfos.map(item => ({
        //     title: item.issue,
        //     extra:[item.time,item.place],
        //     titleTag: statusMap[item.status].title,
        //     titleTagType: statusMap[item.status].type,
        //     id: item.id
        // }))
    
        return (
            <Col span={8} className="wait_to_be__container">
                <p className="wait_to_be__title">{`待办(${waitToBeDoneTotal})`}</p>
                <div>
                    {/* 等待HIUI修正 */}
                    {/* <List 
                        data={listData} 
                        actionPosition="bottom"
                        renderItem={dataItem =>{
                            const { Item } = List
                            return <Item {...dataItem} />
                        }}
                        action={dataItem => {
                            return (
                                <span>
                                    处理
                                </span>
                            )
                        }}
                    /> */}
                </div>
            </Col>
        )
    }

    renderQuickLinks = () => {

        return (
            <>
                <Row>
                    <Col span={24} className="quick-link__title">
                        快捷访问
                    </Col>
                </Row>
                <Row>
                    
                </Row>
            </>
        )
    }
    
    render(){
        return (
            <div className='page page--workbench'>
                {this.renderTopPart()}
                <Row justify="space-between">
                    {this.renderCarouselPart()}
                    {this.renderWaitToBeDone()}
                </Row>
                {this.renderQuickLinks()}
            </div>
        )
    }
}