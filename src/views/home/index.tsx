import { Button } from '@hi-ui/hiui';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate()
  return <div>
    <h1>Home</h1>
    <Button onClick={() => navigate('/about')}>按钮</Button>
  </div>
}
