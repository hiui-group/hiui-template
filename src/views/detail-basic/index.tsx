import * as React from 'react'
import { Avatar, Button, Card, Grid, Table, Tag, Timeline } from '@hi-ui/hiui'
import { BuildingFilled, PlusOutlined } from '@hi-ui/icons'
import { ContentHeader } from '../../components/content-header'
import { Divider } from '../../components/divider'
import { Spacer } from '../../components/spacer'
import { fetchBasicDetailData } from './api'

const { Row, Col } = Grid

const prefix = 'hi-pro-detail-basic'

const contentPlaceholder = '-'

export const DetailBasic = () => {
  const [data, setData] = React.useState<Record<string, any> | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetchBasicDetailData()
      .then((result) => {
        setData(result.data!)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className={prefix}>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'home',
          },
          {
            title: '基础详情页',
          },
        ]}
        title="基础详情页"
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
            <Card loading={loading} bordered={false}>
              <Spacer>
                <Spacer>
                  <Avatar icon={<BuildingFilled />}></Avatar>
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

        <Row>
          <Col span={24}>
            <Card loading={loading} bordered={false} title="差旅信息">
              description
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card loading={loading} bordered={false} title="行程明细">
              <Table
                columns={[
                  {
                    title: '费用类型',
                    dataKey: 'costType',
                  },
                  {
                    title: '出行日期',
                    dataKey: 'date',
                    width: 240,
                  },
                  {
                    title: '航程类型',
                    dataKey: 'voyageType',
                  },
                  {
                    title: '出发地',
                    dataKey: 'departure',
                  },
                  {
                    title: '到达地',
                    dataKey: 'destination',
                  },
                  {
                    title: '舱等',
                    dataKey: 'class',
                  },
                  {
                    title: '操作',
                    dataKey: 'operator',
                    width: 160,
                  },
                ]}
                data={[
                  {
                    costType: '国内机票',
                    date: '2021-01-01 至 2021-01-03',
                    voyageType: '往返',
                    departure: '武汉',
                    destination: '北京',
                    class: '经济舱',
                    operator: '审批通过后可预订',
                    key: 1,
                  },
                ]}
              ></Table>
              <Divider />
              <Table
                columns={[
                  {
                    title: '费用类型',
                    dataKey: 'costType',
                  },
                  {
                    title: '入住日期',
                    dataKey: 'date',
                    width: 240,
                  },
                  {
                    title: '天数',
                    dataKey: 'days',
                  },
                  {
                    title: '城市',
                    dataKey: 'city',
                  },
                  {
                    title: '每日标准',
                    dataKey: 'dailyStandard',
                  },
                  {
                    title: '币种',
                    dataKey: 'currency',
                  },
                  {
                    title: '操作',
                    dataKey: 'operator',
                    width: 160,
                  },
                ]}
                data={[
                  {
                    costType: '国内机票',
                    date: '2021-01-01 至 2021-01-03',
                    days: '3',
                    city: '上海',
                    dailyStandard: '400',
                    currency: '人民币',
                    operator: '审批通过后可预订',
                    key: 1,
                  },
                ]}
              ></Table>
              <Divider />
              <Table
                columns={[
                  {
                    title: '费用类型',
                    dataKey: 'costType',
                  },
                  {
                    title: '出行日期',
                    dataKey: 'date',
                    width: 240,
                  },
                  {
                    title: '航程类型',
                    dataKey: 'voyageType',
                  },
                  {
                    title: '出发地',
                    dataKey: 'departure',
                  },
                  {
                    title: '到达地',
                    dataKey: 'destination',
                  },
                  {
                    title: '舱等',
                    dataKey: 'class',
                  },
                  {
                    title: '操作',
                    dataKey: 'operator',
                    width: 160,
                  },
                ]}
                data={[
                  {
                    costType: '国内机票',
                    date: '2021-01-01 至 2021-01-03',
                    voyageType: '往返',
                    departure: '武汉',
                    destination: '北京',
                    class: '经济舱',
                    operator: '审批通过后可预订',
                    key: 1,
                  },
                ]}
              ></Table>
              <Divider />
              <Table
                columns={[
                  {
                    title: '费用类型',
                    dataKey: 'costType',
                  },
                  {
                    title: '入住日期',
                    dataKey: 'date',
                    width: 240,
                  },
                  {
                    title: '天数',
                    dataKey: 'days',
                  },
                  {
                    title: '城市',
                    dataKey: 'city',
                  },
                  {
                    title: '每日标准',
                    dataKey: 'dailyStandard',
                  },
                  {
                    title: '币种',
                    dataKey: 'currency',
                  },
                  {
                    title: '操作',
                    dataKey: 'operator',
                    width: 160,
                  },
                ]}
                data={[
                  {
                    costType: '国内机票',
                    date: '2021-01-01 至 2021-01-03',
                    days: '3',
                    city: '上海',
                    dailyStandard: '400',
                    currency: '人民币',
                    operator: '审批通过后可预订',
                    key: 1,
                  },
                ]}
              ></Table>
              <Divider />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card loading={loading} bordered={false} title="审批进度">
              <Timeline
                type="right"
                data={[
                  {
                    title: '业务领导审批',
                    content: (
                      <Timeline
                        type="right"
                        data={[
                          {
                            title: (
                              <Spacer>
                                <Avatar initials="ZS"></Avatar>
                                <Spacer direction="column" align="flex-start" gap={2}>
                                  <span
                                    style={{
                                      fontSize: 14,
                                      color: '#1F2733',
                                      fontWeight: 600,
                                      lineHeight: '20px',
                                    }}
                                  >
                                    {'张三'}
                                  </span>
                                  <Spacer>
                                    <Tag type="success">同意</Tag>
                                    <span
                                      style={{
                                        fontSize: 14,
                                        color: '#5F6A7A',
                                        lineHeight: '20px',
                                      }}
                                    >
                                      这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批
                                    </span>
                                  </Spacer>
                                </Spacer>
                              </Spacer>
                            ),
                          },
                          {
                            title: (
                              <Spacer>
                                <Avatar initials="ZS"></Avatar>
                                <Spacer direction="column" align="flex-start" gap={2}>
                                  <span
                                    style={{
                                      fontSize: 14,
                                      color: '#1F2733',
                                      fontWeight: 600,
                                      lineHeight: '20px',
                                    }}
                                  >
                                    {'李四'}
                                  </span>
                                  <Spacer>
                                    <Tag type="warning">待审批</Tag>
                                  </Spacer>
                                </Spacer>
                              </Spacer>
                            ),
                          },
                          {
                            title: (
                              <Spacer>
                                <Avatar initials="LS"></Avatar>
                                <Spacer direction="column" align="flex-start" gap={2}>
                                  <span
                                    style={{
                                      fontSize: 14,
                                      color: '#1F2733',
                                      fontWeight: 600,
                                      lineHeight: '20px',
                                    }}
                                  >
                                    {'王五'}
                                  </span>
                                  <Spacer>
                                    <Tag type="warning">待审批</Tag>
                                  </Spacer>
                                </Spacer>
                              </Spacer>
                            ),
                          },
                        ]}
                      />
                    ),
                  },
                  {
                    title: '起草节点',
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
