import React from 'react'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Tag from '@hi-ui/hiui/es/tag'

class ListItem extends React.Component {
  state = {
    open: false
  }
  render () {
    const { title, status, statusDesc, info, detail } = this.props.item
    const { open } = this.state

    return (
      <div className='list-item'>
        <div className='list-item__content'>
          <div style={{ flex: 1 }}>
            <div className='list-item__header'>
              {title}
              <Tag type={status} className='tag'>{statusDesc}</Tag>
            </div>
            <div className='list-item__info'>
              {info.map((i, index) => [
                <div
                  key={index}
                  style={{
                    paddingLeft: index === 0 ? 0 : 24,
                    paddingRight: 25
                  }}
                >
                  <span>{i.label + '：'}</span>
                  <span>{i.value}</span>
                </div>,
                index !== info.length - 1 && <span key={index + 'span'} className='list-item__separation'>|</span>
              ])}
              <div
                style={{
                  marginLeft: 24,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  this.setState({
                    open: !open
                  })
                }}
              >
                {open ? '收起' : '展开'}{' '}
                <Icon name={open ? 'up' : 'down'} style={{ color: '#666' }} />
              </div>
            </div>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            {status === '待审批' && <Button type='line' >审批</Button>}
            <Button type='line' icon='more' />
          </div>
        </div>

        {detail && open && (
          <div
            style={{
              background: '#F7FAFE',
              flexWrap: 'wrap',
              display: 'flex',
              padding: '12px 24px 8px 24px',
              marginTop: 4
            }}
          >
            {detail.map((i, index) => (
              <div
                key={index}
                style={{
                  width: '33.33%',
                  lineHeight: '20px',
                  fontSize: '12px',
                  marginBottom: '4px',
                  color: '#999'
                }}
              >
                <span>{i.label + '：'}</span>
                <span>{i.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default class List extends React.Component {
  render () {
    return (
      <div className='list'>
        {this.props.data.map((item, index) => (
          <ListItem item={item} key={index} />
        ))}
      </div>
    )
  }
}
