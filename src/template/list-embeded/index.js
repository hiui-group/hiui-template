import React, { Component } from 'react'
import List from './components/List'
import { Pagination } from '@hi-ui/hiui'

import ListHeader from './components/ListHeader/index.jsx'
import './index.scss'

const listData = [
  {
    title: '设备采购申请',
    status: 'pendding',
    statusDesc: '审批中',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  },
  {
    title: '设备采购申请',
    status: 'warning',
    statusDesc: '待审批',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  },
  {
    title: '设备采购申请',
    status: 'success',
    statusDesc: '已通过',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  },
  {
    title: '设备采购申请',
    status: 'pendding',
    statusDesc: '审批中',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  },
  {
    title: '设备采购申请',
    status: 'success',
    statusDesc: '已通过',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  },
  {
    title: '设备采购申请',
    status: 'warning',
    statusDesc: '待审批',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  },
  {
    title: '正版办公软件自购申请',
    status: 'pendding',
    statusDesc: '审批中',
    info: [
      { label: '申请编号', value: 'YH7290121' },
      { label: '申请人', value: '张某某' },
      { label: '申请时间', value: '2019-02-11' },
      { label: '申请部门', value: '信息部-用户体验组' },
      { label: '状态', value: '待审批' }
    ],
    operation: ['审批', '驳回', '拒绝'],
    detail: [
      { label: '设备编号', value: '930390320430930390320430902029886…' },
      { label: '系统版本', value: '8.0' },
      { label: '屏幕尺寸', value: '6.4 英寸' },
      { label: '设备名称', value: 'mix2S' },
      { label: '操作系统', value: '9.5' },
      { label: '分辨率', value: '1136*640' },
      { label: '设备别名', value: 'mix2S' },
      { label: '是否ROOT', value: '否' },
      { label: '设备识别码', value: '8681440300434' },
      { label: '容量颜色', value: ' 6+128G白色' },
      { label: '是否新品', value: '是' },
      { label: '设备挂靠人', value: '测试组' }
    ]
  }
]
export default class ListEmbeded extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 0,
      pageSize: 10
    }
  }

  renderPage = () => {
    const { pageNum, pageSize } = this.state
    return (
      <div
        style={{
          display: 'flex',
          marginTop: 24,
          justifyContent: 'flex-end'
        }}
      >
        <Pagination
          defaultCurrent={pageNum}
          total={listData.length * 4}
          pageSize={pageSize}
          onChange={(page, prevPage, pageSize) => {
            this.setState({
              pageNum: page,
              pageSize
            })
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="page--list-embeded">
        <ListHeader />
        <List data={listData} footer={this.renderPage} />
      </div>
    )
  }
}
