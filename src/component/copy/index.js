import React, { Component } from 'react'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { docco } from 'react-syntax-highlighter/dist/styles/hljs'
import { Modal, Menu, Button, Icon, Tooltip, Notification } from '@hi-ui/hiui'
import './style/index.scss'

export default class Copy extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      selectedKey: '0',
      cssCode: '',
      jsCode: ''
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

    axios
      .get(
        `https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template/${pathname}/index.js`
      )
      .then(ret => {
        this.setState({ jsCode: ret.data })
      })
    axios
      .get(
        `https://raw.githubusercontent.com/hiui-group/hiui-template/master/src/template/${pathname}/index.scss`
      )
      .then(ret => {
        this.setState({ cssCode: ret.data })
      })
      .catch(() => {
        console.log(`no css code`)
      })
  }

  getTabs (cssCode) {
    return cssCode ? [{ id: '0', content: 'js 代码' }, { id: '1', content: 'scss 代码' }] : [{ id: '0', content: 'js 代码' }]
  }

  closeModal () {
    this.setState({ showModal: false, jsCode: '', cssCode: '', selectedKey: '0' })
  }

  render () {
    const { showModal, jsCode, cssCode, selectedKey } = this.state
    return (
      <React.Fragment>
        <div className='copy-container'>
          <div className='copy' onClick={this.showModal}>
            <Icon name='tool' />
          </div>
        </div>
        <Modal
          className='code-modal'
          title={
            <React.Fragment>
              <span>复制代码&nbsp;&nbsp;</span>
              <Tooltip title='点击复制按钮复制代码至你现有的项目中'>
                <Icon name='problem-circle-o' />
              </Tooltip>
            </React.Fragment>
          }
          size='large'
          visible={showModal}
          onCancel={this.closeModal.bind(this)}
          footer={[
            <Button type='default' onClick={this.closeModal.bind(this)} key='close'>
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
              key='copy'
            >
              <Button type='primary'>复制</Button>
            </CopyToClipboard>
          ]}
        >
          <Menu
            data={this.getTabs(cssCode)}
            placement='horizontal'
            className='menus'
            activeId={selectedKey}
            onClick={(id, prevId) => this.setState({selectedKey: id.toString()})}
            onClickSubMenu={index => console.log('-----onClickSubMenu', index)}
          />
          <div className='code-container'>
            {selectedKey === '0' && (
              <SyntaxHighlighter language='jsx' style={docco}>
                {jsCode}
              </SyntaxHighlighter>
            )}
            {selectedKey === '1' && (
              <SyntaxHighlighter language='scss' style={docco}>
                {cssCode}
              </SyntaxHighlighter>
            )}
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}
