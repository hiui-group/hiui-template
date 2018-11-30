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

  render() {
    const {
      children,
      label,
      width,
      advanced
    } = this.props

    if (advanced) {
      return null
    }

    return (
      <div className="hi-tpl__form--field" style={{width: `${width}px`}}>
        <div className="hi-tpl__form--field__label">
          {label}
        </div>
        <div className="hi-tpl__form--field__content">
          {children}
        </div>
      </div>
    )
  }
}