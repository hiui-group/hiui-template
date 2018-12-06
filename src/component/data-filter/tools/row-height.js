import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/row-height.scss'

export default class FilterRowHeight extends Component {
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
    const {
      onChange
    } = this.props

    return (
      <div className="hi-form-filter__row-height">
        {
          Object.entries(this.heights).map(([ value, label ]) => (
            <div 
              className="hi-form-filter__row-height--item"
              key={value}
              onClick={() => {
                onChange(value)
              }}
            >
              {label}
            </div>
          ))
        }
      </div>
    )
  }
}

FilterRowHeight.contextTypes = {
  component: PropTypes.any
}
