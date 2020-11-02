/**
 * 首页-dashboard mock文件
 */
import { formatSuccessData } from './common'
export default (prefix,mockAxios,faker) => {
    const tabs = ['产品服务','客服','门店','售后','供应商']

    mockAxios.onGet(`${prefix}/tabs`).reply(200, 
        formatSuccessData(
            tabs.map((title,index) => ({id: index+1,title}))
        )
    )
}