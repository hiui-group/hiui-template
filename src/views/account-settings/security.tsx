import { Button } from '@hi-ui/hiui'
import {
  DetailsFilled,
  LockFilled,
  MailFilled,
  MobileFilled,
  QuestionCircleFilled,
} from '@hi-ui/icons'

export default () => {
  return (
    <div className="hi-pro-account-profile-contentbox">
      <div className="hi-pro-account-profile-contentbox-title">账号安全</div>
      <div className="hi-pro-account-security">
        <div className="hi-pro-account-security-item">
          <LockFilled className="hi-pro-account-security-item_icon" />
          <div className="hi-pro-account-security-item_cont">
            <div className="hi-pro-account-security-item_title">
              密码强度
              <Button type="primary" appearance="link">
                编辑
              </Button>
            </div>
            <div className="hi-pro-account-security-item_desc">当前密码强度：弱</div>
          </div>
        </div>
        <div className="hi-pro-account-security-item">
          <MobileFilled className="hi-pro-account-security-item_icon" />
          <div className="hi-pro-account-security-item_cont">
            <div className="hi-pro-account-security-item_title">
              密保手机
              <Button type="primary" appearance="link">
                编辑
              </Button>
            </div>
            <div className="hi-pro-account-security-item_desc">已绑定手机：158****7894</div>
          </div>
        </div>
        <div className="hi-pro-account-security-item">
          <QuestionCircleFilled className="hi-pro-account-security-item_icon" />
          <div className="hi-pro-account-security-item_cont">
            <div className="hi-pro-account-security-item_title">
              密保问题
              <Button type="primary" appearance="link">
                编辑
              </Button>
            </div>
            <div className="hi-pro-account-security-item_desc">
              未设置密保问题，密保问题可有效保护账户安全
            </div>
          </div>
        </div>
        <div className="hi-pro-account-security-item">
          <MailFilled className="hi-pro-account-security-item_icon" />
          <div className="hi-pro-account-security-item_cont">
            <div className="hi-pro-account-security-item_title">
              绑定邮箱
              <Button type="primary" appearance="link">
                编辑
              </Button>
            </div>
            <div className="hi-pro-account-security-item_desc">已绑定邮箱：HiUI@xiaomi.com</div>
          </div>
        </div>
        <div className="hi-pro-account-security-item">
          <DetailsFilled className="hi-pro-account-security-item_icon" />
          <div className="hi-pro-account-security-item_cont">
            <div className="hi-pro-account-security-item_title">
              MFA 设备
              <Button type="primary" appearance="link">
                编辑
              </Button>
            </div>
            <div className="hi-pro-account-security-item_desc">
              未绑定 MFA 设备，绑定后，可以进行二次确认
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
