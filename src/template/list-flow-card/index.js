import React, { Component } from 'react'
import { Input, Icon, Button } from '@hi-ui/hiui'
import './index.scss'

export default class ListFlowCard extends Component{

    state = {
        searchValue: ''
    }
    // 渲染顶部搜索栏
    renderTopPart = () => {
        const { searchValue } = this.state
        return (
            <div className="top-part-container">
                <span className="top-part-title">任务管理</span>
                <div className="top-part-function-container">
                    <Input
                        style={{ width: '259px' }}
                        value={searchValue}
                        append={
                            <Button>
                                <Icon name='search' />
                            </Button>
                        }
                        onChange={event => {
                            this.setState({
                                searchValue: event.target.value
                            })
                        }}
                        placeholder='请输入搜索关键词'
                    />
                    <Button type="primary" className="add-new-button">
                        <Icon name='plus' />
                        新建
                    </Button>
                </div>
            </div>
        )
    }

    render(){

        return (
            <div className="page page--list-flow-card">
                {this.renderTopPart()}
            </div>
        )
    }
}