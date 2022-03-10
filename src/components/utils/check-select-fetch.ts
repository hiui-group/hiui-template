/**
 * Hiui4.0组件中，checkList组件的dataSource参数处理，简化传参
 * <CheckSelect searchable clearable
    dataSource={(keyword) => checkSelectFetch(getTypeOptions, keyword)}
   />
 * @param asyncFunction 数据获取异步函数
 * @param params 数据获取参数
 * @returns Promise
 */
export const checkSelectFetch = (asyncFunction: any, params: any) => {
  return asyncFunction(params)
    .then((res: any) => {
      return res?.data?.list || []
    })
    .catch(() => {
      return []
    })
}
