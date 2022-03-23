import { Button } from "@hi-ui/hiui";
import { PlusOutlined } from "@hi-ui/icons";
import Result, { IconNotFound } from "@hi-ui/result";
import { ContentHeader } from "../../components/content-header";

export const ExceptionNotfound = () => {
  return <div>
    <ContentHeader
      breadcrumbs={[
        {
          title: '首页',
          path: 'home',
        }, {
          title: '404'
        }
      ]}
      title="404"
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
        alignItems: 'center',
        height: 'calc(100vh - 56px - 130px)',
        margin: '20px',
        background: '#fff',
      }}
    >
      <Result
        image={<IconNotFound />}
        imageSize="lg"
        title="404"
        content="抱歉，服务器开小差了！"
        children={
          <Button type="primary">
            立即申请
          </Button>
        }
      />
    </div>
  </div>
}
