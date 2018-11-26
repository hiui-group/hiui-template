import React, { Component } from 'react'

class Layout extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

module.exports = Layout

