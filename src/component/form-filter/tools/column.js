import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@hi-ui/hiui/es/checkbox'
import '../style/column.scss'

export default class FilterColumn extends Component {
  constructor(props) {
    super(props)
  }

  parent () {
    return this.context.component
  }

  render() {
    const parent = this.parent()

    return (
      <div className="hi-form-filter__column">
        {
          parent.state.columns.map((column, index) => (
            <div 
              className="hi-form-filter__column--item"
              key={index}
              onClick={() => {
                column.display = !column.display
                const columns = parent.filterColumns()

                parent.onChange({columns})
              }}
            >
              <Checkbox
                checked={column.display}
              >
                {column.title}
              </Checkbox>
            </div>
          ))
        }
      </div>
    )
  }
}

FilterColumn.contextTypes = {
  component: PropTypes.any
}
