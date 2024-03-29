import React, { Component } from 'react'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { docco } from 'react-syntax-highlighter/dist/styles/hljs'
import { Drawer, Menu, Button, Icon, Tooltip, Notification } from '@hi-ui/hiui'
import { localStorage } from '../../utils'

import './style/index.scss'

// const CODE_PATH = 'https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template'
const CODE_PATH = 'https://raw.githubusercontent.com/hiui-group/hiui-template/feature/refactor-for-v3/src/template'

export default class Copy extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      selectedKey: '0',
      cssCode: '',
      jsCode: '',
      componentsInfo: []
    }
  }

  showModal = () => {
    this.setState({ showModal: true })
    let pathname = window.location.href.split('/').pop()

    if (pathname.includes('#')) {
      pathname = pathname.split('#')[0]
    }
    if (!pathname || pathname === '/') {
      pathname = '/home-dashboard'
    }

    axios.get(`${CODE_PATH}/${pathname}/index.js`).then(ret => {
      this.setState({ jsCode: ret.data })
    })
    axios
      .get(`${CODE_PATH}/${pathname}/index.scss`)
      .then(ret => {
        this.setState({ cssCode: ret.data })
      })
      .catch(() => {
        console.log(`no css code`)
      })
    this.getComponentCode(pathname)
  }

  getComponentCode = async pathname => {
    const componentPaths = localStorage.getItem('pageComponentpaths')[pathname]
    if (!componentPaths || !componentPaths.length) {
      this.setState({
        componentsInfo: []
      })
      return
    }
    const componentsInfo = []

    for (let i = 0; i < componentPaths.length; i++) {
      const compPath = componentPaths[i]
      const { data } = (await axios.get(`${CODE_PATH}/${pathname}/${compPath}`)) || {}
      componentsInfo.push({
        compPath,
        code: data || '空',
        type: compPath.endsWith('.scss') ? 'scss' : 'jsx'
      })
    }
    this.setState({
      componentsInfo
    })
  }

  getTabs(cssCode) {
    return cssCode
      ? [
          { id: '0', content: 'js 代码' },
          { id: '1', content: 'scss 代码' }
        ]
      : [{ id: '0', content: 'js 代码' }]
  }

  closeModal() {
    this.setState({ showModal: false, jsCode: '', cssCode: '', selectedKey: '0' })
  }

  render() {
    const { showModal, jsCode, cssCode, selectedKey, componentsInfo } = this.state
    const componentsItems = {
      id: 'components',
      content: 'components'
    }
    const compMenuDataList =
      componentsInfo.map(item => {
        return {
          id: item.compPath,
          content: item.compPath.replace('components/', '').replace('/index.', '.')
        }
      }) || []
    componentsItems.children = compMenuDataList
    const menuDataList = this.getTabs(cssCode).concat(compMenuDataList.length > 0 ? componentsItems : [])
    return (
      <React.Fragment>
        <div className="copy-container">
          <div className="copy" onClick={this.showModal}>
            <Icon name="tool" />
          </div>
        </div>
        <Drawer
          className="code-drawer"
          width={900}
          title={
            <div>
              <span>复制代码&nbsp;&nbsp;</span>
              <Tooltip title="点击复制按钮复制代码至你现有的项目中">
                <Icon name="problem-circle-o" />
              </Tooltip>
            </div>
          }
          size="large"
          visible={showModal}
          onClose={this.closeModal.bind(this)}
          footer={[
            <Button type="default" onClick={this.closeModal.bind(this)} key="close">
              关闭
            </Button>,
            <CopyToClipboard
              text={selectedKey === '0' ? jsCode : cssCode}
              onCopy={() => {
                Notification.open({
                  type: 'success',
                  title: '复制成功'
                })
              }}
              key="copy"
            >
              <Button type="primary">复制</Button>
            </CopyToClipboard>
          ]}
        >
          <Menu
            data={menuDataList}
            placement="vertical"
            className="menus"
            activeId={selectedKey}
            onClick={(id, prevId) => this.setState({ selectedKey: id.toString() })}
            onClickSubMenu={index => console.log('-----onClickSubMenu', index)}
          />
          <div className="code-container">
            {selectedKey === '0' && (
              <SyntaxHighlighter language="jsx" style={docco}>
                {jsCode}
              </SyntaxHighlighter>
            )}
            {selectedKey === '1' && (
              <SyntaxHighlighter language="scss" style={docco}>
                {cssCode}
              </SyntaxHighlighter>
            )}
            {componentsInfo
              .filter(item => item.compPath === selectedKey)
              .map(item => {
                return (
                  <SyntaxHighlighter language={item.type} style={docco}>
                    {item.code}
                  </SyntaxHighlighter>
                )
              })}
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}
