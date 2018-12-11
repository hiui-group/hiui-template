import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from '@hi-ui/hiui/es/checkbox'
import '../style/row-height.scss'

export default class RowHeightTool extends Component {
  constructor(props) {
    super(props)
  }

  heights = {
    'small': '紧凑型',
    'middle': '舒适型',
    'big': '宽敞型'
  }

  parent () {
    return this.context.component
  }

  render() {
    const parent = this.parent()
    const {
      onChange
    } = this.props
    const {
      rowHeight
    } = parent.state

    return (
      <div className="hi-form-filter__row-height">
        {
          Object.entries(this.heights).map(([ value, label ]) => (
            <div 
              className={classNames('hi-form-filter__row-height-item', {'hi-form-filter__row-height-item--active': value===rowHeight})}
              key={value}
              onClick={() => {
                if (onChange) {
                  onChange(value)
                } else {
                  parent.setState({rowHeight: value})
                }
              }}
            >
              <Checkbox checked={value===rowHeight}>
                {label}
              </Checkbox>
            </div>
          ))
        }
      </div>
    )
  }
}

RowHeightTool.contextTypes = {
  component: PropTypes.any
}
