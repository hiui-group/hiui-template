import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'
import config from '~config'
import '../style/query.scss'

export default class QueryTool extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchDatas()
  }

  parent () {
    return this.context.component
  }

  submit(can) {
    const {
      beforeSubmit
    } = this.parent().props

    if (!can || !beforeSubmit()) {
      return
    }
    
    this.fetchDatas()
  }

  reset() {
    this.updateForm(this.initForms(), () => this.fetchDatas())
  }

  fetchDatas() {
    const parent = this.parent()
    const {
      params
    } = parent.props

    axios.get(`${config('host')}/table/get-datas`, {
      params
    }).then(ret => {
      if (ret && ret.data.code === 200) {
        parent.onChange({data: ret.data.data})
      }
    })
  }

  render() {
    const parent = this.parent()
    const {
      children,
      canSubmit
    } = parent.props

    return (
      <div className="hi-form-filter__form">
        <div className="hi-form-filter__form--left">
          <div className="hi-form-filter__form--fields">
            {children}
          </div>
          <div className="hi-form-filter__form--actions">
            <Button
              type={canSubmit ? 'primary' : 'default'}
              disabled={!canSubmit}
              onClick={() => this.submit(canSubmit)}
            >
            确定
            </Button>
            <Button>
            取消
            </Button>
          </div>
        </div>
      
        <div className="hi-form-filter__form--right">
          <Icon name="set" />
          管理
        </div>
      </div>
    )
  }
}

QueryTool.contextTypes = {
  component: PropTypes.any
}
