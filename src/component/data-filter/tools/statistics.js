import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/statistics.scss'

export default class FilterStatistics extends Component {
  constructor(props) {
    super(props)
  }

  heights = {
    'sum': '求和'
  }

  parent () {
    return this.context.component
  }

  render() {
    const parent = this.parent()

    return (
      <div className="hi-form-filter__statistics">
        {
          Object.entries(this.heights).map(([ value, label ]) => (
            <div 
              className="hi-form-filter__statistics--item"
              key={value}
              onClick={() => {
                parent.onChange({'statistics': value})
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

FilterStatistics.contextTypes = {
  component: PropTypes.any
}
