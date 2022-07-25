import { Button } from '@hi-ui/hiui'
import { PlusOutlined } from '@hi-ui/icons'
import Result, { RESULT_IMAGE_NOT_FOUND } from '@hi-ui/result'
import { ContentHeader } from '../../components/content-header'

export const ExceptionNotfound = () => {
  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: '404',
          },
        ]}
        title="404"
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
          image={RESULT_IMAGE_NOT_FOUND}
          imageSize="lg"
          title="404"
          content="抱歉，未找到相关资源！"
          children={<Button type="primary">立即申请</Button>}
        />
      </div>
    </div>
  )
}
