import { useCallback, useEffect, useState } from 'react'

/**
 * 构建table数据集合
 * @param dataList
 * @returns {({} & T & {key: number})[]}
 */
function buildDataList(dataList: any) {
  return (dataList || []).map((item: any, i: any) =>
    Object.assign({}, item, { key: item.key ? item.key : item.id ? item.id : i })
  )
}

/**
 * hooks: 抽象统一列表获取数据时的各种状态
 * @param asyncFunction 获取列表数据的异步方法
 * @param params 获取列表数据的参数
 * @param defaultCanExecute 默认函数可执行状态，默认为true
 * @param customDeps 触发获取方法更新的依赖， 常有pageNum, searchCode等过滤字段
 * @returns 请求结束后返回的数据及执行器
 */
export function useListFetch(
  asyncFunction: Function,
  params: any,
  defaultCanExecute = true,
  customDeps = []
) {
  // 列表数据
  const [list, setList] = useState<any[]>([])

  // 数据总数
  const [total, setTotal] = useState<number>(10)

  // 报错信息
  const [error, setError] = useState(null)

  // 是否加载中
  const [loading, setLoading] = useState<boolean>(false)

  // 请求允许执行状态
  const [canExecute, setCanExecute] = useState<boolean>(defaultCanExecute)

  // 组装依赖
  const deps = [...Object.values(params), ...customDeps]

  const execute = useCallback(
    (getDidCancel = () => false) => {
      setLoading(true)
      return asyncFunction(params)
        .then((res: any) => {
          if (!getDidCancel()) {
            /**
             * 兼容四种数据返回格式
             * 格式一: {data: []}
             * 格式二: {data: { list: [], total: 10}}
             * 格式三: {body: []}
             * 格式三: {body: { list: [], total: 10}}
             */
            const data = Object.prototype.hasOwnProperty.call(res, 'data')
              ? res.data
              : Object.prototype.hasOwnProperty.call(res, 'body')
              ? res.body
              : {}
            const { list = [], total = 0 } = Object.prototype.hasOwnProperty.call(data, 'list')
              ? data
              : { list: data }
            setList(buildDataList(list || []))
            setTotal(total || 0)
            setError(null)
          }
        })
        .catch((e: any) => {
          if (!getDidCancel()) {
            setList([])
            setTotal(10)
            setError(e)
          }
        })
        .finally(() => {
          if (!getDidCancel()) {
            setLoading(false)
          }
        })
    },
    [asyncFunction, ...deps]
  )

  useEffect(() => {
    if (canExecute) {
      let didCancel = false
      execute(() => didCancel)
      return () => {
        didCancel = true
      }
    }
  }, [execute])

  useEffect(() => {
    setCanExecute(true)
  }, [...deps])

  return { loading, list, total, error, execute }
}
