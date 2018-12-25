import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import './index.scss'

const { Row, Col } = Grid

class HomeSearch extends Component {
  constructor (props) {
    super(props)
    this.data1 = [
      { title: '常用' },
      { title: '热门' },
      { title: '我的' }
    ]
  }

  renderTab () {
    let tabList = []
    for (let i = 0; i < 4; i++) {
      tabList.push(
        <Col key={i}>
          <div className='tab-item'>
            <div className='title'>标题</div>
            <p className='detail'>功能简介</p>
          </div>
        </Col>
      )
    }
    return tabList
  }

  render () {
    return (
      <div className='content'>
        <div className='search-box'>
          <Row justify='center'>
            <Col><span className='search-guide'>Sologn引导文案</span></Col>
          </Row>
          <Row>
            <Col>
              <Input placeholder='Search' style={{ width: '400px' }} />
              <Button><Icon name='search' style={{ color: '#4284F5' }} /></Button>
            </Col>
          </Row>
          <Row>
            <Col>热词：</Col>
            <Col>
              <span className='search-hot'>关键词</span>
              <span className='search-hot'>关键词</span>
              <span className='search-hot'>关键词</span>
              <span className='search-hot'>关键词</span>
            </Col>
          </Row>
        </div>
        <div className='tab-box'>
          <NavMenu
            selectedKey={0}
            data={this.data1}
          />
          <div className='tab-content'>
            <Row justify='space-between'>{this.renderTab()}</Row>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeSearch
