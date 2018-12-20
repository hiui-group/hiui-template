import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tree from '@hi-ui/hiui/es/tree'
import Button from '@hi-ui/hiui/es/button'
import Grid from '@hi-ui/hiui/es/grid'
import { DataFilter } from '../../component/data-filter'
import '@hi-ui/hiui/es/table/style/index.css'
import Icon from '@hi-ui/hiui/es/icon'
import config from '../../config'
import '../content.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.columnMixins = {
      column1: {
        sorter (pre, next) {
          return pre.column1 - next.column1
        }
      },
      action: {
        render: () => (
          <React.Fragment>
            <Icon name='edit' />
            <Icon name='close' />
            <Icon name='more' />
          </React.Fragment>
        )
      }
    }

    this.state = {
      pageSize: 10,
      currentTree: '',

      treeData: [
        { id: '小米',
          title: '小米',
          children: [
            { id: '技术',
              title: '技术',
              children: [
                { id: '后端', title: '后端', onClick: () => { this.onTreeClick('后端') } },
                { id: '运维', title: '运维', onClick: () => { this.onTreeClick('运维') } },
                { id: '前端', title: '前端', onClick: () => { this.onTreeClick('前端') } }
              ]
            },
            { id: '产品', title: '产品', onClick: () => { this.onTreeClick('产品') } }
          ]
        }]
    }
  }

  onTreeClick (id) {
    const treeData = [...this.state.treeData]
    let hasGet = false

    const mapToGet = (data, id) => {
      data.map(item => {
        if (item.id === id) {
          hasGet = true
          item.style = { color: '#4284f5' }
        } else if (item.style) {
          item.style = null
        }
        if (item.children && !hasGet) {
          mapToGet(item.children, id)
        }
      })
    }

    mapToGet(treeData, id)

    this.setState({
      treeData
    })

    this.setState({ currentTree: id }, () => {
      this.dataFilter.submit({ column1: id })
    })
  }

  renderTree () {
    return (
      <Tree
        defaultExpandAll
        data={this.state.treeData}
        defaultCheckedKeys={[2]}
        onNodeToggle={(data, isExpanded) => { console.log('toggle: data isExpanded', data, isExpanded) }}
        onChange={data => { console.log('Tree data:', data) }}
        openIcon='down'
        closeIcon='up'
      />
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const {
      forms,
      pageSize
    } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={24}>
            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`${config('host')}/table/get-datas`}
              params={params}
              columnMixins={this.columnMixins}
              vertical
              verticalWidth='215px'
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary' icon='plus' />
                </Link>,
                <Button type='line' icon='download' onClick={() => {
                  console.log('------------click download')
                }} />,
                <Button type='line' icon='mark' onClick={() => {
                  console.log('------------click share')
                }} />,
                <Button type='line' icon='more' onClick={() => {
                  console.log('------------click more')
                }} />
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
