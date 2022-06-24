import { Loading, Message, Switch } from '@hi-ui/hiui'
import { BellFilled, CheckSquareFilled, HeartFilled } from '@hi-ui/icons'
import { getAutoInrementId, sleep } from '../../utils'

const Sysset = () => {
  const mockSave = async () => {
    const loadingkey = 'loading_' + getAutoInrementId()
    Loading.open(undefined, { key: loadingkey })
    await sleep(1000)
    Loading.close(loadingkey)
    Message.open({
      title: '保存成功',
      type: 'success',
    })
  }

  return (
    <div className="hi-pro-account-profile-contentbox">
      <div className="hi-pro-account-profile-contentbox-title">系统设置</div>
      <div className="hi-pro-account-sysset">
        <div className="hi-pro-account-sysset-item">
          <HeartFilled
            className="hi-pro-account-sysset-item_icon"
            style={{ backgroundColor: '#FEF0E5', color: '#FE7840' }}
          />
          <div className="hi-pro-account-sysset-item_cont">
            <div className="hi-pro-account-sysset-item_title">
              关注消息
              <Switch defaultChecked={false} onChange={mockSave} />
            </div>
            <div className="hi-pro-account-sysset-item_desc">
              关注的实体动态将以站内信的形式通知
            </div>
          </div>
        </div>
        <div className="hi-pro-account-sysset-item">
          <BellFilled
            className="hi-pro-account-sysset-item_icon"
            style={{ backgroundColor: '#F2F4F7', color: '#C9CED6' }}
          />
          <div className="hi-pro-account-sysset-item_cont">
            <div className="hi-pro-account-sysset-item_title">
              系统消息
              <Switch defaultChecked={true} onChange={mockSave} />
            </div>
            <div className="hi-pro-account-sysset-item_desc">系统消息将以站内信的形式通知</div>
          </div>
        </div>
        <div className="hi-pro-account-sysset-item">
          <CheckSquareFilled
            className="hi-pro-account-sysset-item_icon"
            style={{ backgroundColor: '#E2F3FE', color: '#237FFA' }}
          />
          <div className="hi-pro-account-sysset-item_cont">
            <div className="hi-pro-account-sysset-item_title">
              待办任务
              <Switch defaultChecked={false} onChange={mockSave} />
            </div>
            <div className="hi-pro-account-sysset-item_desc">待办任务将以站内信的形式通知</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sysset
