import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Action from './action'
import Tool from './tool'
import axios from 'axios'
import config from '~config'
import './style/form-filter.scss'

export default class FormFilter extends Component {
  static propTypes = {
    canSubmit: PropTypes.bool,
    beforeSubmit: PropTypes.func,
    tools: PropTypes.array,
    actions: PropTypes.array
  }

  static defaultProps = {
    beforeSubmit: () => true,
    canSubmit: true,
    actions: [ 'search', 'add', 'download', 'share', 'more' ],
    tools: [ 'form', 'filter', 'line-height', 'column', 'statistics' ]
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTool: 'form'
    }
  }

  componentDidMount() {
    this.fetchDatas()
  }

  submit(can) {
    const {
      beforeSubmit
    } = this.props

    if (!can || !beforeSubmit()) {
      return
    }
    
    this.fetchDatas()
  }

  reset() {
    this.updateForm(this.initForms(), () => this.fetchDatas())
  }

  fetchDatas() {
    const {
      params,
      bindData
    } = this.props

    axios.get(`${config('host')}/table/get-datas`, {
      params
    }).then(ret => {
      if (ret && ret.data.code === 200) {
        bindData(ret.data.data)
      }
    })
  }

  renderActions() {
    const {
      actions,
      title
    } = this.props

    return (
      <div className="hi-form-filter__actions">
        <div className="hi-form-filter__title">
          {title}
        </div>
        <div className="hi-form-filter__actions--container">
          {
            actions.map((action, index) => (
              <Action type={action} key={index} />
            ))
          }
        </div>
      </div>
    )
  }

  renderTools() {
    const {
      tools
    } = this.props
    const {
      activeTool
    } = this.state

    return (
      <div className="hi-form-filter__tools">
        {
          tools.map((tool, index) => (
            <Tool className={classNames({'hi-form-filter__tool--active': tool===activeTool})} type={tool} key={index} />
          ))
        }
      </div>
    )
  }

  render() {
    const {
      children,
      canSubmit
    } = this.props

    return (
      <div className="hi-form-filter">
        {this.renderActions()}
        {this.renderTools()}
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

      </div>
    )
  }
}