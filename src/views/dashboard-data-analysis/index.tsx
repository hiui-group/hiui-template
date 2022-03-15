import {Button} from "@hi-ui/hiui";
import {
  AssetMonitorFilled,
  CalendarOutlined,
  CaretDownFilled,
  CaretUpFilled,
  DocumentFilled,
  EllipsisOutlined,
  ExpandOutlined,
  QuestionCircleFilled,
  ResetOutlined,
  StudentOutlined,
  TagFilled,
  UserFilled
} from "@hi-ui/icons";
import {ContentHeader} from "../../components/content-header";
import {useCallback, useEffect, useMemo, useState} from "react";
import {fetchThisMonth} from "./api";
import Card from "@hi-ui/card";
import {ViewTrend} from "./view-trend";


export const DashboardDataAnalysis = () => {

  const [thisMonth, setThisMonth] = useState<Record<string, any>>({})

  useEffect(() => {
    fetchThisMonth().then(result => {
      setThisMonth(result.data)
    })
  }, [])

  const thisMonthCards = useMemo(() => {
    const renderData = [{
      title: '本月访问量',
      icon: <AssetMonitorFilled/>,
      iconBackground: '#0DAEFF',
      data: thisMonth.view
    },
      {
        title: '本月用户数',
        icon: <UserFilled/>,
        iconBackground: '#4A9EFF',
        data: thisMonth.user
      }, {
        title: '本月新增词条',
        icon: <TagFilled/>,
        iconBackground: '#FE7840',
        data: thisMonth.entry
      }, {
        title: '本月新增问题',
        icon: <QuestionCircleFilled/>,
        iconBackground: '#FAB007',
        data: thisMonth.problem
      }, {
        title: '本月新增课程',
        icon: <StudentOutlined/>,
        iconBackground: '#4A9EFF',
        data: thisMonth.lesson
      }, {
        title: '本月新增文档',
        icon: <DocumentFilled/>,
        iconBackground: '#38D677',
        data: thisMonth.document
      }]

    return (
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
        {renderData.map(({title, icon, iconBackground, data}, index) => (
          <Card hoverable bordered={false} key={index} style={{flex: 1, minWidth: 184}}>
            <div style={{
              background: iconBackground,
              fontSize: '20px',
              color: '#fff',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>{icon}</div>
            <div style={{
              fontSize: '14px',
              color: '#1F2733',
              lineHeight: '20px'
            }}>{title}</div>
            <div style={{
              fontSize: '24px',
              color: '#1F2733',
              lineHeight: '34px',
              fontWeight: 800,
              marginBottom: '8px'
            }}>
              {String((data?.num || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div style={{
              color: '#5F6A7A',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderTop: '1px solid #EBEDF0',
              paddingTop: '8px'
            }}>
              较上月
              <div
                style={{
                  color: data?.diffPercentage > 0 ? '#FF5959' : '#14CA64',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                {(data?.diffPercentage)}%
                {data?.diffPercentage > 0 ? <CaretUpFilled/> : <CaretDownFilled/>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }, [thisMonth])

  const renderCardExtra = useCallback(() => {
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Button appearance={'link'} icon={<ExpandOutlined/>}/>
        <Button appearance={'link'} icon={<CalendarOutlined/>}/>
        <Button appearance={'link'} icon={<EllipsisOutlined/>}/>
      </div>
    )
  }, [])

  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'home',
          }, {
            title: '数据分析'
          }
        ]}
        title="数据分析"
        toolbar={
          <div>
            <Button icon={<ResetOutlined/>}/>
          </div>
        }
      />
      <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
        <div style={{flex: 1, maxWidth: '1704px'}}>
          {thisMonthCards}
          <div style={{display: 'flex', marginTop: '16px'}}>
            <Card bordered={false} hoverable style={{flex: 2, position: 'relative', overflow: "hidden"}}
                  extra={renderCardExtra()} title={'系统访问量走势'}>
              <ViewTrend style={{flex: 2, height: '324px'}}/>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
