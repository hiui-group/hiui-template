import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/filter.scss'

export default class FilterTool extends Component {
  constructor(props) {
    super(props)
  }

  parent () {
    return this.context.component
  }

  render() {
    const parent = this.parent()

    return (
      <div className="hi-form-filter__filters">
      </div>
    )
  }
}

FilterTool.contextTypes = {
  component: PropTypes.any
}
