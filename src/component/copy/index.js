import React, { Component } from 'react'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { docco } from 'react-syntax-highlighter/dist/styles/hljs'
import { Modal, Menu, Button, Icon, Tooltip, Notification } from '@hi-ui/hiui'

import { localStorage } from '../../utils'

import './style/index.scss'

// const CODE_PATH = 'https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template'
const TEMP_CODE_PATH =
  'https://raw.githubusercontent.com/hiui-group/hiui-template/feature/refactor-for-v3_czd0218/src/template'
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
    let pathname = window.location.href.split('/')[3]

    if (pathname.includes('#')) {
      pathname = pathname.split('#')[0]
    }
    if (!pathname || pathname === '/') {
      pathname = '/home-dashboard'
    }

    axios.get(`${TEMP_CODE_PATH}/${pathname}/index.js`).then(ret => {
      this.setState({ jsCode: ret.data })
    })
    axios
      .get(`${TEMP_CODE_PATH}/${pathname}/index.scss`)
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
    console.log('componentPaths', componentPaths)
    if (!componentPaths || !componentPaths.length) {
      this.setState({
        componentsInfo: []
      })
      return
    }
    const componentsInfo = []

    for (let i = 0; i < componentPaths.length; i++) {
      const compPath = componentPaths[i]
      const code = await axios.get(`${TEMP_CODE_PATH}/${pathname}/${compPath}`)
      componentsInfo.push({
        compPath,
        code,
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
    const compMenuDataList =
      componentsInfo.map(item => {
        return {
          id: item.compPath,
          content: item.compPath
        }
      }) || []
    const menuDataList = this.getTabs(cssCode).concat(compMenuDataList)
    console.log('compMenuDataList', compMenuDataList)
    console.log('menuDataList', menuDataList)

    return (
      <React.Fragment>
        <div className="copy-container">
          <div className="copy" onClick={this.showModal}>
            <Icon name="tool" />
          </div>
        </div>
        <Modal
          className="code-modal"
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
          onCancel={this.closeModal.bind(this)}
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
            placement="horizontal"
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
        </Modal>
      </React.Fragment>
    )
  }
}
