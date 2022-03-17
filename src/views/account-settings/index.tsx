import { Button } from "@hi-ui/hiui";
import { BusinessCardTransverseOutlined, LockOutlined, PlusOutlined, SettingOutlined } from "@hi-ui/icons";
import { ContentHeader } from "../../components/content-header";
import './index.scss';
import AccountSetting from "./setting";
import AccountSecurity from "./security";
import { useState } from "react";

interface AccountTabItem {
  title: string,
  key: string,
  icon: any,
  component: any
}

const AccountTabList: AccountTabItem[] = [
  {
    title: "个人信息",
    key: "setting",
    icon: BusinessCardTransverseOutlined,
    component: AccountSetting
  },
  {
    title: "账号安全",
    key: "security",
    icon: LockOutlined,
    component: AccountSecurity
  },
  {
    title: "系统设置",
    key: "sysset",
    icon: SettingOutlined,
    component: AccountSecurity
  }
]


export const AccountSettings = () => {
  const [ tabState, setTabState ] = useState(AccountTabList[0].key)
  return <div>
    <ContentHeader
      breadcrumbs={[
        {
          title: '首页',
          path: 'home',
        }, {
          title: '设置'
        }
      ]}
      title="设置"
      toolbar={
        <div>
          <Button>次要操作</Button>
          <Button>次操作</Button>
          <Button icon={<PlusOutlined/>} type="primary">主操作</Button>
        </div>
      }
    />
    <div className="account-settings-container">
      <div className="account-settings-navbox">
        {
          AccountTabList.map((item: AccountTabItem) => {
            let IconComp: any = item.icon
            return <div key={item.key} className={"account-settings-navitem " + (tabState === item.key ? "active" : "")} onClick={ () => setTabState(item.key) }><IconComp className="nav-icon" />{item.title}</div>
          })
        }
      </div>
      {
        AccountTabList.map((item: AccountTabItem) => {
          if (item.key !== tabState) return null
          let Comp: any = item.component
          return <Comp key={ item.key } />
        })
      }
    </div>
  </div>
}
