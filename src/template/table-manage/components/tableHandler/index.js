import React from 'react'
import { Modal, Dropdown, Icon } from '@hi-ui/hiui'
const TableHandler = ({ text, row, index, scope }) => {
  return (
    <React.Fragment>
      <Icon
        name="edit"
        style={{ marginRight: 16 }}
        onClick={() => {
          console.log(text, row, index, scope)
          const { name, sku, stock, updateTime } = row
          scope.setState({
            modalVisiable: true,
            modalTitle: '编辑'
          })
          scope.modalForm.current.setFieldsValue({
            projectName: name,
            sku,
            num: stock,
            date: updateTime
          })
        }}
      />
      <Icon
        name="delete"
        style={{ marginRight: 16 }}
        onClick={() => {
          Modal.confirm({
            onConfirm: () => {
              scope.setState({
                modalVisiable: false
              })
              scope.delTableRow(row.id)
            },
            onCancel: () => {
              scope.setState({
                modalVisiable: false
              })
            },
            title: '删除',
            content: '确定要删除本行数据吗',
            type: 'warning'
          })
        }}
      />
      <Dropdown
        className="table-advan-group-horizontal-morehandle"
        data={[
          {
            title: '操作1'
          },
          {
            title: '操作2'
          }
        ]}
        placement="bottom-end"
        title={<Icon name="ellipsis" />}
      />
    </React.Fragment>
  )
}

export default TableHandler
