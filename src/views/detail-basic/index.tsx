import { Avatar, Button, Card, Grid } from "@hi-ui/hiui";
import { BuildingFilled, PlusOutlined } from "@hi-ui/icons";
import { ContentHeader } from "../../components/content-header";
import { Spacer } from "../../components/spacer";

const { Row, Col } = Grid

const prefix = 'hi-pro-detail-basic'

export const DetailBasic = () => {
  return <div className={prefix}>
    <ContentHeader
      breadcrumbs={[
        {
          title: '首页',
          path: 'home',
        }, {
          title: '基础详情页'
        }
      ]}
      title="基础详情页"
      toolbar={
        <div>
          <Button>次要操作</Button>
          <Button>次操作</Button>
          <Button icon={<PlusOutlined/>} type="primary">主操作</Button>
        </div>
      }
    />

    <div style={{padding:'20px 20px 0'}}>
      <Row>
        <Col span={24}>
        <Card bordered={false}>
          <Spacer>
            <Spacer>
              <Avatar icon={<BuildingFilled/>}></Avatar>
              <Spacer direction="column" align="flex-start">
                <span>{'单号：P20212334124'}</span>
                <div>{'黄河 国内出差2021-11-25至20'}</div>
              </Spacer>
            </Spacer>
          </Spacer>
        </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
        <Card bordered={false} title="差旅信息">
          description
        </Card>
        </Col>
      </Row>
    </div>
  </div>
}
