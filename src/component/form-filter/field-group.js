import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '@hi-ui/hiui/es/icon'
import Modal from '@hi-ui/hiui/es/modal'
import './style/field-group.scss'

export default class FieldGroup extends Component {
  static propTypes = {
    main: PropTypes.bool
  }

  static defaultProps = {
    main: false
  }

  constructor(props) {
    super(props)
  }

  renderManage() {
    if (this.props.main) {
      return (
        <div 
          className="hi-field-group__manage"
        >
          <Icon name="set" />
            管理
        </div>
      )
    }
  }

  render() {
    const {
      children,
      main
    } = this.props

    return (
      <div className="hi-field-group" >
        <div className="hi-field-group__fields">
          {children}
        </div>
        { main && this.renderManage() }
        {
          main &&
          <Modal />
        }
      </div>
    )
  }
}