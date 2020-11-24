import React, { Component } from 'react'
import { Input, Icon, Button, Stepper } from '@hi-ui/hiui'
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

    renderStepper = () => {
        const data = [
            {
                title:'启动阶段',
                content: '明确项目目标和愿景'
            },
            {
                title:'计划阶段',
                content: '项目进行中遇到的问题'
            },
            {
                title:'执行阶段',
                content: '项目过程中每个环节记录'
            },
            {
                title:'维护阶段',
                content: '借助项目记录了解项目'
            }
        ]
        return (
            <div className="stepper-container">
                <Stepper data={data} current={0} itemLayout="vertical"/>
            </div>
        )
    }

    render(){

        return (
            <div className="page page--list-flow-card">
                {this.renderTopPart()}
                {this.renderStepper()}
            </div>
        )
    }
}