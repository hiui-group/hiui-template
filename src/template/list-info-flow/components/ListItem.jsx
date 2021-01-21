import React from 'react'

import colors from '../../../commons/colors'

export default class ListItem extends React.Component {

  renderHighlight = (title, highlightValue) => {
    if (typeof title === 'string' && title.includes(highlightValue)) {
      const index = title.indexOf(highlightValue)
      const beforeStr = title.substr(0, index)
      const afterStr = title.substr(index + highlightValue.length)
      return (
        <span>
          {beforeStr}
          <span style={{ color: colors.red }}>{highlightValue}</span>
          {afterStr}
        </span>
      )
    }
  }

  render () {
    const { highlightValue, item } = this.props
    const { title, content, extraInfo } = item
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '16px', color: '#4284F5', marginBottom: 2 }}>{this.renderHighlight(title, highlightValue) || title}</div>
        <div style={{ fontSize: '12px' }}>{this.renderHighlight(content, highlightValue) || content}</div>
        <div style={{ fontSize: '12px', color: '#999999' }}>{extraInfo}</div>
      </div>
    )
  }
}
