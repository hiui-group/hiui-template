import { Button } from '@hi-ui/hiui'
import { PlusOutlined } from '@hi-ui/icons'
import Result, { IconNetError } from '@hi-ui/result'
import { ContentHeader } from '../../components/content-header'

export const ExceptionNetwork = () => {
  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'home',
          },
          {
            title: '无网络',
          },
        ]}
        title="无网络"
        toolbar={
          <div>
            <Button>次要操作</Button>
            <Button>次操作</Button>
            <Button icon={<PlusOutlined />} type="primary">
              主操作
            </Button>
          </div>
        }
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 56px - 130px)',
          margin: '20px',
          background: '#fff',
        }}
      >
        <Result
          image={<IconNetError />}
          imageSize="lg"
          title="网络中断"
          content="抱歉，网络连接中断，请稍后再试！"
          children={<Button type="primary">刷新页面</Button>}
        />
      </div>
    </div>
  )
}
