import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'
import Table from '@hi-ui/hiui/es/table'
import Icon from '@hi-ui/hiui/es/icon'
import SearchAction from './actions/search'
import QueryTool from './tools/query'
import ConditionFilterTool from './tools/condition-filter'
import RowHeightTool from './tools/row-height'
import StatisticsTool from './tools/statistics'
import ColumnTool from './tools/column'
import './style/index.scss'

export default class DataFilter extends Component {
  forms = {}
  toolsMap = {
    'query': {
      className: 'block-filter__tool--query',
      type: 'query',
      icon: 'approve',
      title: '查询',
      trigger: 'toggle',
      expandIcon: true
    },
    'filter': {
      type: 'filter',
      popper: true,
      icon: 'label',
      title: '筛选',
      trigger: 'outside'
    },
    'row-height': {
      type: 'row-height',
      popper: true,
      icon: 'phone',
      title: '行高',
      trigger: 'outside'
    },
    'column': {
      type: 'column',
      popper: true,
      icon: 'phone',
      title: '列显示',
      trigger: 'outside'
    },
    'statistics': {
      type: 'statistics',
      popper: true,
      icon: 'linechart',
      title: '统计',
      trigger: 'outside'
    }
  }

  static propTypes = {
    canSubmit: PropTypes.bool,
    actions: PropTypes.array,
    vertical: PropTypes.bool,
    verticalWidth: PropTypes.string
  }

  static defaultProps = {
    canSubmit: true,
    tools: [ 'query', 'filter', 'row-height', 'column', 'statistics' ],
    activeTools: [],
    actions: [],
    columnMixins: [],
    columns: [],
    vertical: false,
    verticalWidth: 'auto'
  }

  constructor (props) {
    super(props)

    this.state = {
      columns: this.mixinColumns(props.columns), // all columns
      filteredColumns: [], // filtered columns
      rowHeight: 'middle', // 行高
      activeTools: props.activeTools,
      datas: [],
      filteredDatas: [],
      filters: 0,
      page: 1,
      total: 0,
      pageSize: 0,
      statistics: {}
    }
  }

  componentDidMount () {
    if (this.props.columns.length > 0) {
      const filteredColumns = this.filterColumns(this.props.columns)

      this.props.setState({ filteredColumns })
    }
    this.fetchDatas(this.props)
    window.addEventListener('click', this.hidePopper.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.hidePopper.bind(this))
  }

  getChildContext () {
    return {
      component: this
    }
  }

  hidePopper (e, type) {
    if (e.target.closest('.block-filter-tool--active')) {
      return
    }
    const activeTools = this.state.activeTools.splice(0)

    activeTools.map((tool, index) => {
      if (this.toolsMap[tool].trigger === 'outside' && type !== tool) {
        activeTools.splice(index, 1)
      }
    })

    this.setState({ activeTools })
  }

  submit (forms) {
    this.fetchDatas(this.props, forms)
  }

  fetchDatas (props, forms = {}) {
    const {
      params,
      url
    } = props
    const {
      page
    } = this.state

    if (Object.keys(forms).length !== 0) {
      this.forms = forms
    }

    axios.get(url, {
      params: {
        page,
        ...params,
        ...this.forms
      }
    }).then(ret => {
      if (ret && ret.data.code === 200) {
        const data = ret.data.data
        const state = {
          datas: data.data,
          filteredDatas: data.data,
          page: parseInt(data.pageInfo.page),
          total: parseInt(data.pageInfo.total),
          pageSize: parseInt(data.pageInfo.pageSize),
          filters: []
        }

        if (data.columns) {
          this.mixinColumns(data.columns, true)
          const filteredColumns = this.filterColumns()

          this.setState({ filteredColumns, ...state })
        } else {
          this.setState(state)
        }
      }
    })
  }

  mixinColumns (columns, updateState = false) {
    const _columns = []

    columns.map(column => {
      const key = column.key

      _columns.push({
        ...column,
        ...this.props.columnMixins[key]
      })
    })

    updateState && this.setState({ columns: _columns })

    return _columns
  }

  filterColumns () {
    const _columns = []

    this.state.columns.map(column => {
      if (!column.hide) {
        _columns.push({
          ...column
        })
      }
    })

    return _columns
  }

