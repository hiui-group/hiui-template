import React, { useEffect, useRef, useState } from 'react'
import { Icon, Popper, Switch } from '@hi-ui/hiui'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'
import './index.scss'

// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  // 删除并记录 删除元素
  const [removed] = result.splice(startIndex, 1)
  // 将原来的元素添加进数组
  result.splice(endIndex, 0, removed)
  return result
}

// 设置样式
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // 拖拽的时候背景变化
  border: isDragging ? '1px dashed #ddd' : '1px dashed #fff',
  borderRadius: '2px',
  ...draggableStyle
})

const kitPrefix = 'hiui-componentkit'

/**
 *
 * @typedef {Object} ColumnsControlPorps ColumnsControl 组件接受参数
 * @property {Function} reorderColumns 点击确定后，排序的回调方法 (columns) => void
 * @property {Number} optionsWidth 自定义下拉选项宽度
 * @property {Array<Object>} columns 表格列配置信息，对应hiui中的[table columns](https://infra.mioffice.cn/hiui/zh-CN/components/table)的配置
 * @property {String} title 名称
 * @property {String} icon 图标名称
 *
 * @param {Object} ColumnsControlPorps props
 */
const ColumnsControl = ({
  reorderColumns,
  optionsWidth = 276,
  columns: propsColumns = [],
  title = '列显示',
  icon = 'columns'
}) => {
  const PopperAttachEle = useRef()
  const [showPopper, setShowPopper] = useState(false)
  const [columns, setColumns] = useState(propsColumns)
  const cacheColumns = useRef(propsColumns)

  // 拖拽完成
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const items = reorder(columns, result.source.index, result.destination.index)
    setColumns(items)
  }
  useEffect(() => {
    showPopper && setColumns(cacheColumns.current)
  }, [showPopper])
  return (
    <div className={`${kitPrefix}-columnes`} key={`${kitPrefix}-columnes`}>
      <div
        className={`${kitPrefix}-columnes__attachele`}
        ref={PopperAttachEle}
        onClick={() => {
          setShowPopper(!showPopper)
        }}
      >
        <Icon name={icon} />
        <span className={`${kitPrefix}-columnes__attachele-text`}>{title}</span>
      </div>
      <Popper
        className={`${kitPrefix}-columnes__popper`}
        // 弹出层的显示隐藏
        show={showPopper}
        width={optionsWidth}
        topGap={5}
        // 依附的元素
        attachEle={PopperAttachEle.current}
        // 点击弹出层以及依附元素以外的区域时会触发该回调
        onClickOutside={() => {
          setShowPopper(false)
        }}
      >
        <div className={`${kitPrefix}-columnes__popper-content`}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => {
                return (
                  <ul className="columnes__items" {...provided.droppableProps} ref={provided.innerRef}>
                    {columns.map((item, index) => {
                      const { title, dataKey, visible } = item
                      return (
                        <Draggable key={dataKey} draggableId={dataKey} index={index}>
                          {(provided, snapshot) => (
                            <li
                              className="columnes__item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              <div className="columnes__item-left">
                                <Switch
                                  checked={visible}
                                  onChange={bol => {
                                    const _columns = _.cloneDeep(columns)
                                    _columns[index].visible = bol
                                    console.log('_columns', _columns)
                                    setColumns(_columns)
                                  }}
                                />
                                <span className="columnes__item-text">{title}</span>
                              </div>
                              <span className="columnes__item-right">
                                <Icon name="drag" />
                              </span>
                            </li>
                          )}
                        </Draggable>
                      )
                    })}
                  </ul>
                )
              }}
            </Droppable>
          </DragDropContext>
          <div className="columnes__footer">
            <span
              className="columnes__footer--reset"
              onClick={() => {
                setColumns(cacheColumns.current)
                reorderColumns(cacheColumns)
              }}
            >
              重置
            </span>
            <span
              className="columnes__footer--confirm"
              onClick={() => {
                reorderColumns(columns)
                setShowPopper(false)
              }}
            >
              确定
            </span>
          </div>
        </div>
      </Popper>
    </div>
  )
}
export default ColumnsControl
