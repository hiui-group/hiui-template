import {RequestDataCacheType} from "./index";

const PageRoutePrefix = 'table-layout'

export const TableLayout: RequestDataCacheType = {
  [`${PageRoutePrefix}/department`]: {
    code: 200,
    data: [{
      title: '宇宙治安管理部',
      id: 1,
      children:[{
        title: 'M78星云分部',
        id: 2,
        children:[{
          title: '光之国',
          id: 3
        }]
      },{
        title: 'M79星云分部',
        id: 4
      },{
        title: 'M80星云分部',
        id: 5
      },{
        title: 'M81星云分部',
        id: 6
      },{
        title: 'M82星云分部',
        id: 7
      },{
        title: 'M83星云分部',
        id: 8
      }]
    },{
      title: '太平洋警察局',
      id: 9
    },{
      title: '阿姆斯特朗回旋究极内卷次元宇宙管理部',
      id: 10
    }]
  }
}
