import React, { Component } from 'react'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { docco } from 'react-syntax-highlighter/dist/styles/hljs'
import Modal from '@hi-ui/hiui/es/modal'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import { handleNotificate } from '@hi-ui/hiui/es/notification'
import './style/index.scss'

export default class Copy extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      code: ''
    }
  }

  showModal () {
    this.setState({ showModal: true })
    const pathname = window.location.hash.replace(/#?(.*)/, (a, b) => {
      return b
    })

    axios.get(`https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template${pathname}/index.js`, {
    }).then(ret => {
      this.setState({ code: ret.data })
    })
  }

  closeModal () {
    this.setState({ showModal: false, code: '' })
  }

  render () {
    const {
      showModal,
      code
    } = this.state

    return (
      <React.Fragment>
        <div className='copy-container'>
          <div className='copy' onClick={() => this.showModal()}>
            <Icon name='copy' style={{ color: '#4284F5', fontSize: '24px' }} />
          </div>
        </div>
        <Modal
          className='code-modal'
          title='复制代码'
          size='large'
          show={showModal}
          onCancel={this.closeModal.bind(this)}
          footers={[
            <Button type='default' onClick={this.closeModal.bind(this)} key="close">关闭</Button>,
            <CopyToClipboard text={code} onCopy={() => {
              handleNotificate({ type: 'success', showClose: false, autoClose: true, message: '复制成功' })
            }} key="copy">
              <Button type='primary'>复制</Button>
            </CopyToClipboard>
          ]}
        >
          <SyntaxHighlighter language='javascript' style={docco}>{code}</SyntaxHighlighter>
        </Modal>
      </React.Fragment>
    )
  }
}