  setActiveTool (tool) {
    const {
      activeTools
    } = this.state
    const index = activeTools.indexOf(tool.type)

    if (index > -1) {
      activeTools.splice(index, 1)
    } else {
      activeTools.push(tool.type)
    }

    this.setState({
      activeTools
    })
  }

  renderTools () {
    const {
      tools
    } = this.props
    const {
      activeTools,
      filters
    } = this.state

    return (
      <div className='block-filter__tools'>
        {
          tools.map((item, index) => {
            let tool

            if (typeof item === 'string') {
              tool = this.toolsMap[item]
            } else if (typeof item === 'object') {
              tool = Object.assign({}, this.toolsMap[item.type], item)
            }

            if (!tool.title) { // 自定义元素
              return (
                <div className={classNames('block-filter__tool block-filter-tool block-filter-tool--custom', tool.className)} key={index}>
                  {item}
                </div>
              )
            }

            const active = activeTools.indexOf(tool.type) > -1

            return (
              <div
                className={classNames('block-filter__tool block-filter-tool', tool.className, { 'block-filter-tool--active': active })}
                key={index}
              >
                <div
                  className='block-filter-tool__title'
                  data-type={tool.type}
                  onClick={e => {
                    this.setActiveTool(tool)
                    this.hidePopper(e, tool.type)
                  }}
                >
                  <Icon className='block-filter-tool__icon' name={tool.icon} />
                  <span className='block-filter-tool__text'>
                    {tool.title && tool.title}
                  </span>
                  {
                    tool.expandIcon &&
                    <Icon className='block-filter-tool__expand' name={active ? 'up' : 'down'} />
                  }
                  {
                    tool.type === 'filter' && filters.length > 0 &&
                    <span className='block-filter-tool__badge'>{filters.length}</span>
                  }
                </div>
                {
                  tool.popper &&
                  <div
                    className={classNames('block-filter-tool__popper', { 'block-filter-tool__popper--active': active })}>
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

  mixinTool (type) {
    for (let tool of this.props.tools) {
      if (tool.type === type) {
        return Object.assign({}, this.toolsMap[type], tool)
      }
    }

    return this.toolsMap[type]
  }

  renderToolContent (tool) {
    const {
      type,
      ...props
    } = tool

    if (type === 'query') {
      return <QueryTool {...props} />
    } else if (type === 'filter') {
      return <ConditionFilterTool {...props} />
    } else if (type === 'row-height') {
      return <RowHeightTool {...props} />
    } else if (type === 'statistics') {
      return <StatisticsTool {...props} />
    } else if (type === 'column') {
      return <ColumnTool {...props} />
    }
  }

  renderActions () {
    const {
      actions
    } = this.props

    return (
      <div className='block-filter__actions'>
        {
          actions.map((action, index) => (
            <div className='block-filter__action block-filter-action' key={index}>
              {this.renderAction(action)}
            </div>
          ))
        }
      </div>
    )
  }

  renderAction (action) {
    if (typeof action === 'object') {
      return action
    } else if (action === 'search') {
      return <SearchAction />
    }
  }

  render () {
    const {
      activeTools,
      filteredColumns,
      filteredDatas,
      page,
      total,
      rowHeight,
      statistics,
      filters
    } = this.state
    const {
      table,
      params,
      vertical,
      verticalWidth
    } = this.props
    const tableProps = Object.assign({ ...statistics }, table, {
      columns: filteredColumns,
      data: filteredDatas
    })

    if (filters.length === 0) { // 有筛选时隐藏分页
      tableProps.pagination = {
        pageSize: params.pageSize,
        total: total,
        page: page,
        onChange: page => {
          this.setState({ page: page }, () => {
            this.fetchDatas(this.props)
          })
        }
      }
    }

    return (
      <React.Fragment>
        <div className={classNames('block-filter')}>
          {this.renderActions()}
          {this.renderTools()}
        </div>
        <div className={classNames('block-main', {'block-main--vertical': vertical})}>
          { 
            activeTools.indexOf('query') > -1 && 
            <div className="block-filter-tool__content" style={{width: verticalWidth}}>
              {this.renderToolContent(this.mixinTool('query'))}
            </div>
          }
          <div className={classNames('block-data', `block-data--rowheight--${rowHeight}`)}>
            <Table {...tableProps} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

DataFilter.childContextTypes = {
  component: PropTypes.any
}
