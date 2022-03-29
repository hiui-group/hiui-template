import React, { useEffect, useRef, useState } from 'react'
import { Message, Popover } from '@hi-ui/hiui'
import { RightOutlined, CheckOutlined, PowerOffOutlined } from '@hi-ui/icons'
import './userbox.scss'

type SelectItem = { id: string, name: string }

const RoleGroup:SelectItem[] = [
  {
    id: 'student',
    name: '学员'
  },
  {
    id: 'admin',
    name: '管理员'
  }
]

const AgentGroup:SelectItem[] = [
  {
    id: 'A10001',
    name: "产品中心"
  },
  {
    id: 'B10001',
    name: "研发中心"
  }
]

export const UserBox: React.FC = () => {
  const userInfo = {
    name: "郭同学",
    avatar: "https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg",
    title: "客服经理"
  }
  const popContainerRef = useRef<HTMLDivElement>(null)
  const [ currentRole, setCurrentRole ] = useState<SelectItem>(RoleGroup[0])
  const [ currentAgent, setCurrentAgent ] = useState<SelectItem>(AgentGroup[0])

  const logout = () => {
    Message.open({
      title: '退出登录',
      type: 'success',
    })
    window.location.reload()
  }

  return (
    <div className="hi-pro-header__userbox">
      <Popover
        placement="bottom-end"
        container={() => popContainerRef.current}
        content={
          <div className="popcontent">
            <div className="infocard">
              <img src={ userInfo.avatar } />
              <div className="username">{ userInfo.name }</div>
              <div className="usertitle">{ userInfo.title }</div>
            </div>
            <div className="selectinfo">
              <SelectGroup
                label='角色'
                items={RoleGroup}
                value={currentRole}
                onSelectItem={setCurrentRole}
              />
              <SelectGroup
                label='部门'
                items={AgentGroup}
                value={currentAgent}
                onSelectItem={setCurrentAgent}
              />
            </div>
            <div className="footer" onClick={logout}>
              <PowerOffOutlined />
              退出当前账户
            </div>
          </div>
        }
        trigger="click"
      >
        <div className="headcontent">
          <div className="line1">
            <img src={ userInfo.avatar } />
            <span>{ userInfo.name }</span>
          </div>
          <div className="line2" title={currentAgent.name}>
            部门: {currentAgent.name}
          </div>
        </div>
      </Popover>
      <div className="popcontent-warp" ref={popContainerRef}></div>
    </div>
  )
}

interface SelectGroupProps {
  label: string,
  items: SelectItem[],
  value: SelectItem,
  onSelectItem: (item: SelectItem) => any,
}

const SelectGroup: React.FC<SelectGroupProps> = (props: SelectGroupProps) => {
  const currentShowRef = useRef<boolean>(false)
  const [ show, setShow ] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const changeShow = () => {
    setShow(!currentShowRef.current)
    currentShowRef.current = !currentShowRef.current;
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick)
    return () => {
      window.removeEventListener('mousedown', handleWindowClick)
    }
  }, [])

  const handleWindowClick = (event: any) => {
    if (!currentShowRef.current) return
    const { current } = containerRef;
    if (event.target === window || (current && !current.contains(event.target))) {
      setShow(false)
      currentShowRef.current = false;
    }
  }

  const getSelectLabel = () => {
    const { value, items } = props
    for (let index = 0; index < items.length; index++) {
      if (items[index].id === value.id) {
        return items[index].name
      }
    }
    return null
  }

  return (
    <div className="selectgroup" ref={containerRef}>
      <div
        className={'selectgroup-button ' + (show ? 'active' : '')}
        onClick={changeShow}
      >
        <span className="selectgroup-button_label">{props.label}</span>
        <span className="selectgroup-button_val">{getSelectLabel()}</span>
        <RightOutlined className="selectgroup-button_icon" />
      </div>
      <div className={'selectgroup-select-warp ' + (show ? 'active' : '')}>
        <div className="selectgroup-select">
          {props.items.map((item: SelectItem) => {
            return (
              <div
                key={item.id}
                className={'selectgroup-select-item ' + (props.value.id === item.id ? 'active' : '')}
                onClick={() => {
                  props.onSelectItem(item)
                }}
              >
                {item.name}
                <CheckOutlined className="selectgroup-select-item_icon" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
