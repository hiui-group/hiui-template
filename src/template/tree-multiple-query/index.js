import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@hi-ui/hiui/es/button'
import Tree from '@hi-ui/hiui/es/tree'
import Grid from '@hi-ui/hiui/es/grid'
import { DataFilter } from '../../component/data-filter'
import '@hi-ui/hiui/es/table/style/index.css'
import Icon from '@hi-ui/hiui/es/icon'
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
      currentChose: [],
      reset: true,
      treeData: [
        { id: 1,
          title: '小米',
          children: [
            { id: 2,
              title: '技术',
              children: [
                { id: 3, title: '后端' },
                { id: 4, title: '运维' },
                { id: 5, title: '前端' }
              ]
            },
            { id: 6, title: '产品' }
          ]
        }]
    }
  }

  reset () {
    this.setState({
      reset: false,
      currentChose: []
    }, () => {
      this.setState({
        reset: true
      })
    })
  }

  onChange (value) {
    const { currentChose } = this.state

    let tempArr = currentChose
    const mapToPush = data => {
      if (tempArr.indexOf(data.id) >= 0) {
        tempArr = tempArr.splice(tempArr.indexOf(data.id), 1)
      } else {
        tempArr.push(data.id)
      }
      if (data.children) {
        data.children.map(item => {
          mapToPush(item)
        })
      }
    }

    const treeData = [ ...this.state.treeData ]

    const mapToGet = (data, currentChose) => {
      data.map(item => {
        if (item.children) {
          let allIn = true

          item.children.map(child => {
            if (currentChose.indexOf(child.id) < 0) {
              allIn = false
            }
          })

          if (allIn && currentChose.indexOf(item.id) < 0) {
            currentChose.push(item.id)
          }
          mapToGet(item.children, currentChose)
        }
      })
    }

    mapToPush(value)
    mapToGet(treeData, currentChose)
    this.setState({ currentChose: tempArr })
  }

  renderTree () {
    return (
      <div className='hi-tree__container'>
        {this.state.reset && <Tree
          defaultExpandAll
          checkable
          data={this.state.treeData}
          onChange={this.onChange.bind(this)}
          openIcon='down'
          closeIcon='up'
        />}
      </div>
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const {
      pageSize,
      currentChose
    } = this.state
    const params = {
      pageSize
    }
    const forms = {
      column1: currentChose.join('-')
    }

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={24}>

            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`}
              params={params}
              columnMixins={this.columnMixins}
              vertical
              verticalWidth='200px'
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary'>
                    <Icon name='plus' />
                  </Button>
                </Link>,
                <Button type='line' onClick={() => {
                  console.log('------------click download')
                }}>
                  <Icon name='download' />
                </Button>,
                <Button type='line' onClick={() => {
                  console.log('------------click share')
                }}>
                  <Icon name='mark' />
                </Button>,
                <Button type='line' onClick={() => {
                  console.log('------------click more')
                }}>
                  <Icon name='more' />
                </Button>
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
