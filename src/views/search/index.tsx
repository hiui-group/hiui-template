import React from 'react'
import {
  Button,
  Search as HiSearch,
  TabList,
  Grid,
  Card,
  List,
  Avatar,
  Tag,
  EmptyState,
} from '@hi-ui/hiui'
import {
  AppStoreOutlined,
  AssetMonitorOutlined,
  BookmarkOutlined,
  EyeOutlined,
  GlobalOutlined,
  MailOutlined,
  PinOutlined,
  SearchOutlined,
  StarOutlined,
} from '@hi-ui/icons'
import { Divider } from '../../components'
import { ContentHeader } from '../../components/content-header'
import Spacer from '@hi-ui/space'
import { useSearchParams } from 'react-router-dom'
import { fetchSearchRecommendedList, fetchSearchResultByKeyword } from './api'
import * as Icons from '@hi-ui/icons'

const { Row, Col } = Grid

const RECOMMENDED_DATA_COLOR_MAP: any = {
  1: {
    color: '#fff',
    backgroundColor: 'rgb(255, 79, 83)',
  },
  2: {
    color: '#fff',
    backgroundColor: 'rgb(255, 109, 65)',
  },
  3: {
    color: '#fff',
    backgroundColor: 'rgb(255, 166, 43)',
  },
  default: {
    color: 'rgb(44, 140, 246)',
    backgroundColor: 'rgb(220, 241, 253)',
  },
}

const SORT_RADIO_DATA = [
  { id: '1', title: '最新发布' },
  { id: '2', title: '最近更新' },
  { id: '3', title: '最热' },
]

const SEARCH_TAG_MAP = {
  1: {
    bgColor: '#F2F4F7',
    iconColor: 'rgb(255, 79, 83)',
    icon: 'DocumentFilled',
    title: '文档',
  },
  2: {
    bgColor: '#E2F3FE',
    iconColor: 'rgb(0, 116, 244)',
    icon: 'StudentFilled',
    title: '课程',
  },
  3: {
    bgColor: '#FEFAE0',
    iconColor: 'rgb(255, 166, 43)',
    icon: 'SoundFilled',
    title: '通知',
  },
  4: {
    bgColor: '#FEF0E5',
    iconColor: 'rgb(255, 109, 65)',
    icon: 'CertificateFilled',
    title: '问答',
  },
  5: {
    bgColor: '#E5FEEB',
    iconColor: 'rgb(0, 208, 113)',
    icon: 'TagFilled',
    title: '词条',
  },
}

