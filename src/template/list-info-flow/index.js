import React, { Component } from 'react'
import ListItem from './components/ListItem'
import { Input, Icon, Button } from '@hi-ui/hiui'
import './index.scss'

const listData = [
  {
    title: '下单量-指标',
    content:
      '下单量是在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量…',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '如何使用下单指标生成报表-wiki',
    content:
      '根据算法生成，这样就是动态的策略下单实现交易接口，没有指定交易账号也没有登录过程是如何实现通达信股票分期进入市…',
    extraInfo: '部门：信息部 发布者：周文'
  },
  {
    title: '下单趋势分析-数据看板',
    content: '下单趋势分析，2018-09～2019-02，部门：信息部',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '下单量-指标',
    content:
      '下单量是在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中…',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '如何使用下单指标生成报表-wiki',
    content:
      '量是在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量…',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '下单量-指标',
    content:
      '根据算法生成，这样就是动态的策略下单实现交易接口，没有指定交易账号也没有登录过程是如何实现通达信股票分期进入市…',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '下单量-指标',
    content:
      '量是在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量…',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '如何使用下单指标生成报表-wiki',
    content:
      '量是在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量…',
    extraInfo: '最新查看：2018.02.21'
  },
  {
    title: '下单趋势分析-数据看板',
    content:
      '量是在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量在交易环节中整体用户下单的数量…',
    extraInfo: '最新查看：2018.02.21'
  }
]

export default class ListInfoFlow extends Component {
  state = {
    value: '下单'
  }
  render () {
    const { value } = this.state
    return (
      <div className='page--list-flow'>
        <div className='page--list-header'>
          搜索中心
          <div>
            <Input
              style={{ width: '259px' }}
              value={value}
              append={
                <Button className='search-btn'>
                  <Icon name='search' />
                </Button>
              }
              onChange={event => {
                this.setState({
                  value: event.target.value
                })
              }}
              placeholder='搜索'
            />
          </div>
        </div>
        <div className='page--list-container'>
          {listData.map((item, index) => (
            <ListItem item={item} key={index} highlightValue={value} />
          ))}
        </div>
      </div>
    )
  }
}
