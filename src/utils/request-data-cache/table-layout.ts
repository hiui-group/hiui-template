import {RequestDataCacheType} from "./index";

const PageRoutePrefix = 'table-layout'

const tableDataCache = (() => {
  const result = []
  const names = ['赛文', '杰克', '艾斯', '泰罗', '雷欧', '迪迦', '戴拿', '盖亚', '高斯', '奈克瑟斯', '梦比优斯']
  const jobs = [{
    title: '宇宙警备队队长',
    code: '1'
  }, {
    title: '次元守护者',
    code:'2'
  }]
  const levels = [{
    title: '高级',
    code: '1'
  }, {
    title: '中级',
    code: '2'
  }, {
    title: '初级',
    code: '3'
  }]

  for (let counter = 0; counter < 100; counter++) {
    result.push({
      id: counter,
      avatar: `https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/0${Math.ceil(Math.random() * 6)}.jpeg`,
      name: names[Math.floor(names.length * Math.random())],
      miCode: '1111111',
      phone: '12345678901',
      job: jobs[Math.floor(jobs.length * Math.random())],
      jobNumber: String(Math.floor(Math.random() * 100000000)),
      level: levels[Math.floor(levels.length * Math.random())],
      email: '666666@universe.com'
    })
  }
  return result
})()

export const TableLayout: RequestDataCacheType = {
  [`${PageRoutePrefix}/department`]: {
    code: 200,
    data: [{
      title: '宇宙治安管理部',
      id: '1',
      children: [{
        title: 'M78星云分部',
        id: '2',
        children: [{
          title: '光之国',
          id: '3'
        }]
      }, {
        title: 'M79星云分部',
        id: '4'
      }, {
        title: 'M80星云分部',
        id: '5'
      }, {
        title: 'M81星云分部',
        id: '6'
      }, {
        title: 'M82星云分部',
        id: '7'
      }, {
        title: 'M83星云分部',
        id: '8'
      }]
    }, {
      title: '太平洋警察局',
      id: '9'
    }, {
      title: '阿姆斯特朗回旋究极内卷次元宇宙管理部',
      id: '10'
    }]
  },
  [`${PageRoutePrefix}/table`]: (config) => {
    const {data: {pageSize, current, keyword, jobCode, levelCode}} = config!

    const filteredData = tableDataCache
      .filter(item => jobCode ? item.job.code === jobCode : true)
      .filter(item => levelCode ? item.level.code === levelCode : true)
      .filter(item => keyword ? item.name.includes(keyword) || item.jobNumber.includes(keyword) || item.phone.includes(keyword) : true)

    return {
      code: 200,
      data:{
        total: filteredData.length,
        items: filteredData.slice(pageSize * (current - 1), pageSize * current)
      }
    }
  }
}
