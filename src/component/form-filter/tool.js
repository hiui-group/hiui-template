import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '@hi-ui/hiui/es/icon'
import './style/tool.scss'

export default class Tool extends Component {
  static propTypes = {
    type: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ])
  }

  static defaultProps = {
    type: ''
  }

  constructor(props) {
    super(props)
  }

  tools = {
    'query': {
      icon: 'approve',
      title: '查询'
    }, 
    'filter': {
      icon: 'label',
      title: '筛选'
    }, 
    'line-height': {
      icon: 'phone',
      title: '行高'
    }, 
    'column': {
      icon: 'phone',
      title: '列显示'
    }, 
    'statistics': {
      icon: 'linechart',
      title: '统计'
    }
  }

  handleClick(type) {
    this.props.setActiveTool(type)
  }

  renderTool(type) {
    const tool = this.tools[type]

    return (
      <div 
        className={classNames('hi-form-filter__tool', this.props.className, {'hi-form-filter__tool--active': this.props.active})}
        onClick={() => this.handleClick(type)}
      >
        <div type="line">
          <Icon name={tool.icon} />
          {tool.title && tool.title}
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.type) {
      return null
    }

    return this.renderTool(this.props.type)
  }
}