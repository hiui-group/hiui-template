import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Action from './action'
import Tool from './tool'
import axios from 'axios'
import './style/form-filter.scss'

export default class FormFilter extends Component {
  static propTypes = {
    canSubmit: PropTypes.bool,
    beforeSubmit: PropTypes.func,
    tools: PropTypes.array,
    actions: PropTypes.array
  }

  static defaultProps = {
    beforeSubmit: () => true,
    canSubmit: true,
    actions: [ 'search', 'add', 'download', 'share', 'more' ],
    tools: [ 'form', 'filter', 'line-height', 'column', 'statistics' ]
  }

  constructor(props) {
    super(props)
  }

  renderActions() {
    const {
      actions,
      title
    } = this.props

    return (
      <div className="hi-tpl__actions">
        <div className="hi-tpl__title">
          {title}
        </div>
        <div className="hi-tpl__actions--container">
          {
            actions.map((action, index) => (
              <Action type={action} key={index} />
            ))
          }
        </div>
      </div>
    )
  }

  renderTools() {
    const {
      tools
    } = this.props

    return (
      <div className="hi-tpl__tools">
        {
          tools.map((tool, index) => (
            <Tool type={tool} key={index} />
          ))
        }
      </div>
    )
  }

  render() {
    const {
      children
    } = this.props

    return (
      <div className="hi-tpl">
        {this.renderActions()}
        {this.renderTools()}
        <div className="hi-tpl__form">
          <div className="hi-tpl__form--left">
            <div className="hi-tpl__form--fields">
              {children}
            </div>
            <div className="hi-tpl__form--actions">
              <Button>
                确定
              </Button>
              <Button>
                取消
              </Button>
            </div>
          </div>
          
          <div className="hi-tpl__form--right">
            <Icon name="set" />
              管理
          </div>
        </div>

      </div>
    )
  }
}