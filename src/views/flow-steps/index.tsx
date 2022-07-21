import * as React from 'react'
import { Avatar, Button, Card, Grid, Table, Tag, Timeline, List, Textarea } from '@hi-ui/hiui'
import { BellFilled, PlusOutlined } from '@hi-ui/icons'
import { ContentHeader } from '../../components/content-header'
import { Spacer } from '../../components/spacer'
import { fetchFlowStepsData } from './api'
import Descriptions from '@hi-ui/descriptions'

const { Row, Col } = Grid
const contentPlaceholder = '-'

export const FlowSteps = () => {
  const [data, setData] = React.useState<Record<string, any> | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetchFlowStepsData()
      .then((result) => {
        setData(result.data!)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: '流程页',
          },
        ]}
        title="流程页"
        toolbar={
          <div>
            <Button>次要操作</Button>
            <Button>次操作</Button>
            <Button icon={<PlusOutlined />} type="primary">
              主操作
            </Button>
          </div>
        }
      />

      <div style={{ padding: '20px 20px 83px' }}>
        <Row>
          <Col span={24}>
            <Card loading={loading} bordered={false} hoverable>
              <Spacer>
                <Spacer>
                  <Avatar shape="square" icon={<BellFilled />}></Avatar>
                  <Spacer direction="column" align="flex-start" gap={0}>
                    <span
                      style={{
                        fontSize: 14,
                        color: '#5F6A7A',
                        lineHeight: '20px',
                      }}
                    >
                      单号：
                      {data ? data.orderId : contentPlaceholder}
                    </span>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#1F2733',
                        lineHeight: '32px',
                      }}
                    >
                      {data ? data.orderTitle : contentPlaceholder}
                    </div>
                  </Spacer>
                </Spacer>
              </Spacer>
            </Card>
          </Col>
        </Row>

        <Row gutter>
          <Col span={7}>
            <Card bordered={false} hoverable>
              {data ? (
                <>
                  <Descriptions column={1}>
                    <Descriptions.Item label="关联工单">{data.workOrder.id}</Descriptions.Item>
                    <Descriptions.Item label="状态">{data.workOrder.status}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">
                      {data.workOrder.createTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="受理机构">
                      {data.workOrder.acceptingInstitution}
                    </Descriptions.Item>
                    <Descriptions.Item label="服务方式">
                      {data.workOrder.serviceMode}
                    </Descriptions.Item>
                    <Descriptions.Item label="服务类型">
                      {data.workOrder.serviceType}
                    </Descriptions.Item>
                    <Descriptions.Item label="保内保外">
                      {data.workOrder.protectedMode}
                    </Descriptions.Item>
                  </Descriptions>
                  <Card bordered={false} style={{ backgroundColor: '#F5F7FA', marginBottom: 12 }}>
                    <Spacer align="flex-start">
                      <Avatar src={data.product.previewUrl}></Avatar>
                      <div>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#1F2733',
                            lineHeight: '20px',
                          }}
                        >
                          {data.product.productName}
                        </div>
                        <Descriptions column={2}>
                          <Descriptions.Item label="串号管理:" colSpan={2}>
                            {data.product.enabledNumberManagement === 1 ? '是' : '否'}
                          </Descriptions.Item>
                          <Descriptions.Item style={{ paddingBottom: 0 }} label="IMEI:">
                            {data.product.IMEI}
                          </Descriptions.Item>
                          {/* <Descriptions.Item label="SN:">{data.product.SN}</Descriptions.Item> */}
                        </Descriptions>
                      </div>
                    </Spacer>
                  </Card>
                  <Descriptions column={1}>
                    <Descriptions.Item label="机构地区">
                      {data.workOrder.agencyArea}
                    </Descriptions.Item>
                    <Descriptions.Item label="用户地区">
                      {data.workOrder.userArea}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              ) : null}
            </Card>
          </Col>
          <Col span={17}>
            <Timeline
              type="right"
              data={
                data
                  ? data.steps.map((item: any, index: number) => {
                      return {
                        title: (
                          <Card bordered={false} size="sm" title={item.title}>
                            <Spacer inline={false}>
                              <Avatar size="xs" src={item.user.avatar}></Avatar>
                              <span>{item.user.name}</span>
                              <Tag type={item.user.roleNumber === 1 ? 'success' : 'primary'}>
                                {item.user.role}
                              </Tag>
                              <span style={{ color: '#929AA6' }}>{item.time}</span>
                            </Spacer>
                            <Spacer inline={false} style={{ marginTop: 8 }}>
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: '#237FFA',
                                }}
                              >
                                {item.status}
                              </span>
                              <span style={{ color: '#5F6A7A' }}>{item.content}</span>
                            </Spacer>
                            {index === 0 ? (
                              <div>
                                <Textarea placeholder="请输入反馈内容" />
                                <div
                                  style={{
                                    marginTop: 12,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <Button>提交备注</Button>
                                  <Button type="danger">拒绝</Button>
                                  <Button type="primary">通过</Button>
                                </div>
                              </div>
                            ) : null}
                          </Card>
                        ),
                      }
                    })
                  : []
              }
            ></Timeline>
          </Col>
        </Row>
      </div>
    </div>
  )
}
