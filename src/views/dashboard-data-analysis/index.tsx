import { Button } from "@hi-ui/hiui";
import { PlusOutlined } from "@hi-ui/icons";
import { ContentHeader } from "../../components/content-header";

export const DashboardDataAnalysis = () => {
  return <div>
    <ContentHeader
      breadcrumbs={[
        {
          title: '首页',
          path: 'home',
        }, {
          title: '数据分析'
        }
      ]}
      title="数据分析"
      toolbar={
        <div>
          <Button>次要操作</Button>
          <Button>次操作</Button>
          <Button icon={<PlusOutlined/>} type="primary">主操作</Button>
        </div>
      }
    />
  </div>
}
