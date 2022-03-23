import * as React from 'react'
import { Alert, Avatar, Button, Card, Carousel, Grid, List, Tag, Timeline } from '@hi-ui/hiui'
import {
  BuildingFilled,
  CheckOutlined,
  EditOutlined,
  EyeOutlined,
  MailOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SettingOutlined,
  StarOutlined,
} from '@hi-ui/icons'
import { Spacer } from '../../components/spacer'
import * as Icons from '@hi-ui/icons'
import { Divider } from '../../components'
import { fetchDashboardWorkbenchData } from './api'

export type IconKeyNames = keyof typeof Icons

const { Row, Col } = Grid

const prefix = 'hi-pro-dashboard-workbench'

const contentPlaceholder = '-'

// 荣誉排名展示样式配置
const HONOR_RANK_MAP = {
  1: {
    badge: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/hi-pro-honor-1-%402x.png',
    rank: 1,
    color: '#FEFAE0',
  },
  2: {
    badge: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/hi-pro-honor-2-%402x.png',
    rank: 2,
    color: '#F5F7FA',
  },
  3: {
    badge: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/hi-pro-honor-3-%402x.png',
    rank: 3,
    color: '#F5F7FA',
  },
}

const CERTIFICATION_RANK_MAP = {
  1: {
    color: 'warning',
  },
  2: {
    color: 'primary',
  },
  3: {
    color: 'success',
  },
}

const calcGridRows = (data: any, column = 2) => {
  if (!Array.isArray(data)) return []

  return data.reduce((prev, cur) => {
    let lastRow = prev[prev.length - 1]
    // 折行
    if (!lastRow || lastRow.length === column) {
      lastRow = []
      prev.push(lastRow)
    }
    lastRow.push(cur)
    return prev
  }, [])
}

