import { Button, Stepper } from "@hi-ui/hiui";
import { PlusOutlined } from "@hi-ui/icons";
import Result from "@hi-ui/result";
import { ContentHeader } from "../../components/content-header";

export const ResultSuccess = () => {
  return <div>
    <ContentHeader
      breadcrumbs={[
        {
          title: '首页',
          path: 'home',
        }, {
          title: '成功页'
        }
      ]}
      title="成功页"
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
        title="工单创建成功"
        type="success"
        content="您可以继续创建、或进行下一步操作"
        style={{ width: 'calc(100% - 250px)', marginTop: '12px' }}
      >
        <div>
          {[
            <Button type="primary" key="create">继续创建</Button>,
            <Button key="handle">处理工单</Button>,
            <Button key="back">返回首页</Button>,
          ]}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '48px',
              padding: '40px 0px',
              background: '#f5f7fa',
              borderRadius: '6px',
              textAlign: 'left'
            }}
          >
            <Stepper
              style={{maxWidth: '570px'}}
              data={[
                { title: '创建工单完成' },
                { title: '指派工程师' },
                { title: '处理工单' },
              ]}
              current={2}
            />
          </div>
        </div>
      </Result>
    </div>
  </div>
}
