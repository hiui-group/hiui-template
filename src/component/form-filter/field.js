import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/field.scss'

export default class Field extends Component {
  static propTypes = {
    label: PropTypes.string,
    advanced: PropTypes.bool,
    width: PropTypes.string
  }

  static defaultProps = {
    advanced: false
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {
      label,
      advanced
    } = this.props

    this.parent().addField(label, advanced)
  }

  parent () {
    return this.context.component
  }

  render() {
    const {
      children,
      label,
      width
    } = this.props
    const {
      advancedFields
    } = this.parent().state

    if (advancedFields.indexOf(label)>-1) {
      return null
    }

    return (
      <div className="hi-form-filter__field" style={{width: `${width}px`}}>
        <div className="hi-form-filter__field--label">
          {label}
        </div>
        <div className="hi-form-filter__field--content">
          {children}
        </div>
      </div>
    )
  }
}

Field.contextTypes = {
  component: PropTypes.any
}