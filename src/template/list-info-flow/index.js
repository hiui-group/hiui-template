import React, { Component } from 'react'
import ListItem from './components/ListItem'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'

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
    highlightValue: '',
    value: ''
  }
  render() {
    const { value, highlightValue } = this.state
    console.log('123', value, highlightValue)
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px 24px',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <div style={{ flex: '0 0 auto', fontSize: '18px', fontWeight: 600 }}>搜索中心</div>
          <div style={{ width: 271 }}>
            <Input
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
              append={
                <Button
                  type="line"
                  icon="search"
                  onClick={() => {
                    this.setState({
                      highlightValue: value
                    })
                  }}
                />
              }
            />
          </div>
        </div>
        <div
          style={{
            padding: 24
          }}
        >
          {listData.map((item, index) => (
            <ListItem item={item} key={index} highlightValue={highlightValue} />
          ))}
        </div>
      </div>
    )
  }
}
