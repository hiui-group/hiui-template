import React, { Component } from 'react'
import Axios from 'axios'
import { Grid, Input, Button, Icon } from '@hi-ui/hiui'
import './index.scss'

const { Row } = Grid

export default class HomePortal extends Component{

    state = {
        backgroundUrl: '',
        hotWords: [],
        searchKeyWord: ''
    }

    async componentDidMount(){
        const { data:{data : { backgroundUrl, hotWords = [] } = {}} = {} } = await Axios.get('http://mock.be.mi.com/mock/2532/home/portal/info')
        this.setState({backgroundUrl,hotWords})
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
                    <p>
                        热搜词 ：&nbsp;
                    </p>
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
    render(){
        const { backgroundUrl } = this.state
        return (
            <div className="page page--portal" style={{ backgroundImage: `url(${backgroundUrl})` }}>
                {this.renderSearchPart()}
            </div>
        )
    }
}