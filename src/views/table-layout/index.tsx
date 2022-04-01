import { Avatar, Button, Pagination, Table, Tree, TreeNodeData } from '@hi-ui/hiui'
import { PlusOutlined, SearchOutlined } from '@hi-ui/icons'
import { Input } from '@hi-ui/input'
import { ContentHeader } from '../../components/content-header'
import Card from '@hi-ui/card'
import Select from '@hi-ui/select'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchDepartment, fetchTableContent } from './api'
import { Loading } from '@hi-ui/loading'
import './index.scss'
import { Result } from '@hi-ui/result'
import { Divider } from '../../components'
import { SelectDataItem } from '@hi-ui/select/lib/types/types'

const prefix = 'hi-pro-table-layout'

const JobSelectData: SelectDataItem[] = [
  {
    title: '宇宙警备队队长',
    id: '1',
  },
  {
    title: '次元守护者',
    id: '2',
  },
]

const LevelSelectData: SelectDataItem[] = [
  {
    title: '高级',
    id: '1',
  },
  {
    title: '中级',
    id: '2',
  },
  {
    title: '初级',
    id: '3',
  },
]

export const TableLayout = () => {
  const [departments, setDepartments] = useState<Record<string, any>[]>([])
  const [isFetchingDepartments, setIsFetchingDepartments] = useState(true)
  const [isFetchingPerson, setIsFetchingPerson] = useState(true)
  const [selectDepartmentCode, setSelectDepartmentCode] = useState<string>('')
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [current, setCurrent] = useState(1)
  const [personInfoList, setPersonInfoList] = useState<Record<string, any>[]>([])
  const [fetchingPersonToggle, setFetchingPersonToggle] = useState(0)
  const [searchPersonKeyword, setSearchPersonKeyword] = useState('')
  const [selectJobCode, setSelectJobCode] = useState('')
  const [selectLevelCode, setSelectLevelCode] = useState('')

  useEffect(() => {
    setIsFetchingDepartments(true)
    fetchDepartment().then((e) => {
      setDepartments(e.data)
      if (e.data.length > 0) {
        // 默认选中第一个
        setSelectDepartmentCode(e.data[0].id)
        setFetchingPersonToggle((pre) => pre + 1)
      }
      setIsFetchingDepartments(false)
    })
  }, [])

  useEffect(() => {
    if (fetchingPersonToggle > 0) {
      setIsFetchingPerson(true)

      fetchTableContent({
        pageSize,
        current,
        keyword: searchPersonKeyword,
        jobCode: selectJobCode,
        levelCode: selectLevelCode,
        departmentCode: selectDepartmentCode,
      }).then((e) => {
        setTotal(e.data.total)
        setPersonInfoList(e.data.items)
        setIsFetchingPerson(false)
      })
    }
  }, [fetchingPersonToggle])

  const displayDepartments = useMemo<TreeNodeData[]>(() => {
    const transformer = (item: any): TreeNodeData => ({
      title: item.title,
      id: item.id,
      children: (item.children || []).map(transformer),
    })

    return departments.map(transformer)
  }, [departments])

  const reset = useCallback(() => {
    // 清空数据，重置
    setPersonInfoList([])
    setSearchPersonKeyword('')
    setSelectJobCode('')
    setSelectLevelCode('')
    setTotal(0)
    setCurrent(1)
    setPageSize(10)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className={prefix}>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: '左树右表',
          },
        ]}
        title="左树右表"
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
      <div style={{ flex: 1, overflow: 'hidden', margin: '20px', display: 'flex' }}>
        <Card
          className={`${prefix}__department-card`}
          bordered={false}
          style={{
            marginRight: '16px',
            height: '100%',
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Loading visible={isFetchingDepartments}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Input prefix={<SearchOutlined />} clearable placeholder={'搜索'} />
              <div style={{ marginTop: '8px', flex: '1' }}>
                {!isFetchingDepartments && displayDepartments.length === 0 ? (
                  <Result title={'暂无数据'} style={{ height: '100%', justifyContent: 'center' }} />
                ) : (
                  <Tree
                    data={displayDepartments}
                    selectedId={selectDepartmentCode}
                    onSelect={(e) => {
                      setSelectDepartmentCode(e as string)
                      reset()
                      setFetchingPersonToggle((pre) => pre + 1)
                    }}
                  />
                )}
              </div>
            </div>
          </Loading>
        </Card>
        <Card
          bordered={false}
          style={{ flex: 1, height: '100%' }}
          className={`${prefix}__content-card`}
        >
          <Loading visible={isFetchingPerson}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', marginBottom: '16px', marginTop: '4px' }}>
                <Input
                  placeholder={'姓名/工号/手机号'}
                  suffix={<SearchOutlined />}
                  style={{ flex: 1, marginRight: '12px', maxWidth: '246px' }}
                  value={searchPersonKeyword}
                  onChange={(e) => setSearchPersonKeyword(e.target.value)}
                  clearable
                />
                <Select
                  placeholder={'职位'}
                  style={{ flex: 1, marginRight: '12px', maxWidth: '246px' }}
                  data={JobSelectData}
                  value={selectJobCode}
                  onChange={(e) => setSelectJobCode(e as string)}
                />
                <Select
                  placeholder={'级别'}
                  style={{ flex: 1, marginRight: '12px', maxWidth: '246px' }}
                  data={LevelSelectData}
                  value={selectLevelCode}
                  onChange={(e) => setSelectLevelCode(e as string)}
                />
                <Button
                  onClick={() => {
                    reset()
                    setFetchingPersonToggle((pre) => pre + 1)
                  }}
                >
                  重置
                </Button>
                <Button
                  type={'secondary'}
                  onClick={() => {
                    setFetchingPersonToggle((pre) => pre + 1)
                  }}
                >
                  查询
                </Button>
              </div>
              <Divider />
              <div style={{ flex: 1, overflow: 'auto' }}>
                <Table
                  sticky
                  striped
                  data={personInfoList}
                  fieldKey={'id'}
                  columns={[
                    {
                      title: '成员',
                      dataKey: 'id',
                      render: (_t, record) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            size={'sm'}
                            src={record.avatar}
                            shape={'square'}
                            style={{ boxShadow: '0 0 8px #aaaaaa33', marginRight: '6px' }}
                          />
                          <div>
                            <div
                              style={{
                                color: '#1F2733',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                lineHeight: '20px',
                              }}
                            >
                              {record.name}
                            </div>
                            <div style={{ color: '#5F6A7A', fontSize: '12px', lineHeight: '20px' }}>
                              {record.jobNumber}
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: '米聊号/手机号',
                      dataKey: 'miCode',
                      render: (_t, record) => (
                        <div>
                          <div style={{ color: '#1F2733', fontSize: '14px', lineHeight: '20px' }}>
                            {record.miCode}
                          </div>
                          <div style={{ color: '#5F6A7A', fontSize: '12px', lineHeight: '20px' }}>
                            {record.phone}
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: '职级',
                      dataKey: 'level',
                      render: (_t, record) => (
                        <div>
                          <div style={{ color: '#1F2733', fontSize: '14px', lineHeight: '20px' }}>
                            {record.job.title}
                          </div>
                          <div style={{ color: '#5F6A7A', fontSize: '12px', lineHeight: '20px' }}>
                            {record.level.title}
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: '邮箱',
                      dataKey: 'email',
                    },
                    {
                      title: '操作',
                      dataKey: 'custom-action',
                    },
                  ]}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  boxShadow: '0px -2px 4px 0px rgba(31, 39, 51, 0.1)',
                  paddingTop: '20px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  marginLeft: '-20px',
                  width: '100%',
                  boxSizing: 'content-box',
                }}
              >
                <Pagination
                  pageSize={pageSize}
                  total={total}
                  showTotal
                  showJumper
                  pageSizeOptions={[10, 20, 30]}
                  current={current}
                  onPageSizeChange={(newPageSize, newCurrent) => {
                    setPageSize(newPageSize)
                    setCurrent(newCurrent)
                    setFetchingPersonToggle((pre) => pre + 1)
                  }}
                  onChange={(cur, prev, newPageSize) => {
                    setPageSize(newPageSize)
                    setCurrent(cur)
                    setFetchingPersonToggle((pre) => pre + 1)
                  }}
                />
              </div>
            </div>
          </Loading>
        </Card>
      </div>
    </div>
  )
}
