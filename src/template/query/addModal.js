import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Modal
} from '@hi-ui/hiui/es'
import { observer, inject } from 'mobx-react'
const FormItem = Form.Item
@inject('query')
@observer
class AddModal extends Component {
  render () {
    const {
      query: store
    } = this.props
    return (
      <Modal
        show={store.showAddModal}
        title='增加数据'
        onClick={() => {
          store.handlePost()
          store.closeAddModal()
        }}
      >
        <Form>
          <FormItem label='姓名'>
            <Input value={store.currentItem.name} onChange={(e) => (store.updateAddItemByName('name', e.target.value))} />
          </FormItem>
          <FormItem label='年龄'>
            <Input value={store.currentItem.age} onChange={(e) => (store.updateAddItemByName('age', e.target.value))} />
          </FormItem>
          <FormItem label='性别'>
            <Input value={store.currentItem.sex} onChange={(e) => (store.updateAddItemByName('sex', e.target.value))} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AddModal.propTypes = {}

export default AddModal
