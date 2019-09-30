import React, { Component } from 'react'

class TestComponent extends Component {
    render() {
        return <div>test div {this.props.value}</div>
    }
}

export default TestComponent