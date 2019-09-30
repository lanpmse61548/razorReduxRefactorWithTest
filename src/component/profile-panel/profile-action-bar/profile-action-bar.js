
import React, { Component } from 'react'
import profileStyles from '../profile.module.css'

class ProfileActionBar extends Component {

    render() {

        const p = this.props;
        let editButtons = p.editable ?
        (<>
            <div onClick={p.edit} className={[profileStyles['icon'], profileStyles['edit'], profileStyles['show']].join(' ')}></div>
            <div onClick={p.remove} className={[profileStyles['icon'], profileStyles['delete'], profileStyles['show']].join(' ')}></div>
        </>)
        : null;

        let upClasses = [profileStyles['icon'], profileStyles['up']];
        let downClasses = [profileStyles['icon'], profileStyles['down']];
       
        if(p.isFirst){
            upClasses.push(profileStyles['disabled'])
        }

        if(p.isLast){
            downClasses.push(profileStyles['disabled'])
        }

        return <div className={[profileStyles['toolbar'], 'flex'].join(' ')}>
            <div onClick={p.add} className={[profileStyles['icon'], profileStyles['add']].join(' ')}></div>
            {editButtons}
            <div onClick={p.isFirst ? null : p.moveUp} className={upClasses.join(' ')}></div>
            <div onClick={p.isLast ? null :p.moveDown}  className={downClasses.join(' ')}></div>
        </div>
    }
}

export default ProfileActionBar;