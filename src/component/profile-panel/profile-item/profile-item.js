
import React, { Component } from 'react'
import profileStyles from '../profile.module.css'

class ProfileItem extends Component {


    componentDidUpdate = (prevProps, prevState) => {
        if (this.nameInput) {
            if (prevProps.value.name === this.props.value.name) {
                this.nameInput.select();
            }

        }
    }

    keyPress = (e) => {
        if (e.keyCode == 13) {
            this.props.disableEditMode();
        }
    }

    render() {
        let tmp = this.props.value;
        let key = this.props.id;
        let styleClasses = [profileStyles['profile-item'], profileStyles[tmp.icon]];
        if (!tmp.editable) {
            styleClasses.push(profileStyles['no-edit']);
        }

        if (tmp.active) {
            styleClasses.push(profileStyles['active']);
        }

        if (tmp.inEditMode) {
            styleClasses.push(profileStyles['textbox']);
            return <>
                <div key={key} onClick={() => this.props.setCurrentProfile(key)} className={styleClasses.join(' ')}>
                    <input key={key} ref={(input) => { this.nameInput = input; }}
                        className={profileStyles['show']}
                        onBlur={this.props.disableEditMode}
                        onKeyDown={this.keyPress}
                        value={tmp.name}
                        onChange={() => this.props.saveRenameValue(this.nameInput.value)}
                    >

                    </input>
                </div>
            </>
        } else {

            return <div ref={this.props.reference} key={key} onClick={() => this.props.setCurrentProfile(key)} className={styleClasses.join(' ')}>{tmp.name}</div>
        }
    }
}

export default ProfileItem