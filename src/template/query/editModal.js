import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Form,
  Input
} from '@hi-ui/hiui/es'
import { observer, inject } from 'mobx-react'
const FormItem = Form.Item

@inject('query')
@observer
class EditModal extends Component {
  render () {
    const {
      query: store
    } = this.props
    return (
      <Modal
        show={store.showEditModal}
        title='编辑数据'
        onConfirm={() => {
          store.handleUpdate()
          store.closeEditModal()
        }}
        onCancel={() => (store.closeEditModal())}
      >
        <Form>
          <FormItem label='姓名'>
            <Input value={store.currentItem.name} onChange={(e) => (store.updateCurrentItemByName('name', e.target.value))} />
          </FormItem>
          <FormItem label='年龄'>
            <Input value={store.currentItem.age} onChange={(e) => (store.updateCurrentItemByName('age', e.target.value))} />
          </FormItem>
          <FormItem label='性别'>
            <Input value={store.currentItem.sex} onChange={(e) => (store.updateCurrentItemByName('sex', e.target.value))} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

EditModal.propTypes = {}

export default EditModal
