import { Button } from "@hi-ui/hiui";
import { BellFilled, CheckSquareFilled, DetailsFilled, HeartFilled, LockFilled, MailFilled, MobileFilled, QuestionCircleFilled } from "@hi-ui/icons";

export default () => {
  return (
    <div className="account-profile-contentbox">
      <div className="account-profile-contentbox-title">系统设置</div>
      <div className="account-sysset">
        <div className="account-sysset-item">
          <HeartFilled className="account-sysset-item_icon" style={{ backgroundColor: '#FEF0E5', color: "#FE7840" }} />
          <div className="account-sysset-item_cont">
            <div className="account-sysset-item_title">关注消息<Button type="primary" appearance="link">编辑</Button></div>
            <div className="account-sysset-item_desc">关注的实体动态将以站内信的形式通知</div>
          </div>
        </div>
        <div className="account-sysset-item">
          <BellFilled className="account-sysset-item_icon" style={{ backgroundColor: '#F2F4F7', color: "#C9CED6" }} />
          <div className="account-sysset-item_cont">
            <div className="account-sysset-item_title">系统消息<Button type="primary" appearance="link">编辑</Button></div>
            <div className="account-sysset-item_desc">系统消息将以站内信的形式通知</div>
          </div>
        </div>
        <div className="account-sysset-item">
          <CheckSquareFilled className="account-sysset-item_icon" style={{ backgroundColor: '#E2F3FE', color: "#237FFA" }} />
          <div className="account-sysset-item_cont">
            <div className="account-sysset-item_title">待办任务<Button type="primary" appearance="link">编辑</Button></div>
            <div className="account-sysset-item_desc">待办任务将以站内信的形式通知</div>
          </div>
        </div>
      </div>
    </div>
  )
}