import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Form,
  Input
} from '@hi-ui/hiui/es'
import { observer, inject } from 'mobx-react'
const FormItem = Form.Item

@inject('friend')
@observer
class EditModal extends Component {
  render () {
    const {
      friend: store
    } = this.props
    return (
      <Modal
        show={store.UI.showEditModal}
        title='编辑数据'
        onConfirm={async () => {
          store.UI.showEditModal = false
          await store.handleUpdate()
          store.fetch()
        }}
        onCancel={() => {
          store.UI.showEditModal = false
        }}
      >
        <Form>
          <FormItem label='姓名'>
            <Input value={store.currentItem.name} onChange={(e) => (store.currentItem.name = e.target.value)} />
          </FormItem>
          <FormItem label='年龄'>
            <Input value={store.currentItem.age} onChange={(e) => (store.currentItem.age = e.target.value)} />
          </FormItem>
          <FormItem label='性别'>
            <Input value={store.currentItem.sex} onChange={(e) => (store.currentItem.sex = e.target.value)} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

EditModal.propTypes = {}

export default EditModal