export const DashboardWorkbench = () => {
  const [data, setData] = React.useState<Record<string, any> | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetchDashboardWorkbenchData()
      .then((result) => {
        setData(result.data!)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className={prefix}>
      <div style={{ padding: '20px 20px 83px' }}>
        <Row gutter>
          <Col span={18}>
            {/* 个人信息 */}
            <Row>
              <Col span={24}>
                <Card loading={loading} bordered={false} hoverable>
                  <Spacer justify="space-between" inline={false}>
                    <Spacer>
                      <Avatar
                        src={data ? data.userInfo.avatar : undefined}
                        icon={<BuildingFilled />}
                      />
                      <Spacer direction="column" align="flex-start" gap={0}>
                        <span
                          style={{
                            fontSize: 16,
                            color: '#1F2733',
                            lineHeight: '32px',
                            fontWeight: 600,
                          }}
                        >
                          {data ? data.userInfo.name : contentPlaceholder}
                        </span>
                        <Spacer
                          gap={12}
                          style={{
                            fontSize: 14,
                            color: '#5F6A7A',
                            lineHeight: '20px',
                          }}
                        >
                          <span>{data ? data.userInfo.company : contentPlaceholder}</span>
                          <span>{data ? data.userInfo.title : contentPlaceholder}</span>
                        </Spacer>
                      </Spacer>
                    </Spacer>

                    <div>
                      <Button type="secondary" icon={<QuestionCircleOutlined />}>
                        我要提问
                      </Button>
                      <Button type="primary" icon={<EditOutlined />}>
                        添加词条
                      </Button>
                    </div>
                  </Spacer>
                </Card>
              </Col>
            </Row>

            {/* banner */}
            <Row>
              <Col span={24}>
                <Carousel style={{ height: 180 }}>
                  {data
                    ? data.banners.map((item: any) => {
                        return (
                          <img
                            key={item.imgUrl}
                            src={item.imgUrl}
                            alt={item.title}
                            style={{ width: '100%' }}
                            onClick={(item: any) => {
                              window.location.href = item.jumpUrl
                            }}
                          />
                        )
                      })
                    : null}
                </Carousel>
              </Col>
            </Row>

            {/* 学习模块 */}
            <Row>
              <Col span={24}>
                <Card
                  hoverable
                  loading={loading}
                  bordered={false}
                  title="学习"
                  extra={
                    <>
                      {data && data.study.courseCountToLearn > 0 ? (
                        <Button appearance="link" type="primary">
                          {data.study.courseCountToLearn} 条 待学习
                        </Button>
                      ) : null}
                      <Button icon={<RightOutlined />} appearance="link"></Button>
                    </>
                  }
                >
                  <div style={{ minHeight: 200 }}>
                    {data
                      ? calcGridRows(data.study.courses).map((row: any, index: number) => {
                          // const span = 24 / row.length
                          return (
                            <Row key={index} gutter>
                              {row.map((item: any) => {
                                return (
                                  <Col span={12}>
                                    <Card
                                      bordered={false}
                                      style={{ backgroundColor: '#F5F7FA' }}
                                      title={item.title}
                                    >
                                      <Spacer justify="space-between" inline={false}>
                                        <Spacer>
                                          <span>{item.organization}</span>
                                          <span>
                                            距离结束
                                            <span
                                              style={{
                                                color: item.remainingDays < 3 ? 'red' : undefined,
                                                margin: '0 4px',
                                              }}
                                            >
                                              {item.remainingDays}
                                            </span>
                                            天
                                          </span>
                                        </Spacer>
                                        <Spacer direction="row-reverse">
                                          {item.learners.map((item: any) => {
                                            return (
                                              <Avatar
                                                style={{ marginLeft: -20 }}
                                                src={item.avatar}
                                                size="xs"
                                                key={item.avatar}
                                              />
                                            )
                                          })}
                                        </Spacer>
                                      </Spacer>
                                    </Card>
                                  </Col>
                                )
                              })}
                            </Row>
                          )
                        })
                      : null}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 考试模块 */}
            <Row>
              <Col span={24}>
                <Card
                  hoverable
                  loading={loading}
                  bordered={false}
                  title="考试"
                  extra={
                    <>
                      {data && data.exam.courseCountToExam > 0 ? (
                        <Button appearance="link" type="primary">
                          {data.exam.courseCountToExam} 场 待考试
                        </Button>
                      ) : null}
                      <Button icon={<RightOutlined />} appearance="link"></Button>
                    </>
                  }
                >
                  <div style={{ minHeight: 100 }}>
                    {data
                      ? calcGridRows(data.exam.exams).map((row: any, index: number) => {
                          return (
                            <Row key={index} gutter>
                              {row.map((item: any) => {
                                return (
                                  <Col span={12}>
                                    <Card
                                      bordered={false}
                                      style={{ backgroundColor: '#F5F7FA' }}
                                      title={item.title}
                                    >
                                      <Spacer justify="space-between" inline={false}>
                                        <Spacer>
                                          <span>{item.organization}</span>
                                          <span>
                                            {item.durationMinutes}
                                            分钟
                                          </span>
                                        </Spacer>
                                        <Button
                                          size="lg"
                                          shape="round"
                                          type="secondary"
                                          icon={<EditOutlined />}
                                        ></Button>
                                      </Spacer>
                                    </Card>
                                  </Col>
                                )
                              })}
                            </Row>
                          )
                        })
                      : null}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 认证 & 动态 模块 */}
            <Row gutter>
              <Col span={12}>
                <Card
                  hoverable
                  bordered={false}
                  scrollHeight={440}
                  title="认证"
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                >
                  <List
                    bordered={false}
                    style={{ minHeight: 440, paddingLeft: 0, paddingRight: 0 }}
                    render={(itemProps: any) => {
                      return (
                        <List.Item
                          {...itemProps}
                          title={
                            <Spacer gap={10}>
                              <span>{itemProps.title}</span>
                              {/* @ts-ignore */}
                              <Tag type={CERTIFICATION_RANK_MAP[itemProps.rank].color}>
                                {itemProps.type}
                              </Tag>
                            </Spacer>
                          }
                          extra={
                            <span>
                              <span style={{ borderRight: '1px solid #f2f4f7', paddingRight: 8 }}>
                                {itemProps.type}
                              </span>
                              <span style={{ marginLeft: 8 }}>{itemProps.publishTime}</span>
                            </span>
                          }
                          action={
                            itemProps.acquired ? (
                              <Button shape="round" icon={<CheckOutlined />}>
                                已获取
                              </Button>
                            ) : (
                              <Button shape="round" type="secondary" icon={<PlusOutlined />}>
                                获取
                              </Button>
                            )
                          }
                        />
                      )
                    }}
                    data={data ? data.certification.list : []}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  hoverable
                  bordered={false}
                  scrollHeight={440}
                  title="动态"
                  loading={loading}
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                >
                  <Timeline
                    type="right"
                    style={{ minHeight: 440 }}
                    data={
                      data
                        ? data.activities.list.map((item: any) => {
                            // @ts-ignore
                            const Icon = Icons[item.icon]
                            return {
                              icon: (
                                <Button
                                  // as={'span'}
                                  shape="round"
                                  type={item.iconColor}
                                  size="sm"
                                  icon={<Icon />}
                                />
                              ),
                              title: (
                                <Card
                                  style={{ backgroundColor: '#F5F7FA' }}
                                  bordered={false}
                                  size="sm"
                                  title={
                                    <Spacer gap={8}>
                                      <Avatar size="xs" src={item.author.avatarUrl} />
                                      <span>{item.author.name}</span>
                                      <span>{item.action}</span>
                                    </Spacer>
                                  }
                                >
                                  <div>{item.content}</div>
                                  <div style={{ color: '#929AA6', fontSize: 12, marginTop: 6 }}>
                                    {item.time}
                                  </div>
                                </Card>
                              ),
                            }
                          })
                        : []
                    }
                  />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Card
                  title="课程推荐"
                  bordered={false}
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                />
              </Col>
            </Row>

            <Row rowGap={8} gutter>
              {data
                ? data.study.recommends.slice(0, 4).map((itemProps: any) => {
                    return (
                      <Col span={6}>
                        <Card
                          hoverable
                          title={itemProps.title}
                          subtitle={itemProps.organization}
                          bordered={false}
                          cover={
                            <img
                              style={{ width: '100%' }}
                              src={itemProps.coverUrl}
                              alt={itemProps.title}
                            />
                          }
                        >
                          <Spacer gap={20}>
                            <Spacer gap={4}>
                              <EyeOutlined />
                              <span>{itemProps.viewCount}</span>
                            </Spacer>
                            <Spacer gap={4}>
                              <MailOutlined />
                              <span>{itemProps.commentCount}</span>
                            </Spacer>
                            <Spacer gap={4}>
                              <StarOutlined />
                              <span>{itemProps.collectionCount}</span>
                            </Spacer>
                          </Spacer>

                          <Divider marginTop={18} marginBottom={12} />
                          <Spacer inline={false} style={{ justifyContent: 'space-between' }}>
                            <Spacer>
                              <Avatar size="xs" src={itemProps.avatar}></Avatar>
                              <span>{itemProps.author}</span>
                            </Spacer>

                            <span>{itemProps.publishTime}</span>
                          </Spacer>
                        </Card>
                      </Col>
                    )
                  })
                : null}
            </Row>

            <Row gutter>
              <Col span={12}>
                <Card
                  title="问答"
                  hoverable
                  scrollHeight={440}
                  bordered={false}
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                >
                  <List
                    bordered={false}
                    style={{
                      minHeight: 440,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                    render={(itemProps: any) => {
                      return (
                        <List.Item
                          {...itemProps}
                          description={
                            <Spacer direction="column" inline={false} gap={10} align="start">
                              <Spacer>
                                <Spacer>
                                  <Avatar size="xs" src={itemProps.avatarUrl}></Avatar>
                                  <span>{itemProps.author}</span>
                                </Spacer>

                                <div>
                                  <span
                                    style={{ borderRight: '1px solid #f2f4f7', paddingRight: 8 }}
                                  >
                                    {itemProps.type}
                                  </span>
                                  <span style={{ marginLeft: 8 }}>{itemProps.publishTime}</span>
                                </div>
                              </Spacer>

                              <div>{itemProps.answer}</div>
                            </Spacer>
                          }
                          extra={
                            <Spacer gap={20}>
                              <Spacer gap={4}>
                                <EyeOutlined />
                                <span>{itemProps.viewCount}</span>
                              </Spacer>
                              <Spacer gap={4}>
                                <MailOutlined />
                                <span>{itemProps.commentCount}</span>
                              </Spacer>
                              <Spacer gap={4}>
                                <StarOutlined />
                                <span>{itemProps.collectionCount}</span>
                              </Spacer>
                            </Spacer>
                          }
                        />
                      )
                    }}
                    data={data ? data.faqs.list : []}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card
                  title="词条"
                  scrollHeight={440}
                  hoverable
                  bordered={false}
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                >
                  <List
                    bordered={false}
                    style={{
                      minHeight: 440,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                    render={(itemProps: any) => {
                      return (
                        <List.Item
                          {...itemProps}
                          description={
                            <Spacer direction="column" inline={false} gap={10} align="start">
                              <Spacer>
                                <Spacer>
                                  <Avatar size="xs" src={itemProps.avatarUrl}></Avatar>
                                  <span>{itemProps.author}</span>
                                </Spacer>

                                <div>
                                  <span
                                    style={{ borderRight: '1px solid #f2f4f7', paddingRight: 8 }}
                                  >
                                    {itemProps.type}
                                  </span>
                                  <span style={{ marginLeft: 8 }}>{itemProps.publishTime}</span>
                                </div>
                              </Spacer>

                              <div>{itemProps.answer}</div>
                            </Spacer>
                          }
                          extra={
                            <Spacer gap={20}>
                              <Spacer gap={4}>
                                <EyeOutlined />
                                <span>{itemProps.viewCount}</span>
                              </Spacer>
                              <Spacer gap={4}>
                                <MailOutlined />
                                <span>{itemProps.commentCount}</span>
                              </Spacer>
                              <Spacer gap={4}>
                                <StarOutlined />
                                <span>{itemProps.collectionCount}</span>
                              </Spacer>
                            </Spacer>
                          }
                        />
                      )
                    }}
                    data={data ? data.words.list : []}
                  />
                </Card>
              </Col>
            </Row>

            {/* 行业专家 */}
            <Row>
              <Col span={24}>
                <Card
                  title="行业专家"
                  bordered={false}
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                />
              </Col>
            </Row>

            <Row rowGap={8} gutter>
              {data
                ? data.industryExperts.list.slice(0, 4).map((item: any) => {
                    // @ts-ignore
                    const honorItem = HONOR_RANK_MAP[item.honorRank]

                    return (
                      <Col span={6}>
                        <Card bordered={false} hoverable>
                          <Spacer direction="column" align="center" inline={false}>
                            <Avatar src={item.avatar} />
                            <strong>{item.name}</strong>
                            <span style={{ fontSize: 12 }}>{item.description}</span>
                            <Alert
                              style={{ textAlign: 'center' }}
                              showIcon={false}
                              closeable={false}
                              title={
                                <Spacer>
                                  <img
                                    style={{ width: 16, height: 16 }}
                                    src={honorItem.badge}
                                    alt={honorItem.rank}
                                  />
                                  <span>{item.honor}</span>
                                </Spacer>
                              }
                            />
                            {item.followed ? (
                              <Button type="default" icon={<CheckOutlined />}>
                                已关注
                              </Button>
                            ) : (
                              <Button type="primary" icon={<PlusOutlined />}>
                                关注
                              </Button>
                            )}
                          </Spacer>
                        </Card>
                      </Col>
                    )
                  })
                : null}
            </Row>
          </Col>

          <Col span={6}>
            {/* 我的关注 */}
            <Row>
              <Col span={24}>
                <Card
                  hoverable
                  title="关注"
                  loading={loading}
                  extra={<Button icon={<SettingOutlined />} appearance="link"></Button>}
                  bordered={false}
                >
                  <div style={{ marginTop: -12, minHeight: 12 }}>
                    {data
                      ? data.userInfo.myCollection.map((item: any) => {
                          return (
                            <Tag key={item.id} style={{ marginTop: 12 }} size="lg">
                              {item.title}
                            </Tag>
                          )
                        })
                      : null}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 快捷入口 */}
            <Row>
              <Col span={24}>
                <Card bordered={false} hoverable>
                  <div style={{ marginTop: -12 }}>
                    {[
                      {
                        id: 1,
                        title: '认证中心',
                        type: 'secondary' as const,
                        href: 'https://github.com/XiaoMi/hiui',
                        icon: 'ExpressionFilled' as IconKeyNames,
                      },
                      {
                        id: 2,
                        title: '预警中心',
                        type: 'danger' as const,
                        href: 'https://github.com/XiaoMi/hiui',
                        icon: 'BellFilled' as IconKeyNames,
                      },
                      {
                        id: 3,
                        title: '我的日程',
                        type: 'success' as const,
                        href: 'https://github.com/XiaoMi/hiui',
                        icon: 'EndDateFilled' as IconKeyNames,
                      },
                      {
                        id: 4,
                        title: '课程中心',
                        type: 'secondary' as const,
                        href: 'https://github.com/XiaoMi/hiui',
                        icon: 'AssetMonitorFilled' as IconKeyNames,
                      },
                      {
                        id: 5,
                        title: '客服中心',
                        type: 'secondary' as const,
                        // href: 'https://github.com/XiaoMi/hiui',
                        icon: 'CloudFilled' as IconKeyNames,
                      },
                      {
                        id: 6,
                        title: '管理常用',
                        type: 'default' as const,
                        href: 'https://github.com/XiaoMi/hiui',
                        icon: 'SettingFilled' as IconKeyNames,
                      },
                    ].map((item: any) => {
                      // @ts-ignore
                      const Icon = Icons[item.icon]

                      return (
                        <Spacer key={item.id} style={{ marginTop: 12 }}>
                          <Spacer
                            key={item.id}
                            style={{
                              width: 116,
                              paddingTop: 8,
                              height: 84,
                            }}
                            direction="column"
                            gap={6}
                          >
                            <Button
                              type={item.type}
                              size="lg"
                              href={item.href}
                              icon={<Icon />}
                            ></Button>
                            <span>{item.title}</span>
                          </Spacer>
                        </Spacer>
                      )
                    })}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 系统通告 */}
            <Row>
              <Col span={24}>
                <Card
                  title="通告"
                  hoverable
                  extra={
                    <>
                      {data && data.notice.noticeCountToRead > 0 ? (
                        <Button appearance="link" type="primary">
                          {data.notice.noticeCountToRead} 未读
                        </Button>
                      ) : null}
                      <Button icon={<RightOutlined />} appearance="link"></Button>
                    </>
                  }
                  bordered={false}
                >
                  <List
                    bordered={false}
                    render={(itemProps: any) => {
                      return (
                        <List.Item
                          {...itemProps}
                          extra={
                            <span>
                              <span style={{ borderRight: '1px solid #f2f4f7', paddingRight: 8 }}>
                                {itemProps.type}
                              </span>
                              <span style={{ marginLeft: 8 }}>{itemProps.publishTime}</span>
                            </span>
                          }
                        />
                      )
                    }}
                    data={data ? data.notice.list : []}
                  />
                </Card>
              </Col>
            </Row>

            {/* 列表 */}
            <Row>
              <Col span={24}>
                <Card
                  title="文档"
                  hoverable
                  extra={<Button icon={<RightOutlined />} appearance="link"></Button>}
                  bordered={false}
                >
                  <List
                    bordered={false}
                    render={(itemProps: any) => {
                      return (
                        <List.Item
                          {...itemProps}
                          avatar={itemProps.avatar}
                          // avatar={<div></div>}
                          extra={<span>{itemProps.publishTime}</span>}
                        />
                      )
                    }}
                    data={data ? data.docs.list : []}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
