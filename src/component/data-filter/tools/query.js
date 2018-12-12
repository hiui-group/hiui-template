import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import '../style/query.scss'

export default class QueryTool extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    canSubmit: true,
    submit: true
  }

  parent () {
    return this.context.component
  }

  submit(can) {
    const {
      beforeSubmit,
      forms
    } = this.props

    if (!can || !beforeSubmit()) {
      return
    }
    const parent = this.parent()
    
    parent.setState({page: 1}, () => {
      parent.fetchDatas(parent.props, forms)
    })
  }

  render() {
    const parent = this.parent()
    const {
      children
    } = parent.props
    const {
      canSubmit,
      onCancel,
      submit
    } = this.props

    return (
      <div className="hi-form-filter__form">
        <div className="hi-form-filter__form-groups">
          {children}
        </div>
        {
          submit &&
          <div className="hi-form-filter__form-actions">
            <Button
              type={canSubmit ? 'primary' : 'default'}
              disabled={!canSubmit}
              onClick={() => this.submit(canSubmit)}
            >
                确定
            </Button>
            {
              onCancel &&
              <Button onClick={() => onCancel()}>
                重置
              </Button>
            }
          </div>
        }

      </div>
    )
  }
}

QueryTool.contextTypes = {
  component: PropTypes.any
}
