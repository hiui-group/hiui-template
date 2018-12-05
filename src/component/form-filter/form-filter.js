import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import QueryTool from './tools/query'
import FilterTool from './tools/filter'
import FilterRowHeight from './tools/row-height'
import FilterStatistics from './tools/statistics'
import FilterColumn from './tools/column'
import Action from './action'
import './style/form-filter.scss'

export default class FormFilter extends Component {
  forms = {}
  toolsMap = {
    'query': {
      type: 'query',
      icon: 'approve',
      title: '查询'
    }, 
    'filter': {
      type: 'filter',
      popper: true,
      icon: 'label',
      title: '筛选'
    }, 
    'row-height': {
      type: 'row-height',
      popper: true,
      icon: 'phone',
      title: '行高'
    }, 
    'column': {
      type: 'column',
      popper: true,
      icon: 'phone',
      title: '列显示'
    }, 
    'statistics': {
      type: 'statistics',
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
    tools: [ 'query', 'filter', 'row-height', 'column', 'statistics' ],
    columnMixins: [],
    columns: []
  }

  constructor(props) {
    super(props)

    this.state = {
      columns: this.mixinColumns(props.columns),
      filters: [],
      activeTool: 'query',
      value: {
        data: {},
        'row-height': 'middle',
        statistics: '',
        columns: []
      }
    }
  }

  componentDidMount() {
    if (this.props.columns.length > 0) {
      const columns = this.filterColumns(this.props.columns)

      this.props.setPageState({columns})
    }
    this.fetchDatas(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('------------componentWillReceiveProps', nextProps.params, this.props.params, isEqual(nextProps.params, this.props.params))
    if (!isEqual(nextProps.params, this.props.params)) {
      this.fetchDatas(nextProps)
    }
  }

  getChildContext () {
    return {
      component: this
    }
  }

  fetchDatas(props, forms={}) {
    const {
      params,
      url,
      setPageState
    } = props

    if (Object.keys(forms).length === 0) {
      this.forms = forms
    }

    axios.get(url, {
      params: {
        ...params,
        ...this.forms
      }
    }).then(ret => {
      if (ret && ret.data.code === 200) {
        const data = ret.data.data
        const state = {
          tableDatas: data.data,
          page: parseInt(data.pageInfo.page),
          total: parseInt(data.pageInfo.total),
          pageSize: parseInt(data.pageInfo.pageSize)
        }

        if (data.columns) {
          this.mixinColumns(data.columns, true)
          const columns = this.filterColumns()

          setPageState({columns, ...state})
        } else {
          setPageState(state)
        }
      }
    })
  }

  mixinColumns(columns, updateState=false) {
    const _columns = []

    columns.map(column => {
      const key = column.key

      _columns.push({
        ...column,
        ...this.props.columnMixins[key]
      })
    })

    updateState && this.setState({columns: _columns})

    return _columns
  }

  filterColumns() {
    const _columns = []

    this.state.columns.map(column => {
      if (column.display) {
        _columns.push({
          ...column
        })
      }
    })

    return _columns
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
          tools.map((item, index) => {
            let tool

            if (typeof item === 'string') {
              tool = this.toolsMap[item]
            } else if (typeof item === 'object') {
              tool = Object.assign({}, this.toolsMap[item.type], item)
            } 
            if (!tool.title) {
              return (
                <div className="hi-form-filter__tool hi-form-filter__tool--custom" key={index}>
                  {item}
                </div>
              )
            }
            
            const active = tool.type===activeTool

            return (
              <div 
                className={classNames('hi-form-filter__tool', {'hi-form-filter__tool--active': active})}
                key={index}
              >
                <div 
                  className="hi-form-filter__tool--title"
                  onClick={() => this.setActiveTool(tool.type)}
                >
                  <Icon name={tool.icon} />
                  {tool.title && tool.title}
                </div>
                {
                  active && tool.popper &&
                  <div className="hi-form-filter__tool--content">
                    {this.renderToolContent(tool)}
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  mixinTool(type) {
    for (let tool of this.props.tools) {
      if (tool.type === type) {
        return Object.assign({}, this.toolsMap[type], tool)
      }
    }
    
    return this.toolsMap[type]
  }

  renderToolContent(tool) {
    const {
      type,
      ...props
    } = tool

    if (type === 'query') {
      return <QueryTool {...props}/>
    } else if (type === 'filter') {
      return <FilterTool {...props}/>
    } else if (type === 'row-height') {
      return <FilterRowHeight {...props}/>
    } else if (type === 'statistics') {
      return <FilterStatistics {...props}/>
    } else if (type === 'column') {
      return <FilterColumn {...props}/>
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
        { activeTool==='query' && this.renderToolContent(this.mixinTool(activeTool)) }
      </div>
    )
  }
}

FormFilter.childContextTypes = {
  component: PropTypes.any
}