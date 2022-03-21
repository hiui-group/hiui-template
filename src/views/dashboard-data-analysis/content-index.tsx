import Loading from '@hi-ui/loading';
import Table from '@hi-ui/table'
import React, {useCallback, useEffect, useState} from 'react'
import {fetchContentIndex} from "./api";

export const ContentIndex = () => {
  const [data, setData] = useState<any[]>([])
  const [isInFetching, setIsInFetching] = useState(true)

  useEffect(() => {
    setIsInFetching(true)
    fetchContentIndex().then(result => {
      setData(result.data)
      setIsInFetching(false)
    })
  },[])

  const renderTitlePrefix = useCallback((sort: number) => {
    let imgUrl = 'https://cnbj1.fds.api.xiaomi.com/hiui-template/resources/'
    if(sort > 2){
      return <div style={{background:'#BDE2EF',color:'#237FFA',borderRadius:'4px',width:'16px',lineHeight:'16px', textAlign:'center', fontSize:'12px'}}>{sort+1}</div>
    }else if(sort === 2){
      imgUrl += 'copper.svg'
    }else if(sort === 1){
      imgUrl += 'silver.svg'
    }else{
      imgUrl += 'gold.svg'
    }

    return <img src={imgUrl}/>

  },[])

  return (
    <Loading visible={isInFetching}>
      <Table
        data={data}
        fieldKey={'id'}
        striped
        columns={[
          {
            dataKey: 'title',
            title: '服务单号',
            render: (text,record) => {
              return <div style={{display:'flex',alignItems:'center',gap:'8px'}}>{renderTitlePrefix(record.sort)}{text}</div>
            }
          },
          {
            dataKey: 'view',
            title: '浏览量',
            width: 90,
            align:'center'
          }, {
            dataKey: 'person',
            title: '人数',
            width: 90,
            align:'center'
          }, {
            dataKey: 'viewPercentage',
            title: '查看率',
            width: 90,
            align:'center',
            render: (text) => `${text}%`
          }
        ]}
      />
    </Loading>
  )
}

