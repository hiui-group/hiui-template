import React, { Component } from 'react'
import Axios from 'axios'
import { Grid, Input, Button, Icon, Menu, Card } from '@hi-ui/hiui'
import './index.scss'

const { Row, Col } = Grid

export default class HomePortal extends Component{

    navMenuId = {
        commonUse: 1,
        mine: 2
    }

    state = {
        backgroundUrl: '',
        hotWords: [],
        searchKeyWord: '',
        nowActiveNavId: this.navMenuId.commonUse,
        commonNavInfos: [],
        mineNavInfos: []
    }


    async componentDidMount(){
        const { data:{data : { backgroundUrl, hotWords = [], commonNavInfos = [], mineNavInfos = [] } = {}} = {} } = await Axios.get('http://mock.be.mi.com/mock/2532/home/portal/info')
        this.setState({backgroundUrl,hotWords,commonNavInfos,mineNavInfos})
    }

    /**
     * 搜索关键词接口，用户可以自行改造，此处示例为自动使用Bing搜索
     * @param {string} keyWord 关键词
     */
    searchKeyWordAction = (keyWord) => {
        window.open(`https://cn.bing.com/search?q=${encodeURI(keyWord)}`)
    }

    renderSearchPart = () => {
        const { hotWords, searchKeyWord } = this.state

        return (
            <div className='search-container'>
                <Row justify='center'>
                    <h3 className='search-guide'>小米全渠道百亿级数据统计指标和事实</h3>
                </Row>
                <Row justify='center'>
                    <Input
                        value={searchKeyWord}
                        onChange={e => this.setState({searchKeyWord:e.target.value})}
                        className="search-input"
                        append={
                            <Button className='search-button' onClick={() => this.searchKeyWordAction(searchKeyWord)}>
                                <Icon name='search' />
                            </Button>
                        }
                        placeholder='关键词搜索'
                    />
                </Row>
                <Row justify='center'>
                    <span>
                        热搜词 ：&nbsp;
                    </span>
                    {
                        hotWords.map((word,index) => (
                            <span
                                key={index}
                                className="search-hot-word" 
                                onClick={() => this.searchKeyWordAction(word)}>
                                    {word}
                            </span>
                        ))
                    }
                </Row>
            </div>
        )
    }

    renderNav = () => {
        const { nowActiveNavId, commonNavInfos, mineNavInfos } = this.state
        const navData = nowActiveNavId === this.navMenuId.commonUse?commonNavInfos:mineNavInfos
    
        const navMenuData = [
            {
                content:'常用',
                id: this.navMenuId.commonUse,
                icon: 'fire'
            },
            {
                content: '我的',
                id: this.navMenuId.mine,
                icon: 'user'
            }
        ]

        return (
            <div className="nav-container">
                <Menu 
                    placement='horizontal'
                    data={navMenuData}
                    activeId={nowActiveNavId}
                    onClick={id => this.setState({nowActiveNavId:id})}
                />
                <div>
                    <Row gutter justify='space-between' className="nav-link__list">
                        {navData.map(({id,link,title,detail,icon}) => (
                            <Col key={id} span={8} className="nav-link__item">
                                <div  onClick={() => window.open(link)}>
                                    <Card
                                        hoverable
                                    >
                                        <div className="nav-link__content">
                                            <img className="nav-link__icon" src={icon} alt=''/>
                                            <div>
                                                <p className="nav-link__item__title">{title}</p>
                                                <p className="nav-link__item__detail">{detail}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }
    render(){
        const { backgroundUrl } = this.state
        return (
            <div className="page page--portal" >
                <div className="back-image" style={{ backgroundImage: `url(${backgroundUrl})` }}/>
                {this.renderSearchPart()}
                {this.renderNav()}
            </div>
        )
    }
}