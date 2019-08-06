import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DataFilter } from '@hi-ui/component-kit/es/data-filter'
import '@hi-ui/hiui/es/table/style/index.css'
import { Tree, Button, Grid } from '@hi-ui/hiui'
import './index.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.columnMixins = {}

    this.state = {
      pageSize: 10,
      currentTree: '',

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

  onTreeClick (item) {
    let itemName = []

    const mapToGet = (list, parent = {}) => {
      list.map(item => {
        if (item.children) {
          mapToGet(item.children, item)
        } else {
          itemName.push(item)
        }
      })
    }
    if (item.children) {
      mapToGet(item.children)
    }

    let activeId = ''

    if (itemName.length) {
      let itemId = []
      itemName.forEach(item => {
        itemId.push(item.id)
      })

      activeId = itemId.join(',')
    } else {
      activeId = item.id
    }

    this.setState({ currentTree: activeId }, () => {
      this.dataFilter.submit({ id: activeId })
    })
  }

  renderTree () {
    return (
      <Tree
        defaultExpandAll
        data={this.state.treeData}
        defaultCheckedKeys={[2]}
        onNodeToggle={(data, isExpanded) => {
          console.log('toggle: data isExpanded', data, isExpanded)
        }}
        onChange={data => {
          console.log('Tree data:', data)
        }}
        openIcon='down'
        closeIcon='up'
        onNodeClick={item => {
          this.onTreeClick(item)
        }}
      />
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms, pageSize } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page--tree-single-query'>
        <Row>
          <Col span={24}>
            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/tree`}
              params={params}
              columnMixins={this.columnMixins}
              vertical
              verticalWidth='215px'
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
                  submit: false,
                  onCancel: () => {
                    this.updateForm(this.initForms())
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
