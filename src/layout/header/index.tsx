import React from 'react'
import { SettingOutlined } from '@hi-ui/icons'
import { Image } from '../../components/image'
import { Spacer } from '../../components/spacer'
import logoImg from '../../assets/logo.png'

import './index.scss'
import { SearchBox } from './searchbox'
import { UserBox } from './userbox'
import { useNavigate } from 'react-router'

const prefix = 'hi-pro-header'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <Spacer as="header" className={`${prefix}`} inline={false} justify="space-between">
      <Spacer>
        <Image src={logoImg} />
        <span className={`${prefix}__logo-title`}>HiUI Pro</span>
      </Spacer>
      <Spacer gap={4}>
        <div style={{ display: 'flex' }}>
          <SearchBox />
          <div className="hi-pro-header__nav-icon" onClick={() => navigate('/account-settings')}>
            <SettingOutlined style={{ fontSize: 20, color: '5F6A7A' }} />
          </div>
          {/* <div className="hi-pro-header__nav-icon" onClick={() => {}} >
            <BellOutlined style={{ fontSize: 20, color: '5F6A7A' }} />
          </div> */}
        </div>
        <UserBox />
      </Spacer>
    </Spacer>
  )
}
