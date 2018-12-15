import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchAction from './actions/search'

export default class Action extends Component {
  static propTypes = {
    type: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ])
  }

  static defaultProps = {
    type: ''
  }

  constructor (props) {
    super(props)
  }

  renderAction (type) {
    if (type === 'search') {
      return (
        <SearchAction />
      )
    }
  }

  render () {
    const {
      type,
      children
    } = this.props

    if (type) {
      return (
        <div className='block-filter__action block-filter-action'>
          {this.renderAction(type)}
        </div>
      )
    }

    return (
      <div className='block-filter__action block-filter-action'>
        {children}
      </div>
    )
  }
}
