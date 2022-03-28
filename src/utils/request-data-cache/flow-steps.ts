import { RequestDataCacheType } from './index'

const PageRoutePrefix = 'flow-steps'

export const FlowStep: RequestDataCacheType = {
  [`${PageRoutePrefix}/data`]: {
    code: 200,
    data: {
      orderId: 'PP202102230001',
      orderTitle: '普通投诉 / 上门慢',
      orderStatus: '待客服确认',
      workOrder: {
        id: 'ASxxxxxxxxxxxxxxxx08',
        status: '待处理',
        createTime: '2022/02/14 15:20:00',
        acceptingInstitution: '北京临安信清河店',
        serviceMode: '寄修',
        serviceType: '维修',
        protectedMode: '保内',
        agencyArea: '北京/北京市',
        userArea: '北京/北京市',
      },
      product: {
        productName: '我是小米12 我是小米12',
        previewUrl:
          'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
        IMEI: '6666666666666',
        SN: '3333/6666666',
        enabledNumberManagement: 1,
      },
      steps: [
        {
          title: '客服确认',
          status: '',
          statusNumber: 0,
          user: {
            name: '张楚岚',
            role: '客服',
            roleNumber: 1,
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
          },
          content: '',
          time: '',
        },
        {
          title: '工程师处理',
          status: '已处理',
          statusNumber: 1,
          user: {
            name: '张三',
            role: '工程师',
            roleNumber: 2,
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg',
          },
          content: '此处展示处理内容详情，可能是一段操作描述',
          time: '2021/06/30 12:24',
        },
        {
          title: '备注',
          status: '',
          statusNumber: 0,
          user: {
            name: '张三',
            role: '工程师',
            roleNumber: 2,
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg',
          },
          content: '此处展示处理内容详情，可能是一段操作描述',
          time: '2021/06/30 12:24',
        },
        {
          title: '创建反馈单',
          status: '已创建',
          statusNumber: 1,
          user: {
            name: '张楚岚',
            role: '客服',
            roleNumber: 1,
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
          },
          content: '此处展示处理内容详情，可能是一段操作描述',
          time: '2021/06/30 12:24',
        },
      ],
    },
  },
}
