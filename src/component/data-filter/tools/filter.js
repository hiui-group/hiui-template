import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '@hi-ui/hiui/es/icon'
import Select from '@hi-ui/hiui/es/select'
import Input from '@hi-ui/hiui/es/input'
import '../style/filter.scss'

export default class FilterTool extends Component {
  constructor(props) {
    super(props)
  }

  parent () {
    return this.context.component
  }

  addFilter() {
    const parent = this.parent()
    const filters = parent.state.filters

    filters.push({
      column: '',
      operator: '',
      value: '',
      type: ''
    })

    parent.setState({
      filters
    })
  }

  deleteFilter(index) {
    const parent = this.parent()

    parent.state.filters.splice(index, 1)

    parent.setState({
      filters: parent.state.filters
    })
  }

  updateFilter(index, options) {
    const parent = this.parent()
    const filters = [ ...parent.state.filters ]
    
    filters[index] = Object.assign({}, filters[index], options)
    console.log('------------updateFilter', filters)
    parent.setState({filters})
  }

  changeColumn(value, index) {
    console.log('------------changeColumn', value, index)

    this.updateFilter(index, {column: value[0].id, type: value[0].type, operator: ''})
  }

  changeOperator(value, index) {
    console.log('------------changeOperator', value, index)

    this.updateFilter(index, {operator: value[0].id})
  }

  changeValue(value, index) {
    console.log('------------changeValue', value, index)

    this.updateFilter(index, {value: value})
  }

  getColumnOptions(columns) {
    const options = []

    columns.map(column => {
      column.type && options.push({
        name: column.title,
        id: column.dataIndex,
        type: column.type
      })
    })

    return options
  }

  renderFilters() {
    const parent = this.parent()
    const {
      filters,
      columns
    } = parent.state
    const options = this.getColumnOptions(columns)

    return filters.map((filter, index) => (
      <div className="hi-form-filter__filters-item" key={index}>
        <div className="hi-form-filter__filters-delete" onClick={() => this.deleteFilter(index)}>
          <Icon name="delete" />
        </div>
        <div className="hi-form-filter__filters-column">
          <Select
            style={{width: '150px'}}
            list={options}
            value={filter.column}
            onChange={value => this.changeColumn(value, index)}
          />
        </div>
        { this.renderOperator(filter.type, filter.operator, index) }
        { this.renderValue(filter.type, filter.operator, filter.value, index) }
      </div>
    ))
  }

  renderOperator(type, operator, index) {
    let options = []

    if (!type) {
      options = []
    } else {
      options = this.getOperators(type)
    }
    console.log('--------renderOperator', options)
    
    return (
      <div className="hi-form-filter__filters-operator">
        <Select
          style={{width: '100px'}}
          list={options}
          value={operator}
          onChange={value => this.changeOperator(value, index)}
        />
      </div>
    )
  }

  getOperators(type) {
    if (type === 'number') {
      return [ 
        {
          name: '小于',
          id: 'lt'
        }, {
          name: '小于等于',
          id: 'lte'
        }, {
          name: '大于',
          id: 'gt'
        }, {
          name: '大于等于',
          id: 'gte'
        }, {
          name: '等于',
          id: 'eq'
        }
      ]
    } else if (type === 'string') {
      return [
        {
          name: '包含',
          id: 'include'
        }, {
          name: '不包含',
          id: 'exclude'
        }, {
          name: '为空',
          id: 'empty'
        }, {
          name: '不为空',
          id: 'no-empty'
        }
      ]
    } else if (type === 'enum') {
      return [
        {
          name: '等于',
          id: 'eq'
        }
      ]
    }
  }

  renderValue(type, operator, value, index) {
    return (
      <div className="hi-form-filter__filters-value">
        <Input 
          value={value} 
          style={{width: '150px'}} 
          onChange={e => this.changeValue(e.target.value, index)}
        />
      </div>
    )
  }

  render() {
    const parent = this.parent()
    const {
      filters
    } = parent.state

    return (
      <div className="hi-form-filter__filters">
        {
          filters.length === 0 &&
          <div className="hi-form-filter__filters-empty">
            筛选条件为空
          </div>
        }
        {
          filters.length > 0 &&
          <div className="hi-form-filter__filters-items">
            {this.renderFilters()}
          </div>
        }
        <div className="hi-form-filter__filters-add">
          <div onClick={this.addFilter.bind(this)} style={{display: 'inline-block'}}>
            <Icon name="plus" />
            增加条件
          </div>
        </div>
      </div>
    )
  }
}

FilterTool.contextTypes = {
  component: PropTypes.any
}
