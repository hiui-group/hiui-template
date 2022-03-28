import {Button, Pagination, Tree, TreeNodeData} from "@hi-ui/hiui";
import {PlusOutlined, SearchOutlined} from "@hi-ui/icons";
import {Input} from '@hi-ui/input'
import {ContentHeader} from "../../components/content-header";
import Card from "@hi-ui/card";
import Select from '@hi-ui/select'
import {useEffect, useMemo, useState} from "react";
import {fetchDepartment} from "./api";
import {Loading} from "@hi-ui/loading";
import './index.scss'
import {Result} from "@hi-ui/result";
import {Divider} from "../../components";

const prefix = 'hi-pro-table-layout'

export const TableLayout = () => {

  const [departments, setDepartments] = useState<Record<string, any>[]>([])
  const [isFetchingDepartments, setIsFetchingDepartments] = useState(false)
  const [selectDepartmentId, setSelectDepartmentId] = useState<number | undefined>(undefined)

  useEffect(() => {
    setIsFetchingDepartments(true)
    fetchDepartment().then(e => {
      setDepartments(e.data)
      if (e.data.length > 0) {
        // 默认选中第一个
        setSelectDepartmentId(e.data[0].id)
      }
      setIsFetchingDepartments(false)
    })
  }, [])

  const displayDepartments = useMemo<TreeNodeData[]>(() => {
    const transformer = (item: any): TreeNodeData => ({
      title: item.title,
      id: item.id,
      children: (item.children || []).map(transformer)
    })

    return departments.map(transformer)
  }, [departments])

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column'}} className={prefix}>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'home',
          }, {
            title: '左树右表'
          }
        ]}
        title="左树右表"
        toolbar={
          <div>
            <Button>次要操作</Button>
            <Button>次操作</Button>
            <Button icon={<PlusOutlined/>} type="primary">主操作</Button>
          </div>
        }
      />
      <div style={{flex: 1, overflow: "hidden", margin: '20px', display: 'flex'}}>
        <Card className={`${prefix}__department-card`} bordered={false}
              style={{marginRight: '20px', height: '100%', width: '240px', display: 'flex', flexDirection: 'column'}}>
          <Loading visible={isFetchingDepartments}>
            <div style={{display: "flex", flexDirection: 'column', height: '100%'}}>
              <Input prefix={<SearchOutlined/>} clearable placeholder={'搜索'}/>
              <div style={{marginTop: '8px', flex: '1'}}>
                {displayDepartments.length === 0 ?
                  <Result title={'暂无数据'} style={{height: '100%', justifyContent: 'center'}}/> :
                  <Tree data={displayDepartments} selectedId={selectDepartmentId}
                        onSelect={e => setSelectDepartmentId(e as number)}/>
                }
              </div>
            </div>
          </Loading>
        </Card>
        <Card bordered={false} style={{flex: 1, height: '100%'}}
              className={`${prefix}__content-card`}>
          <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100% - 40px)'}}>
            <div style={{display: 'flex', marginBottom: '16px'}}>
              <Input placeholder={'姓名/工号/手机号'} suffix={<SearchOutlined/>}
                     style={{flex: 1, marginRight: '12px', maxWidth: '246px'}}/>
              <Select placeholder={'职位'} style={{flex: 1, marginRight: '12px', maxWidth: '246px'}}/>
              <Select placeholder={'级别'} style={{flex: 1, marginRight: '12px', maxWidth: '246px'}}/>
              <Button>重置</Button>
              <Button type={'secondary'}>查询</Button>
            </div>
            <Divider/>
            <div style={{flex: 1}}></div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              boxShadow: '0px -2px 4px 0px rgba(31, 39, 51, 0.1)',
              paddingTop: '20px',
              paddingLeft:'20px',
              paddingRight:'20px',
              marginLeft:'-20px',
              width:'100%',
              boxSizing:'content-box'
            }}>
              <Pagination pageSize={10} total={100} showTotal showJumper pageSizeOptions={[10, 20, 30]}/>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
