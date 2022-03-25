import React from 'react'
import { Input, Table, TableColumnItem } from '@hi-ui/hiui'
import { useUncontrolledState } from '@hi-ui/hooks'

const rowTextMap: any = {
  '9-10': '9:00-10:00',
  '10-11': '10:00-11:00',
  '14-15': '14:00-15:00',
  '15-16': '15:00-16:00',
  '16-17': '16:00-17:00',
  bookingNumber: '可预约人数',
  reservationNumber: '非预约人数',
  bookingMaximum: '预约最大值',
}

const rowKeys = Object.keys(rowTextMap)

const defaultFormValues = rowKeys.reduce((acc, cur) => {
  acc[cur] = {
    key: cur,
    windowName: rowTextMap[cur],
    monday: '0',
    tuesday: '0',
    wednesday: '0',
    thursday: '0',
    friday: '0',
    saturday: '0',
    sunday: '0',
  }

  return acc
}, {} as any)

export const TableInputGroup: React.FC<TableInputGroupProps> = ({
  onChange,
  value: valueProp,
  defaultValue = defaultFormValues,
}) => {
  const [value, tryChangeValue] = useUncontrolledState(defaultValue, valueProp, onChange)
  const tableDataMemo = React.useMemo(() => {
    return Object.values(value)
  }, [value])
  console.log(tableDataMemo)

  const tableColumnsMemo = React.useMemo(() => {
    return [
      {
        title: '窗口名称',
        dataKey: 'windowName',
      },
      {
        title: '周一',
        dataKey: 'monday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
      {
        title: '周二',
        dataKey: 'tuesday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
      {
        title: '周三',
        dataKey: 'wednesday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
      {
        title: '周四',
        dataKey: 'thursday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
      {
        title: '周五',
        dataKey: 'friday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
      {
        title: '周六',
        dataKey: 'saturday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
      {
        title: '周日',
        dataKey: 'sunday',
        render(val, rowData, rowIndex, dataKey) {
          return (
            <Input
              value={val}
              onChange={(evt) => {
                const value = evt.target.value
                tryChangeValue((prev: any) => {
                  return {
                    ...prev,
                    [rowData.key]: {
                      ...prev[rowData.key],
                      [dataKey]: value,
                    },
                  }
                })
              }}
            />
          )
        },
      },
    ] as TableColumnItem[]
  }, [tryChangeValue])

  return <Table columns={tableColumnsMemo} data={tableDataMemo}></Table>
}

interface TableRowFormData {
  windowName: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

interface TableFormData {
  '9-10': TableRowFormData
  '10-11': TableRowFormData
  '14-15': TableRowFormData
  '15-16': TableRowFormData
  '16-17': TableRowFormData
  bookingNumber: TableRowFormData
  reservationNumber: TableRowFormData
  bookingMaximum: TableRowFormData
}

interface TableInputGroupProps {
  onChange?: (value: TableFormData) => void
  value?: TableFormData
  defaultValue?: TableFormData
}
