import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import './style/action.scss'

export default class Action extends Component {
  static propTypes = {
    type: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ])
  }

  static defaultProps = {
    type: ''
  }

  actions = {
    'search': {
      icon: 'search'
    }, 
    'add': {
      icon: 'plus'
    }, 
    'download': {
      icon: 'download'
    }, 
    'share': {
      icon: 'mark'
    }, 
    'more': {
      icon: 'more'
    }
  }

  constructor(props) {
    super(props)
  }

  renderAction(type) {
    return (
      <div className="hi-tpl__action">
        <Button type="line">
          <Icon name={this.actions[type].icon} />
        </Button>
      </div>
    )
  }

  render() {
    if (!this.props.type) {
      return null
    }

    return this.renderAction(this.props.type)
  }
}