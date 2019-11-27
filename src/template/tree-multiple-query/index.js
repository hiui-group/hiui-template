import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tree, Grid } from '@hi-ui/hiui'
import { DataFilter } from '@hi-ui/component-kit/es/data-filter'
import '@hi-ui/hiui/es/table/style/index.css'
import './index.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.columnMixins = {}

    this.state = {
      pageSize: 10,
      currentChose: [],
      reset: true,
      treeData: [
        {
          sku: 66808,
          title: '手机',
          id: 1,
          children: [
            {
              sku: 53631,
              id: 2,
              title: '小米手机',
              children: [
                {
                  sku: 52577,
                  id: 3,
                  title: '小米5S',
                  children: [
                    {
                      sku: 66463,
                      id: 4,
                      title: '小米手机5s 高配全网通版'
                    }
                  ]
                },
                {
                  sku: 85250,
                  id: 5,
                  title: '小米6',
                  children: [
                    {
                      sku: 47709,
                      id: 6,
                      title: '小米6 全网通版'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          sku: 18562,
          id: 7,
          title: '电视',
          children: [
            {
              sku: 73687,
              id: 8,
              title: '小米电视3s'
            },
            {
              sku: 21284,
              id: 9,
              title: '小米电视4'
            }
          ]
        },
        {
          sku: 89858,
          id: 10,
          title: '生态链及其他',
          children: [
            {
              sku: 43975,
              id: 11,
              title: '路由器',
              children: [
                {
                  sku: 31163,
                  id: 12,
                  title: '小米路由器',
                  children: [
                    {
                      sku: 77421,
                      id: 13,
                      title: '小米路由器 青春版 黑色'
                    }
                  ]
                }
              ]
            },
            {
              sku: 31338,
              id: 14,
              title: '其他',
              children: [
                {
                  sku: 68829,
                  id: 15,
                  title: '小米圆领纯色T恤 '
                }
              ]
            }
          ]
        }
      ]
    }
  }

  reset () {
    this.setState(
      {
        reset: false,
        currentChose: [],
        activeId: ''
      },
      () => {
        this.dataFilter.submit({})
        this.setState({
          reset: true
        })
      }
    )
  }

  onChange (checkedKeys) {
    this.setState({
      currentChose: checkedKeys,
      activeId: checkedKeys.join(',')
    })
  }

  renderTree () {
    return (
      <div className='hi-tree__container'>
        {this.state.reset && this.state.treeData.length && (
          <Tree
            defaultExpandAll
            checkable
            data={this.state.treeData}
            onChange={checkedKeys => {
              this.onChange(checkedKeys)
            }}
            checkedIds={this.state.currentChose}
          />
        )}
      </div>
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { pageSize, activeId } = this.state
    const params = {
      pageSize,
      id: activeId
    }
    const forms = {}

    return (
      <div className='page--tree-multiple-query'>
        <Row>
          <Col span={24}>
            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`http://yapi.demo.qunar.com/mock/26534/hiui/tree-table`}
              params={params}
              columnMixins={this.columnMixins}
              vertical
              verticalWidth='200px'
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary' icon='plus' />
                </Link>,
                <Button
                  type='line'
                  icon='download'
                  onClick={() => {
                    console.log('------------click download')
                  }}
                />,
                <Button
                  type='line'
                  icon='mark'
                  onClick={() => {
                    console.log('------------click share')
                  }}
                />,
                <Button
                  type='line'
                  icon='more'
                  onClick={() => {
                    console.log('------------click more')
                  }}
                />
              ]}
              activeTools={['query']}
              tools={[
                {
                  type: 'query',
                  forms,
                  onCancel: () => {
                    this.reset()
                  }
                }
              ]}
            >
              {this.renderTree()}
            </DataFilter>
          </Col>
        </Row>
      </div>
    )
  }
}
