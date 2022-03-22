import { Button } from "@hi-ui/hiui";
import { PlusOutlined } from "@hi-ui/icons";
import Result from "@hi-ui/result";
import { ContentHeader } from "../../components/content-header";

export const ResultFailure = () => {
  return <div>
    <ContentHeader
      breadcrumbs={[
        {
          title: '首页',
          path: 'home',
        }, {
          title: '失败页'
        }
      ]}
      title="失败页"
      toolbar={
        <div>
          <Button>次要操作</Button>
          <Button>次操作</Button>
          <Button icon={<PlusOutlined/>} type="primary">主操作</Button>
        </div>
      }
    />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(100vh - 56px - 130px)',
        margin: '20px',
        background: '#fff',
      }}
    >
      <Result
        title="工单创建失败"
        type="error"
        content="抱歉，您的工地创建失败，您可以联系检查创建者权限，或返回修改。"
        style={{width:'calc(100% - 250px)', marginTop:'12px'}}
      >
        <div>
            {[
              <Button type="primary" key="create">继续创建</Button>,
              <Button key="back">返回首页</Button>,
            ]}
            <div
              style={{
                whiteSpace: 'pre-wrap',
                marginTop: '48px',
                padding: '16px 20px',
                background: '#f5f7fa',
                boxSizing: 'border-box',
                fontSize: '14px',
                color: '#5f6a7a',
                textAlign: 'left',
                borderRadius: '6px',
              }}
            >
              <div style={{fontWeight:600, color:'#1f2733', marginBottom:'6px'}}>说明</div>
              {'此处展示共建创建失败的相关说明文字，此处展示共建创建失败的相关说明文字，\n此处展示共建创建失败后可以进行的后续操作'}
            </div>
          </div>
      </Result>
    </div>
  </div>
}
