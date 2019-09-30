import * as actionTypes from './actionTypes'


export const addProfile = (newState) => {
    return {
        type: actionTypes.ADD_PROFILE,
        data: newState
    }
}


export const removeProfile = (newState) => {
    return {
        type: actionTypes.REMOVE_PROFILE,
        data: newState
    }
}


export const editProfile = (newState) => {
    return {
        type: actionTypes.EDIT_PROFILES,
        data: newState
    }
}


export const setCurrentProfile = (newState) => {
    return {
        type: actionTypes.SET_CURRENT_PROFILE,
        data: newState
    }
}


export const enableEditMode = (newState) => {
    return {
        type: actionTypes.ENABLE_EDIT_MODE,
        data: newState
    }
}


export const disableEditMode = (newState) => {
    return {
        type: actionTypes.DISABLE_EDIT_MODE,
        data: newState
    }
}

export const  openAlert = () => {
    return {
        type: actionTypes.OPEN_ALERT
    }
}

export const  closeAlert = () => {
    return {
        type: actionTypes.CLOSE_ALERT
    }
}

export const  validateProfile = (newState) => {
    return {
        type: actionTypes.VALIDATE_PROFILE,
        data: newState
    }
}

export const  moveUpProfile = (newState) => {
    return {
        type: actionTypes.MOVE_UP_PROFILE,
        data: newState
    }
}

export const  moveDownProfile = (newSTate) => {
    return {
        type: actionTypes.MOVE_DOWN_PROFILE,
        data: newSTate
    }
}