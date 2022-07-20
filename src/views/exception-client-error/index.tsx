import { Button } from '@hi-ui/hiui'
import { PlusOutlined } from '@hi-ui/icons'
import Result, { RESULT_IMAGE_NET_ERROR } from '@hi-ui/result'
import { ContentHeader } from '../../components/content-header'

export const ExceptionClientError = () => {
  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
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
          image={RESULT_IMAGE_NET_ERROR}
          imageSize="lg"
          title="客户端异常"
          content="抱歉，请刷新重试！"
          children={<Button type="primary">刷新页面</Button>}
        />
      </div>
    </div>
  )
}