export const Search = () => {
  const [keyword, setKeyword] = React.useState('')
  const [searchParams] = useSearchParams()
  const keywordUrlParam = searchParams.get('keyword')

  const [searchResultLoading, setSearchResultLoading] = React.useState(false)
  const [searchResultData, setSearchResultData] = React.useState<Record<string, any> | null>(null)
  console.log('searchResultData', searchResultData, keywordUrlParam)

  const [recommendedLoading, setRecommendedLoading] = React.useState(false)
  const [recommendedData, setRecommendedData] = React.useState<Record<string, any> | null>(null)

  const [tabId, setTabId] = React.useState<React.ReactText>('1')
  const [sortId, setSortId] = React.useState<React.ReactText>('1')
  /**
   * 搜索关键词同步
   */
  React.useEffect(() => {
    if (keywordUrlParam) {
      setKeyword(keywordUrlParam)
    }
  }, [keywordUrlParam])

  /**
   * 请求推荐列表数据
   */
  React.useEffect(() => {
    setRecommendedLoading(true)
    fetchSearchRecommendedList()
      .then((result) => {
        setRecommendedData(result.data!)
      })
      .finally(() => {
        setRecommendedLoading(false)
      })
  }, [])

  /**
   * 根据关键词，请求搜索结果列表数据
   */
  React.useEffect(() => {
    const getSearchResultByKeyword = (params: Record<string, any>) => {
      setSearchResultLoading(true)
      fetchSearchResultByKeyword(params)
        .then((result) => {
          setSearchResultData(result.data!)
        })
        .finally(() => {
          setSearchResultLoading(false)
        })
    }

    if (keyword) {
      // 对于真实搜索场景，需要取消上次请求，避免异步数据竞态
      getSearchResultByKeyword({ keyword, tabId, sortId })
    } else {
      setSearchResultData(null)
    }
  }, [keyword, tabId, sortId])

  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: '搜索',
          },
        ]}
      >
        <HiSearch
          style={{ maxWidth: 884 }}
          size="lg"
          placeholder="搜索"
          value={keyword}
          onChange={(keyword) => {
            setKeyword(keyword)
          }}
          append={
            <Button type="primary" size="lg" icon={<SearchOutlined />}>
              搜索
            </Button>
          }
        ></HiSearch>
      </ContentHeader>
      <TabList
        style={{ backgroundColor: '#fff' }}
        activeId={tabId}
        onChange={setTabId}
        data={[
          {
            tabId: '1',
            tabTitle: (
              <span>
                <AppStoreOutlined /> 全部
              </span>
            ),
          },
          {
            tabId: '2',
            tabTitle: (
              <span>
                <GlobalOutlined /> 知识
              </span>
            ),
          },
          {
            tabId: '3',
            tabTitle: (
              <span>
                <AssetMonitorOutlined /> 课程
              </span>
            ),
          },
          {
            tabId: '4',
            tabTitle: (
              <span>
                <PinOutlined /> 考试
              </span>
            ),
          },
          {
            tabId: '5',
            tabTitle: (
              <span>
                <BookmarkOutlined /> 认证
              </span>
            ),
          },
        ]}
      />

      <div style={{ padding: '20px 20px 0' }}>
        <Row gutter>
          <Col span={18}>
            <Card bordered={false} hoverable loading={searchResultLoading}>
              {searchResultData ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>累计为您找到 {searchResultData.total} 条数据</span>
                    <Spacer
                      size={12}
                      split={<span style={{ height: 14, width: 1, backgroundColor: '#DFE2E8' }} />}
                    >
                      {SORT_RADIO_DATA.map((item) => {
                        return (
                          <span
                            style={{
                              cursor: 'pointer',
                              color: sortId === item.id ? '#237ffa' : undefined,
                            }}
                            onClick={() => {
                              setSortId(item.id)
                            }}
                          >
                            {item.title}
                          </span>
                        )
                      })}
                    </Spacer>
                  </div>
                  <Divider marginTop={18} marginBottom={2} />
                  <List
                    bordered={false}
                    render={(itemProps: any) => {
                      // @ts-ignore
                      const tagItem = SEARCH_TAG_MAP[itemProps.type]
                      console.log(tagItem)

                      // @ts-ignore
                      const Icon = Icons[tagItem.icon]
                      return (
                        <List.Item
                          action={
                            itemProps.coverUrl ? (
                              <img
                                style={{ width: 138, height: 82, borderRadius: 4 }}
                                src={itemProps.coverUrl}
                                alt=""
                              />
                            ) : undefined
                          }
                          title={
                            <Spacer size={4}>
                              {/* @ts-ignore */}
                              <Tag background={tagItem.bgColor}>
                                <Icon style={{ color: tagItem.iconColor, marginRight: 4 }} />
                                {tagItem.title}
                              </Tag>
                              {itemProps.title}
                            </Spacer>
                          }
                          description={
                            <Spacer direction="column" inline={false} size={10} align="flex-start">
                              <Spacer>
                                <Spacer>
                                  <Avatar size="xs" src={itemProps.avatarUrl}></Avatar>
                                  <span>{itemProps.author}</span>
                                </Spacer>

                                <span>{itemProps.publishTime}</span>
                              </Spacer>

                              <div>{itemProps.answer}</div>
                            </Spacer>
                          }
                          extra={
                            <Spacer size={20}>
                              <Spacer size={4}>
                                <EyeOutlined />
                                <span>{itemProps.viewCount}</span>
                              </Spacer>
                              <Spacer size={4}>
                                <MailOutlined />
                                <span>{itemProps.commentCount}</span>
                              </Spacer>
                              <Spacer size={4}>
                                <StarOutlined />
                                <span>{itemProps.collectionCount}</span>
                              </Spacer>
                            </Spacer>
                          }
                        />
                      )
                    }}
                    data={searchResultData.list}
                  ></List>
                </>
              ) : (
                <div>
                  <EmptyState
                    style={{ padding: '160px 0' }}
                    title={
                      <div style={{ textAlign: 'center' }}>
                        <div>没有找到您想要的结果</div>
                        <div>您可以更换搜索关键字或者直接提问</div>
                      </div>
                    }
                  >
                    <Button type="primary">立即提问</Button>
                  </EmptyState>
                </div>
              )}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              bordered={false}
              hoverable
              title="热门搜索"
              size="sm"
              loading={recommendedLoading}
            >
              {recommendedData ? (
                recommendedData.list.map((item: any, index: number) => {
                  const num = index + 1
                  const colorItem =
                    RECOMMENDED_DATA_COLOR_MAP[num] || RECOMMENDED_DATA_COLOR_MAP['default']
                  return (
                    <Spacer
                      key={index}
                      inline={false}
                      style={{ display: 'flex', padding: '14px 0', cursor: 'pointer' }}
                      onClick={() => {
                        setKeyword(item.title)
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: colorItem.backgroundColor,
                          color: colorItem.color,
                          borderRadius: '6px',
                          flexShrink: 0,
                          lineHeight: '20px',
                          textAlign: 'center',
                        }}
                      >
                        {num}
                      </div>
                      <span>{item.title}</span>
                    </Spacer>
                  )
                })
              ) : (
                <div style={{ minHeight: 460 }}></div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
