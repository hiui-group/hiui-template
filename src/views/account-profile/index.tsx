import { Button } from "@hi-ui/hiui";
import { BusinessCardTransverseOutlined, LockOutlined, PlusOutlined, SettingOutlined } from "@hi-ui/icons";
import { ContentHeader } from "../../components/content-header";
import './index.scss';
import AccountSetting from "./setting";
import AccountSecurity from "./security";
import AccountSysset from "./sysset";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { parseParams } from "../../utils/url";

interface AccountTabItem {
  title: string,
  key: string,
  icon: any,
  component: React.FC
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
    component: AccountSysset
  }
]


export const AccountProfile: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const onClickTab = (tabKey: string) => {
    if (tabKey === AccountTabList[0].key) {
      navigate('/account-profile');
    } else {
      navigate('/account-profile?tab=' + tabKey)
    }
  }

  const params = parseParams(location.search)
  const tabState = params['tab'] ? params['tab'] : AccountTabList[0].key;
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
    <div className="hi-pro-account-profile-container">
      <div className="hi-pro-account-profile-navbox">
        {
          AccountTabList.map((item: AccountTabItem) => {
            let IconComp: any = item.icon
            return <div key={item.key} className={"hi-pro-account-profile-navitem " + (tabState === item.key ? "active" : "")} onClick={ () => onClickTab(item.key) }><IconComp className="nav-icon" />{item.title}</div>
          })
        }
      </div>
      {
        AccountTabList.map((item: AccountTabItem) => {
          if (item.key !== tabState) return null
          let Comp = item.component
          return <Comp key={ item.key } />
        })
      }
    </div>
  </div>
}
