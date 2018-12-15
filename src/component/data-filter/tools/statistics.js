import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@hi-ui/hiui/es/checkbox'

export default class StatisticsTool extends Component {
  constructor (props) {
    super(props)
  }

  statistics = {
    'sum': '求和',
    'ave': '平均值'
  }

  parent () {
    return this.context.component
  }

  render () {
    const parent = this.parent()
    const {
      statistics
    } = parent.state

    return (
      <div className='block-filter-tool__menu block-filter-tool__menu--statistics'>
        {
          Object.entries(this.statistics).map(([ value, label ]) => (
            <div
              className='block-filter-tool__menu-item'
              key={value}
            >
              <Checkbox
                checked={statistics[value]}
                onChange={() => {
                  statistics[value] = !statistics[value]

                  if (this.props.onChange) {
                    this.props.onChange(statistics)
                  } else {
                    parent.setState({ statistics })
                  }
                }}
              >
                {label}
              </Checkbox>
            </div>
          ))
        }
      </div>
    )
  }
}

StatisticsTool.contextTypes = {
  component: PropTypes.any
}
