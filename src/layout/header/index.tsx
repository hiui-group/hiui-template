import React from 'react'
import { Avatar } from '@hi-ui/hiui'
import { BellOutlined, SearchOutlined, SettingOutlined } from '@hi-ui/icons'
import { Image } from '../../components/image'
import { Spacer } from '../../components/spacer'
import logoImg from '../../assets/logo.png'

import './index.scss'

const prefix = 'hi-pro-header'

export const Header = () => {
  return (
    <Spacer as="header" className={`${prefix}`} inline={false} justify="space-between">
      <Spacer>
        <Image src={logoImg} />
        <span className={`${prefix}__logo-title`}>HiUI Pro</span>
      </Spacer>

      <Spacer gap={24}>
        <Spacer gap={28}>
          <SearchOutlined style={{ fontSize: 20 }} />
          <SettingOutlined style={{ fontSize: 20 }} />
          <BellOutlined style={{ fontSize: 20 }} />
        </Spacer>
        <Avatar initials="P" size="sm" />
      </Spacer>
    </Spacer>
  )
}
