import React, { Component } from 'react'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { docco } from 'react-syntax-highlighter/dist/styles/hljs'
import Modal from '@hi-ui/hiui/es/modal'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import { handleNotificate } from '@hi-ui/hiui/es/notification'
import './style/index.scss'

export default class Copy extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      selectedKey: 0,
      cssCode: '',
      jsCode: ''
    }
  }

  showModal () {
    this.setState({ showModal: true })
    const pathname = window.location.hash.replace(/#?(.*)/, (a, b) => {
      return b
    })

    axios
      .get(
        `https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template${pathname}/index.js`
      )
      .then((ret) => {
        this.setState({ jsCode: ret.data })
      })
    axios
      .get(
        `https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template${pathname}/index.scss`
      )
      .then((ret) => {
        this.setState({ cssCode: ret.data })
      })
      .catch(() => {
        console.log(`no css code`)
      })
  }

  getTabs (cssCode) {
    return cssCode
      ? [{ title: 'js 代码' }, { title: 'css 代码' }]
      : [{ title: 'js 代码' }]
  }

  closeModal () {
    this.setState({ showModal: false, jsCode: '', cssCode: '', selectedKey: 0 })
  }

  render () {
    const { showModal, jsCode, cssCode, selectedKey } = this.state

    return (
      <React.Fragment>
        <div className='copy-container'>
          <div className='copy' onClick={() => this.showModal()}>
            <Icon name='copy' />
          </div>
        </div>
        <Modal
          className='code-modal'
          title='复制代码'
          size='large'
          show={showModal}
          onCancel={this.closeModal.bind(this)}
          footers={[
            <Button
              type='default'
              onClick={this.closeModal.bind(this)}
              key='close'
            >
              关闭
            </Button>,
            <CopyToClipboard
              text={selectedKey === 0 ? jsCode : cssCode}
              onCopy={() => {
                handleNotificate({
                  type: 'success',
                  showClose: false,
                  autoClose: true,
                  message: '复制成功'
                })
              }}
              key='copy'
            >
              <Button type='primary'>复制</Button>
            </CopyToClipboard>
          ]}
        >
          <NavMenu
            data={this.getTabs(cssCode)}
            selectedKey={selectedKey}
            onClick={(_, key) => {
              this.setState({
                selectedKey: parseInt(key)
              })
            }}
          />
          {selectedKey === 0 && (
            <SyntaxHighlighter language='jsx' style={docco}>
              {jsCode}
            </SyntaxHighlighter>
          )}
          {selectedKey === 1 && (
            <SyntaxHighlighter language='scss' style={docco}>
              {cssCode}
            </SyntaxHighlighter>
          )}
        </Modal>
      </React.Fragment>
    )
  }
}
