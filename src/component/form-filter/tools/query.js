import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Modal from '@hi-ui/hiui/es/modal'
import '../style/query.scss'

export default class QueryTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  static defaultProps = {
    canSubmit: true
  }

  parent () {
    return this.context.component
  }

  submit(can) {
    const {
      beforeSubmit,
      forms
    } = this.props

    if (!can || !beforeSubmit()) {
      return
    }
    const parent = this.parent()

    parent.fetchDatas(parent.props, forms)
  }

  render() {
    const parent = this.parent()
    const {
      children
    } = parent.props
    const {
      canSubmit,
      onCancel
    } = this.props
    const {
      showModal
    } = this.state

    return (
      <div className="hi-form-filter__form">
        <div className="hi-form-filter__form--left">
          <div className="hi-form-filter__form--fields">
            {children}
          </div>
          <div className="hi-form-filter__form--actions">
            <Button
              type={canSubmit ? 'primary' : 'default'}
              disabled={!canSubmit}
              onClick={() => this.submit(canSubmit)}
            >
            确定
            </Button>
            {
              onCancel &&
              <Button onClick={() => onCancel()}>
                取消
              </Button>
            }
          </div>
        </div>
      
        <div 
          className="hi-form-filter__form--right"
        >
          <Icon name="set" />
          管理
        </div>

        <Modal 
          title="提示消息"
          show={showModal}
          backDrop={true}
          onConfirm={() => { 
            console.log('自定义确定事件') 
          }}
        >
          <span>一些消息</span>
          <span>一些消息</span>
        </Modal>
      </div>
    )
  }
}

QueryTool.contextTypes = {
  component: PropTypes.any
}
