import React, { Component } from 'react'
import Axios from 'axios'
import { Input, Icon, Button, Stepper, Grid, Card } from '@hi-ui/hiui'

import colors from '../../commons/colors'

import './index.scss'

const { Row, Col } = Grid
export default class ListFlowCard extends Component {
  state = {
    searchValue: '',
    flowInfos: []
  }

  async componentDidMount() {
    const {
      data: {
        data: { flowInfos = [] }
      }
    } = await Axios.get('http://mock.be.mi.com/mock/2532/list/flowCard/info')
    this.setState({ flowInfos })
  }

  // 渲染顶部搜索栏
  renderTopPart = () => {
    const { searchValue } = this.state
    return (
      <div className='top-part-container'>
        <span className='top-part-title'>任务管理</span>
        <div className='top-part-function-container'>
          <Input
            style={{ width: '259px' }}
            value={searchValue}
            append={
              /* 搜索功能可以前端实现也可以后端实现，根据实际场景而定 */
              <Button style={{ borderLeft: '1px solid ' + colors.border }}>
                <Icon name='search' style={{ fontSize: 16 }} />
              </Button>
            }
            onChange={event => {
              this.setState({
                searchValue: event.target.value
              })
            }}
            placeholder='请输入搜索关键词'
          />
          {/* 新建功能也需要自行拓展定义 */}
          <Button type='primary' className='add-new-button'>
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
        title: '启动阶段',
        content: '明确项目目标和愿景'
      },
      {
        title: '计划阶段',
        content: '项目进行中遇到的问题'
      },
      {
        title: '执行阶段',
        content: '项目过程中每个环节记录'
      },
      {
        title: '维护阶段',
        content: '借助项目记录了解项目'
      }
    ]
    return (
      <div className='stepper-container'>
        {/* 此处只为展示用法，故而current固定住了，应用中应该是动态的，其为数组下标 */}
        <Stepper data={data} current={0} itemLayout='vertical' />
      </div>
    )
  }

  renderFlowCards = () => {
    const { flowInfos } = this.state

    const renderStepLines = () => {
      const lines = []
      for (let index = 0; index < 4; index++) {
        const lineInfo = flowInfos.filter(item => item.stepId === index)
        const line = (
          <Col key={index} span={6} gutter>
            {lineInfo.map(({ id, title, detail }) => {
              return (
                <div className='card-container'>
                  <Card
                    title={title}
                    key={id}
                    extra={
                      <span>
                        {/* 功能按钮需用户自己去定制，调用后端接口和后续前端操作 */}
                        <Icon className='card-function-button' name='delete' />
                        <Icon
                          className='card-function-button'
                          name='ellipsis'
                        />
                      </span>
                    }
                  >
                    <p className='card-detail'>{detail}</p>
                  </Card>
                </div>
              )
            })}
          </Col>
        )
        lines.push(line)
      }
      return lines
    }

    return <Row gutter>{renderStepLines()}</Row>
  }

  render() {
    return (
      <div className='page page--list-flow-card'>
        {this.renderTopPart()}
        {this.renderStepper()}
        {this.renderFlowCards()}
      </div>
    )
  }
}
