import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  static propTypes = {
    label: PropTypes.string,
    advanced: PropTypes.bool,
    width: PropTypes.string
  }

  static defaultProps = {
    advanced: false
  }

  componentWillMount () {
    const {
      label,
      advanced
    } = this.props

    this.parent().addField(label, advanced)
  }

  parent () {
    return this.context.component
  }

  render () {
    const {
      children,
      label,
      width
    } = this.props
    const {
      advancedFields
    } = this.parent().state

    if (advancedFields.indexOf(label) > -1) {
      return null
    }

    return (
      <div className='block-filter-form__field block-filter-field' style={{ width: `${width}px` }}>
        <div className='block-filter-field__label'>
          {label}
        </div>
        <div className='block-filter-field__content'>
          {children}
        </div>
      </div>
    )
  }
}

Field.contextTypes = {
  component: PropTypes.any
}
