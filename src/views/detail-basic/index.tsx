import * as React from 'react'
import { Avatar, Button, Card, Grid, Table, Tag, Timeline, List } from '@hi-ui/hiui'
import { BuildingFilled, PlusOutlined, WordColorful } from '@hi-ui/icons'
import { ContentHeader } from '../../components/content-header'
import { Spacer } from '../../components/spacer'
import { fetchBasicDetailData } from './api'
import Descriptions from '@hi-ui/descriptions'

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
            <Card loading={loading} bordered={false} hoverable>
              <Spacer>
                <Spacer>
                  <Avatar shape="square" icon={<BuildingFilled />}></Avatar>
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
            <Card loading={loading} bordered={false} title="差旅信息" hoverable>
              <Descriptions>
                {data
                  ? data.travelInfo.map((item: any, index: number) => {
                      return (
                        <Descriptions.Item key={index} label={item.label} span={item.span}>
                          {item.url ? (
                            <Button
                              icon={<WordColorful />}
                              appearance="link"
                              type="primary"
                              href={item.url}
                            >
                              {item.content}
                            </Button>
                          ) : (
                            item.content
                          )}
                        </Descriptions.Item>
                      )
                    })
                  : null}
              </Descriptions>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card loading={loading} bordered={false} title="行程明细" hoverable>
              {data
                ? data.tripDetail.map((item: any, index: number, items: any) => {
                    const isLast = items.length - 1 === index
                    return (
                      <Table
                        key={index}
                        columns={item.columns}
                        data={item.data}
                        style={{ marginBottom: isLast ? 0 : 16 }}
                      />
                    )
                  })
                : null}
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card hoverable loading={loading} bordered={false} title="审批进度">
              <Timeline
                type="right"
                data={
                  data
                    ? data.approvals.map((item: any) => {
                        return {
                          id: item.id,
                          title: item.title,
                          content: item.children ? (
                            <Spacer
                              inline={false}
                              gap={24}
                              direction="column"
                              align="flex-start"
                              style={{ marginTop: 16 }}
                            >
                              {item.children.map((item: any, index: number) => {
                                return (
                                  <Spacer key={index} inline={false} align="flex-start">
                                    <Avatar src={item.user.avatar}></Avatar>
                                    <Spacer direction="column" align="flex-start" gap={6}>
                                      <span
                                        style={{
                                          fontSize: 14,
                                          color: '#1F2733',
                                          fontWeight: 600,
                                          lineHeight: '20px',
                                        }}
                                      >
                                        {item.user.name}
                                      </span>
                                      <span>
                                        <Tag type={item.statusNumber === 0 ? 'warning' : 'success'}>
                                          {item.status}
                                        </Tag>
                                        <span
                                          style={{
                                            fontSize: 14,
                                            color: '#5F6A7A',
                                            lineHeight: '20px',
                                          }}
                                        >
                                          {item.content}
                                        </span>
                                      </span>

                                      <span
                                        style={{
                                          fontSize: 12,
                                          color: '#929AA6',
                                          lineHeight: '20px',
                                        }}
                                      >
                                        {item.time}
                                      </span>
                                    </Spacer>
                                  </Spacer>
                                )
                              })}
                            </Spacer>
                          ) : undefined,
                        }
                      })
                    : []
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
