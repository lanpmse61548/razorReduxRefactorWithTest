import React, { Component } from 'react'
import {connect} from 'react-redux'

class Windown extends Component {
    render() {
        const p = this.props;
        return <div className="thx-window">
            <div className="sub-title flex">
                <h1 className="eq-title">{p.profiles[p.currentProfile].name}</h1>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        profiles: state.profiles.profiles,
        currentProfile :state.profiles.currentProfile,
    };
};

export default connect(mapStateToProps)(Windown)