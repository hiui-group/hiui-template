import React from 'react'

export default class ListItem extends React.Component {
  render () {
    const { highlightValue, item } = this.props
    const { title, content, extraInfo } = item
    let _title
    if (typeof title === 'string' && title.includes(highlightValue)) {
      const index = title.indexOf(highlightValue)
      const beforeStr = title.substr(0, index)
      const afterStr = title.substr(index + highlightValue.length)
      _title = (
        <span>
          {beforeStr}
          <span style={{ color: '#EB5252' }}>{highlightValue}</span>
          {afterStr}
        </span>
      )
    }
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '16px', color: '#4284F5', marginBottom: 2 }}>{_title || title}</div>
        <div style={{ fontSize: '12px' }}>{content}</div>
        <div style={{ fontSize: '12px', color: '#999999' }}>{extraInfo}</div>
      </div>
    )
  }
}
