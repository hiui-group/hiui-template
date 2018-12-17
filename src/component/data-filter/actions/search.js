import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'

export default class SearchAction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showInput: false,
      value: ''
    }
  }

  componentDidMount () {
    window.addEventListener('click', this.hideInput.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.hideInput.bind(this))
  }

  hideInput (e) {
    if (this.searchRef && !this.searchRef.contains(e.target)) {
      this.setState({
        showInput: false,
        value: ''
      })
    }
  }

  parent () {
    return this.context.component
  }

  search () {
    const {
      showInput,
      value
    } = this.state

    if (showInput && value) {
      this.parent().submit({ s: value })
    } else {
      this.setState({ showInput: true })
    }
  }

  render () {
    const {
      showInput,
      value
    } = this.state

    return (
      <div ref={node => this.searchRef = node}>
        {
          showInput &&
          <div className='block-filter-action__search'>
            <input
              value={value}
              placeholder='搜索关键词'
              onChange={e => {
                this.setState({ value: e.target.value })
              }}
            />
          </div>
        }
        <Button type="line" onClick={() => this.search()}>
          <Icon name='search' />
        </Button>
      </div>
    )
  }
}

SearchAction.contextTypes = {
  component: PropTypes.any
}
