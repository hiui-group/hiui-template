import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import QueryTool from './tools/query'
import FilterTool from './tools/filter'
import FilterRowHeight from './tools/row-height'
import Action from './action'
import './style/form-filter.scss'

export default class FormFilter extends Component {
  toolsMap = {
    'query': {
      icon: 'approve',
      title: '查询'
    }, 
    'filter': {
      popper: true,
      icon: 'label',
      title: '筛选'
    }, 
    'row-height': {
      popper: true,
      icon: 'phone',
      title: '行高'
    }, 
    'column': {
      popper: true,
      icon: 'phone',
      title: '列显示'
    }, 
    'statistics': {
      popper: true,
      icon: 'linechart',
      title: '统计'
    }
  }

  static propTypes = {
    canSubmit: PropTypes.bool,
    beforeSubmit: PropTypes.func,
    Map: PropTypes.array,
    actions: PropTypes.array
  }

  static defaultProps = {
    beforeSubmit: () => true,
    canSubmit: true,
    actions: [ 'search', 'add', 'download', 'share', 'more' ],
    tools: [ 'query', 'filter', 'row-height', 'column', 'statistics' ]
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTool: 'query',
      value: {
        data: {},
        'row-height': 'middle'
      }
    }
  }

  getChildContext () {
    return {
      component: this
    }
  }

  onChange(options) {
    const value = Object.assign({}, this.state.value, options)

    this.setState({value}, () => {
      this.props.onChange(value)
    })
  }

  renderActions() {
    const {
      actions,
      title
    } = this.props

    return (
      <div className="hi-form-filter__actions">
        <div className="hi-form-filter__title">
          {title}
        </div>
        <div className="hi-form-filter__actions--container">
          {
            actions.map((action, index) => (
              <Action type={action} key={index} />
            ))
          }
        </div>
      </div>
    )
  }

  setActiveTool(activeTool) {
    const _activeTool = this.state.activeTool===activeTool ? '' : activeTool

    this.setState({
      activeTool: _activeTool
    })
  }

  renderTools() {
    const {
      tools
    } = this.props
    const {
      activeTool
    } = this.state

    return (
      <div className="hi-form-filter__tools">
        {
          tools.map((type, index) => {
            const tool = this.toolsMap[type]
            const active = type===activeTool

            return (
              <div 
                className={classNames('hi-form-filter__tool', {'hi-form-filter__tool--active': active})}
                key={index}
              >
                <div 
                  className="hi-form-filter__tool--title"
                  onClick={() => this.setActiveTool(type)}
                >
                  <Icon name={tool.icon} />
                  {tool.title && tool.title}
                </div>
                {
                  active && tool.popper &&
                  <div className="hi-form-filter__tool--content">
                    {this.renderToolContent(type)}
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  renderToolContent(type) {
    if (type === 'query') {
      return <QueryTool/>
    } else if (type === 'filter') {
      return <FilterTool/>
    } else if (type === 'row-height') {
      return <FilterRowHeight/>
    }
  }

  renderForm() {
    const {
      children,
      canSubmit
    } = this.props
    
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
            <Button>
            取消
            </Button>
          </div>
        </div>
      
        <div className="hi-form-filter__form--right">
          <Icon name="set" />
          管理
        </div>
      </div>
    )
  }

  render() {
    const {
      activeTool
    } = this.state

    return (
      <div className="hi-form-filter">
        {this.renderActions()}
        {this.renderTools()}
        { activeTool==='query' && this.renderToolContent(activeTool) }
      </div>
    )
  }
}

FormFilter.childContextTypes = {
  component: PropTypes.any
}