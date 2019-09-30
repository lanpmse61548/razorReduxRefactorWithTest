import React from 'react'
import styles from './alert.module.css';
import OutsideClickHandler from '../OutsideClickHandler';
const Alert = (props) => {

    let alertClasses = [styles['flex'],styles['alert'],styles['profile-del'],styles['show']];



    return props.open ? (
        <OutsideClickHandler click={props.blur}>
        <div onBlur={props.blur}  className={alertClasses.join(' ')}>
            <div className={styles['title']}>{props.title}</div>
            <div className={['body-text', 't-center'].join(' ')}>
                {props.message}
        </div>
            <div className={styles['thx-btn']} onClick={props.delete}>delete</div>
        </div>
        </OutsideClickHandler>
    ) : null
}

export default Alert;