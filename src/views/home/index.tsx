import { Button } from '@hi-ui/hiui'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@hi-ui/icons'
import { ContentHeader } from '../../components/content-header'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: 'Home',
          },
        ]}
        title="Home"
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
      <Button onClick={() => navigate('/about')}>按钮</Button>
    </div>
  )
}
