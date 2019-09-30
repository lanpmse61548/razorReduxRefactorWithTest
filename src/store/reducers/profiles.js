
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'


const initialState = {
    currentProfile: 1,
    openAlert: false,
    profiles:
    {
        1: { icon: 'default', name:'default',prevValidName:'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game',prevValidName:'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie',prevValidName:'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music',prevValidName:'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom',prevValidName:'Custom', editable: true, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text demo long text demo',prevValidName:'demo long text demo long text demo', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'demo long texdsad',prevValidName:'demo long texdsad', editable: true, inEditMode: false, active: false }
    }
}


// const addProfile = (state, action) => {
//     let tmp = JSON.parse(JSON.stringify(state.profiles))
//     let k = Object.keys(tmp);
//     let id = Math.max(...k) + 1;
//     k.forEach(p => tmp[p].active = false);
//     tmp[id] = { icon: 'custom', name: 'New Profile', editable: true, inEditMode: false, active: true };

//     return updateObject(state, {
//         currentProfile: id,
//         profiles: tmp
//     });
// }

// const setCurrentProfile = (state, action) => {
//     const id = +action.id

//     const tmp = action.tmp ? action.tmp : JSON.parse(JSON.stringify(state.profiles))
//     Object.keys(tmp).map(p => tmp[+p].active = false);
//     tmp[id].active = true;

//     return updateObject(state, {
//         currentProfile: id,
//         profiles: tmp
//     });
// }

// const removeProfile = (state,action) => {
//     let id = state.currentProfile;

//     let tmp = JSON.parse(JSON.stringify(state.profiles))
//     delete tmp[id]
//     while (!tmp[id]) {
//         id-= 1;
//     }
//     tmp[id].active = true;
//     console.log('--------------');
//     console.log(tmp);
//     console.log('--------------');

//     return updateObject(state, {
//         profiles: tmp, openAlert: false, currentProfile: id
//     });
// }

// const disableEditMode = (tmp) => {
//     Object.keys(tmp).map(p => tmp[+p].inEditMode = false);

// }

// const disableActiveMode = (tmp) => {
//     Object.keys(tmp).map(p => tmp[+p].active = false);

// }

// const enableEditProfile = (state,action) => {
//     let tmp = JSON.parse(JSON.stringify(state.profiles))
//    disableEditMode(tmp);

//     const id = state.currentProfile;

//     tmp[id].inEditMode = true;
//     tmp[id].active = true;

//     return updateObject(state, {
//         profiles: tmp
//     });
// }

// const disableEditProfile = (state,action) => {
//     let tmp = JSON.parse(JSON.stringify(state.profiles))
//     disableEditMode(tmp);

//     return updateObject(state, {
//         profiles: tmp
//     });
// }

// const editProfile = (state,action) => {
//     let tmp = JSON.parse(JSON.stringify(state.profiles))
//     tmp[state.currentProfile].name = action.name;

//     return updateObject(state, {
//         profiles: tmp
//     });
// }

// const validateProfile = (state,action) => {
//     let tmp = JSON.parse(JSON.stringify(state.profiles))
//     if(tmp[state.currentProfile].name.trim() === ''){
//         tmp[state.currentProfile].name = tmp[state.currentProfile].prevValidName;
//     } else {
//         tmp[state.currentProfile].prevValidName = tmp[state.currentProfile].name;

//     }
//     // disableEditMode(tmp);

//     return updateObject(state, {
//         profiles: tmp
//     });

// }

const openAlert = (state,action) => {
    return updateObject(state, {
        openAlert: true
    });
}


const closeAlert = (state,action)=> {
    return updateObject(state, {
        openAlert: false
    });
}

// const moveUp = (state,action)=> {
   
   
//     let tmp = JSON.parse(JSON.stringify(state.profiles));


//     let id = state.currentProfile;
//     let uId = id-1;
//     while(!tmp[uId]){
//         uId--;
//     }
//      console.log(id +'_'+uId)

//     // disableActiveMode(tmp);

//     const tmpVar = tmp[uId];
//     tmp[uId] = tmp[id]
//     tmp[id] = tmpVar;
    
  
//     tmp[uId].active = true;

//     return updateObject(state, {
//         currentProfile :uId,
//         profiles:tmp
//     });

// }


// const moveDown = (state,action)=> {
   
  
//     let tmp = JSON.parse(JSON.stringify(state.profiles));
   

//     let id = state.currentProfile;
//     let uId = id+1;
//     while(!tmp[uId]){
//         uId++;
//     }
//     const tmpVar = tmp[uId];
//     tmp[uId] = tmp[id]
//     tmp[id] = tmpVar;
    
   
//     tmp[uId].active = true;

//     return updateObject(state, {
//         currentProfile :uId,
//         profiles:tmp
//     });
// }

//Reducer
const reducer = (state = initialState, action) => {


      const tempState = JSON.parse(JSON.stringify(state));// deepClone(state);

    switch (action.type) {
        case actionTypes.ADD_PROFILE:
           //  return addProfile(state, action);
            return {...tempState,...action.data}
        case actionTypes.SET_CURRENT_PROFILE:
           // return setCurrentProfile(state, action);
           return {...tempState,...action.data}
        case actionTypes.REMOVE_PROFILE:
           // return removeProfile(state,action);
           return {...tempState,...action.data}
        case actionTypes.OPEN_ALERT:
            return openAlert(state,action);
        case actionTypes.CLOSE_ALERT:
            return closeAlert(state,action);
        case actionTypes.ENABLE_EDIT_MODE:
         //   return enableEditProfile(state,action);
         return {...tempState,...action.data}
        case actionTypes.DISABLE_EDIT_MODE:
          //  return disableEditProfile(state,action); 
          return {...tempState,...action.data}  
        case actionTypes.EDIT_PROFILES:
            //return editProfile(state,action); 
            return {...tempState,...action.data}  
   
        case actionTypes.VALIDATE_PROFILE:
           // return validateProfile(state,action);  
           return {...tempState,...action.data}   
        case actionTypes.MOVE_UP_PROFILE:
           // return moveUp(state,action); 
           return {...tempState,...action.data}  
        case actionTypes.MOVE_DOWN_PROFILE:
          //  return moveDown(state,action);      
          return {...tempState,...action.data}
    }


    return state;
};

export default reducer;