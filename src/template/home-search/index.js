import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import axios from 'axios'
import Card from '@hi-ui/hiui/es/card'
import './index.scss'

const { Row, Col } = Grid

class HomeSearch extends Component {
  constructor (props) {
    super(props)
    this.data1 = [
      { title: '常用' },
      { title: '我的' }
    ]
    this.state = {
      background: '',
      currentTab: 0
    }
  }

  componentDidMount () {
    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'ea9a746cdb6f471c2e51d359da17a34e7478a0b64774b07027ecf7d7cfd9ab45',
          orientation: 'landscape'
        }
      })
      .then(ret => {
        if (ret.data && ret.status === 200) {
          let img = ret.data.urls.regular
          this.setState({ background: img })
        } else {
          this.setState({ background: 'https://images.unsplash.com/photo-1495511167051-13bb07bde85b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' })
        }
      })
  }

  renderRegularTab () {
    let tabList = [{
      title: '福利介绍',
      desc: '福利介绍',
      color: '#529DFD'
    }, {
      title: '职场介绍',
      desc: '职场介绍',
      color: '#FF6633'
    }, {
      title: 'HR系统',
      desc: 'HR系统',
      color: '#31CCAC'
    }, {
      title: '会议室预定',
      desc: '会议室预定',
      color: '#D26AEB'
    }]

    tabList = tabList.map((item, i) => {
      return <Col key={i} span={6}>
        <Card hoverable style={{
          borderLeft: `2px solid ${item.color}`
        }}>
          <p className='short--cut__title'>{item.title}</p>
          <p>{item.desc}</p>
        </Card>
      </Col>
    })

    return tabList
  }

  renderMineTab () {
    let tabList = [{
      title: '职场晋升',
      desc: '职场晋升',
      img: '/hiui-template/static/职场晋升.png'
    }, {
      title: '360评估',
      desc: '360评估',
      img: '/hiui-template/static/360评估.png'
    }, {
      title: 'E-HR',
      desc: 'E-HR',
      img: '/hiui-template/static/E-HR.png'
    }, {
      title: 'HR 报表',
      desc: 'HR 报表',
      img: '/hiui-template/static/HR 报表.png'
    }, {
      title: '海外派驻',
      desc: '海外派驻',
      img: '/hiui-template/static/海外派驻.png'
    }, {
      title: '培训平台',
      desc: '培训平台',
      img: '/hiui-template/static/培训平台.png'
    }]

    tabList = tabList.map((item, i) => {
      return <Col key={i} span={8}>
        <Card hoverable>
          <img src={item.img} alt={item.title} className='mine-info-icon' />
          <div className='left-content'>
            <p className='short--cut__title'>{item.title}</p>
            <p>{item.desc}</p>
          </div>
        </Card>
      </Col>
    })

    return tabList
  }

  render () {
    return (
      <div className='page page--search' style={{ backgroundImage: 'url(' + this.state.background + ')' }}>
        <div className='search-box' >
          <Row justify='center'>
            <h3 className='search-guide'>Sologn引导文案</h3>
          </Row>
          <Row className='search-input'>
            <Col>
              <Input
                style={{ width: '475px' }}
                append={<Button className='search-btn'><Icon name='search' /></Button>}
                placeholder='关键词搜索'
              />
            </Col>
          </Row>
          <Row justify='center'>
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
            selectedKey={this.state.currentTab}
            data={this.data1}
            onClick={(_, idx) => {
              this.setState({
                currentTab: parseInt(idx)
              })
            }}
          />
          <div className='tab-content'>
            {this.state.currentTab === 0 ? <Row gutter justify='space-between'>{this.renderRegularTab()}</Row>
              : <Row gutter justify='space-between' className='mine-tab'>{this.renderMineTab()}</Row>}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeSearch
