import React from 'react'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'

class ListItem extends React.Component {
  state = {
    open: false
  }
  getTagColor(status){
    switch (status){
      case '审批中':
        return '#4284F5';
      case '待审批':
        return '#E19D0C';
      case '已通过':
        return '#1DA653'
    }
  }
  render () {
    const { title, status, info, operation, detail } = this.props.item
    const { open } = this.state

    return (
      <div className='list-item'>
        <div className='list-item__content'>
          <div style={{ flex: 1 }}>
            <div className='list-item__header'>
              {title}
              <span
                style={{
                  borderColor: this.getTagColor(status),
                  color: this.getTagColor(status),
                }}
                className='tag'
              >
                {status}
              </span>
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
            {status == '待审批' && <Button type='line' >审批</Button>}
            <Button type='line' icon="more"></Button>
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
