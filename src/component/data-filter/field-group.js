import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '@hi-ui/hiui/es/icon'
import Modal from '@hi-ui/hiui/es/modal'
import './style/field-group.scss'
import Button from '@hi-ui/hiui/es/button'

export default class FieldGroup extends Component {
  static propTypes = {
    main: PropTypes.bool
  }

  static defaultProps = {
    main: false
  }

  fieldsCache = []
  advancedFieldsCache = []

  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      fields: [],
      advancedFields: []
    }
  }

  getChildContext () {
    return {
      component: this
    }
  }

  addField (fieldName, advanced) {
    if (advanced) {
      this.state.advancedFields.push(fieldName)
    } else {
      this.state.fields.push(fieldName)
    }

    this.forceUpdate()
  }

  removeField (fieldName, advanced) {
    if (advanced) {
      const index = this.state.advancedFields.indexOf(fieldName)

      this.state.advancedFields.splice(index, 1)
    } else {
      const index = this.state.fields.indexOf(fieldName)

      this.state.fields.splice(index, 1)
    }

    this.forceUpdate()
  }

  renderManage () {
    if (this.props.main) {
      return (
        <div
          className='hi-field-group__manage'
          onClick={() => {
            this.fieldsCache = this.state.fields.slice(0)
            this.advancedFieldsCache = this.state.advancedFields.slice(0)
            this.setState({ showModal: true })
          }}
        >
          <Icon name='set' />
            管理
        </div>
      )
    }
  }

  render () {
    const {
      children,
      main,
      onCancel
    } = this.props
    const {
      showModal,
      fields,
      advancedFields
    } = this.state

    return (
      <div className='hi-field-group' >
        <div className='hi-field-group__fields'>
          {children}
        </div>
        { main && this.renderManage() }
        {
          main &&
          <Modal
            title='管理'
            show={showModal}
            backDrop
            onConfirm={() => {
              this.setState({
                showModal: false
              })
              onCancel()
            }}
            onCancel={() => {
              this.setState({
                fields: this.fieldsCache,
                advancedFields: this.advancedFieldsCache,
                showModal: false
              })
            }}>
            <div className='hi-fields hi-fields--selected'>
              <div className='hi-fields__label'>
                已选
              </div>
              <div className='hi-fields__items'>
                {
                  fields.map((field, index) => (
                    <Button key={index} onClick={() => {
                      this.removeField(field, false)
                      this.addField(field, true)
                    }}>
                      {field}
                      <Icon name='minus' />
                    </Button>
                  ))
                }
              </div>
            </div>
            <div className='hi-fields hi-fields--unselected'>
              <div className='hi-fields__label'>
                未选
              </div>
              <div className='hi-fields__items'>
                {
                  advancedFields.map((field, index) => (
                    <Button key={index} onClick={() => {
                      this.removeField(field, true)
                      this.addField(field, false)
                    }}>
                      {field}
                      <Icon name='plus' />
                    </Button>
                  ))
                }
              </div>
            </div>
          </Modal>
        }
      </div>
    )
  }
}

FieldGroup.childContextTypes = {
  component: PropTypes.any
}
