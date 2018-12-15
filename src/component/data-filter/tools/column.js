import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@hi-ui/hiui/es/checkbox'
import '../style/column.scss'

export default class ColumnTool extends Component {
  constructor (props) {
    super(props)
  }

  parent () {
    return this.context.component
  }

  render () {
    const parent = this.parent()

    return (
      <div className='hi-form-filter__column'>
        {
          parent.state.columns.map((column, index) => (
            <div
              className='hi-form-filter__column--item'
              key={index}
            >
              <Checkbox
                checked={!column.hide}
                onChange={() => {
                  column.hide = !column.hide
                  const filteredColumns = parent.filterColumns()

                  if (this.props.onChange) {
                    this.props.onChange(filteredColumns)
                  } else {
                    parent.setState({ filteredColumns })
                  }
                }}
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

ColumnTool.contextTypes = {
  component: PropTypes.any
}
