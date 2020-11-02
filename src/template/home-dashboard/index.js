import React,{Component} from 'react'
import Cls from 'classnames'
import {  Grid, Loading } from '@hi-ui/hiui'
import Axios from 'axios'
import './index.scss'


const { Row, Col } = Grid

export default class HomeDashboard extends Component{
    state = {
        tabInfos: [],
        isLoadingData: true,
        nowActiveTabId: 0
    }

    async componentDidMount(){
        this.setState({isLoadingData: true})
        // 获取面板分类信息
        const {data: {data = []} } = await Axios.get('/api/home-dashboard/tabs')
        this.setState({tabInfos:data})
        // 做容错处理，以防止后端传回数据为空
        this.setState({nowActiveTabId:(data[0] || {}).id})

        this.setState({isLoadingData: false})
    }

    renderTabInfos(){
        const { tabInfos, nowActiveTabId } = this.state
        const changeActiveTabDel = (newActiveId) => {
            if(newActiveId !== nowActiveTabId){
                this.setState({nowActiveTabId: newActiveId})
            }
        }
        return (
            <Col>
                {
                    tabInfos.map(({title,id}) => {
                        const tagClassName = Cls('tag-btn',{
                            active: id === nowActiveTabId
                        })

                        return <span onClick={() => changeActiveTabDel(id)} key={id} className={tagClassName}>{title}</span>
                    })
                }
            </Col>
        )
    }

    render (){
        const { isLoadingData } = this.state
        return (
            <div className="page page--dashboard">
                <Row justify='space-between'>
                    <Col>
                        <span className='dashboard-title'>首页</span>
                    </Col>
                    {this.renderTabInfos()}
                </Row>
                {/* loading状态遮罩，通过css修改为了透明背景，在Loading时页面无法操作 */}
                {isLoadingData && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}
            </div>
            

        )
    }
}