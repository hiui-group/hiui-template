/**
 * Hiui4.0组件中，checkList组件的dataSource参数处理，简化传参
 * <CheckSelect searchable clearable
    dataSource={(keyword) => checkListFetch(getTypeOptions, keyword)}
   />
 * @param asyncFunction 数据获取异步函数
 * @param params 数据获取参数
 * @returns Promise
 */
export const checkListFetch = (asyncFunction: any, params: any) => {
  /**
   * 兼容四种数据返回格式
   * 格式一: {data: []}
   * 格式二: {data: { list: [], total: 10}}
   * 格式三: {body: []}
   * 格式三: {body: { list: [], total: 10}}
   */
  return asyncFunction(params)
    .then((res: any) => {
      return res
        ? Object.prototype.hasOwnProperty.call(res, 'data')
          ? Object.prototype.hasOwnProperty.call(res.data, 'list')
            ? res.data.list
            : res.data
          : Object.prototype.hasOwnProperty.call(res.body, 'list')
          ? res.body.list
          : res.body
        : []
    })
    .catch(() => {
      return []
    })
}
