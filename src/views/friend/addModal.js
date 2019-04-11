import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Modal
} from '@hi-ui/hiui/es'
import { observer, inject } from 'mobx-react'
const FormItem = Form.Item
@inject('friend')
@observer
class AddModal extends Component {
  render () {
    const {
      friend: store
    } = this.props
    return (
      <Modal
        show={store.UI.showAddModal}
        title='增加数据'
        onCancel={async () => {
          store.UI.showAddModal = false
        }}
        onConfirm={async () => {
          let res = await store.handlePost()
          store.UI.showAddModal = false
          store.fetch()
        }}
      >
        <Form>
          <FormItem label='姓名'>
            <Input value={store.tempAddItem.name} onChange={(e) => (store.tempAddItem.name = e.target.value)} />
          </FormItem>
          <FormItem label='年龄'>
            <Input value={store.tempAddItem.age} onChange={(e) => (store.tempAddItem.age = e.target.value)} />
          </FormItem>
          <FormItem label='性别'>
            <Input value={store.tempAddItem.sex} onChange={(e) => (store.tempAddItem.sex = e.target.value)} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AddModal.propTypes = {}

export default AddModal
