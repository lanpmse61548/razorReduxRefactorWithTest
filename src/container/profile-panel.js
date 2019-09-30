
import React, { Component } from 'react'
import profileStyles from '../component/profile-panel//profile.module.css'
import ProfileItem from '../component/profile-panel/profile-item/profile-item'
import ProfileActionBar from '../component/profile-panel/profile-action-bar/profile-action-bar'
import Alert from '../component/alert/alert'
import { connect } from 'react-redux'
import * as action from '../store/actions/profileAction'
import axios from 'axios';

class ProfilePanel extends Component {


    constructor(props){
        super(props)
        this.proRef = [];
    }

    setCurrentProfile = (id) => {

        const tmp =  JSON.parse(JSON.stringify(this.props.profiles))
        Object.keys(tmp).map(p => tmp[+p].active = false);
        tmp[id].active = true;
    
        this.props.onSetCurrentProfile( {
            currentProfile: id,
            profiles: tmp
        });

    }

   
    
    disableEditMode = () => {
        let tmp = JSON.parse(JSON.stringify(this.props.profiles));
        Object.keys(tmp).map(p => tmp[+p].inEditMode = false);
    
        this.props.onDisableEditProfile( {
            profiles: tmp
        });
    }

    saveRenameValue = (value) => {
        let tmp = JSON.parse(JSON.stringify(this.props.profiles));
        tmp[this.props.currentProfile].name = value;
    
      
        this.props.onEditProfile({
            profiles: tmp
        });
    }

    
    enablEditProfile = () => {
        let tmp = JSON.parse(JSON.stringify(this.props.profiles))
        Object.keys(tmp).map(p => tmp[+p].inEditMode = false);
     
         const id = this.props.currentProfile;
     
         tmp[id].inEditMode = true;
         tmp[id].active = true;
    
        this.props.onEnableEditProfile({
            profiles: tmp
        });

    }

    add = () => {
        let tmp = JSON.parse(JSON.stringify(this.props.profiles))
        let k = Object.keys(tmp);
        let id = Math.max(...k) + 1;
        k.forEach(p => tmp[p].active = false);
        tmp[id] = { icon: 'custom', name: 'New Profile', editable: true, inEditMode: false, active: true };
    

        this.props.onAddProfile({
            currentProfile: id,
            profiles: tmp
        })
    }


    remove = () => {

        let id = this.props.currentProfile;

        let tmp = JSON.parse(JSON.stringify(this.props.profiles))
        delete tmp[id]
        while (!tmp[id]) {
            id-= 1;
        }
        tmp[id].active = true;
       
        this.props.onRemoveProfile( {
            profiles: tmp, openAlert: false, currentProfile: id
        });

    }


    scrollToBottom = () => {
       // this.end.scrollIntoView({ behavior: "smooth" });
    }

    moveUp = () =>{
        // let id = this.props.currentProfile;

        // let uId = id-1;
        // while(!this.props.profiles[uId]){
        //     uId--;
        // }

        // this.proRef[uId].scrollIntoViewIfNeeded();
        // this.props.onMoveUp()

        let tmp = JSON.parse(JSON.stringify(this.props.profiles));


        let id = +this.props.currentProfile;
        let uId = id-1;
        while(!tmp[uId]){
            uId--;
        }
    
        // disableActiveMode(tmp);
    
        const tmpVar = tmp[uId];
        tmp[uId] = tmp[id]
        tmp[id] = tmpVar;
      
        tmp[uId].active = true;
        //jest can't recornize this
       // this.proRef[uId].scrollIntoViewIfNeeded();

        this.props.onMoveUp({
            currentProfile :uId,
            profiles:tmp
        });

    }


    moveDown = () =>{
        // let id = this.props.currentProfile;

        // let uId = id+1;
        // while(!this.props.profiles[uId]){
        //     uId++;
        // }

        // this.proRef[uId].scrollIntoViewIfNeeded();
        // this.props.onMoveDown();

        let tmp = JSON.parse(JSON.stringify(this.props.profiles));
   

        let id = this.props.currentProfile;
        let uId = id+1;
        while(!tmp[uId]){
            uId++;
        }
        const tmpVar = tmp[uId];
        tmp[uId] = tmp[id]
        tmp[id] = tmpVar;
        
       
        tmp[uId].active = true;
        //jest can't recornize this
       // this.proRef[uId].scrollIntoViewIfNeeded();
        this.props.onMoveDown({
            currentProfile :uId,
            profiles:tmp
        });

    }

    validate =() =>{
       
        let k = this.props;
        let tmp = JSON.parse(JSON.stringify(k.profiles));
        if(tmp[k.currentProfile].name.trim() === ''){
         
            tmp[k.currentProfile].name = tmp[k.currentProfile].prevValidName;
        } else {
            tmp[k.currentProfile].prevValidName = tmp[k.currentProfile].name;
    
        }
        Object.keys(tmp).map(p => tmp[+p].inEditMode = false);
    
       
        this.props.onValidateProfile({
            profiles: tmp
        });;
    }

    componentDidUpdate(prevPros, prevState) {
        if (Object.keys(prevPros.profiles).length < Object.keys(this.props.profiles).length) {
            this.scrollToBottom();
        }

        if(Object.keys(prevPros.profiles).length != Object.keys(this.props.profiles).length
         || Object.keys(prevPros.profiles).some(p => prevPros.profiles[+p].prevValidName !==
             this.props.profiles[+p].prevValidName )
        ){
            console.log('change');
            clearTimeout(this.k);
            this.k = setTimeout(() => { 

                axios.get(`https://jsonplaceholder.typicode.com/users`)
                .then(res => {
                    console.log(res);
                })

             }, 3000);
        }

    }

    openAlert = () => {
        //this.setState({openAlert: true})
        this.props.onOpenAlert();
    }

    closeAlert = () => {
        // this.setState({openAlert: false})
        this.props.onCloseAlert();
    }

    render() {
        const props = this.props
        const currentId = props.currentProfile

        let profilesGUI = Object.keys(props.profiles).map(p => {

            let tmp = props.profiles[+p];
            return <ProfileItem id={+p}
                reference={(el) => { this.proRef[+p] = el; }}
                setCurrentProfile={this.setCurrentProfile}
                value={tmp} key={+p}
                saveRenameValue={this.saveRenameValue}
                disableEditMode={this.validate}>
            </ProfileItem>
        });

        return <div className={[profileStyles['thx-drawer'], 'flex'].join(' ')}>
            <div className="main-title">
                Profile List
          </div>

            <div id="profileWrapper" className={[profileStyles['drawer-select'], 'flex'].join(' ')}>

                <div id="profileList" className={[profileStyles['profileList'], 'scrollable'].join(' ')}>
                    {profilesGUI}
                    {/* add a dummy div for scrolling to bottom */}
                    <div style={{ position: 'relative', height: '0px'}}
                        ref={(el) => { this.end = el; }}>
                    </div>
                </div>


                <ProfileActionBar
                    editable={this.props.profiles[currentId].editable}
                    isFirst={Math.min(...Object.keys(props.profiles).map(p => +p)) === currentId}
                    isLast={Math.max(...Object.keys(props.profiles).map(p => +p)) === currentId}
                    moveUp={this.moveUp}
                    moveDown={this.moveDown}
                    edit={this.enablEditProfile}
                    add={this.add}
                    remove={this.openAlert}
                ></ProfileActionBar>

                <Alert
                    open={props.openAlert}
                    message={props.profiles[currentId].name}
                    title={"delete EQ"}
                    blur={this.closeAlert} delete={this.remove}></Alert>
            </div>

        </div>
    }
}
const mapStateToProps = state => {
    return {
        profiles: state.profiles.profiles,
        currentProfile: state.profiles.currentProfile,
        openAlert: state.profiles.openAlert
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddProfile: (data) => dispatch(action.addProfile(data)),
      //  onAddProfile: () => dispatch(action.addProfile()),
        onRemoveProfile: (data) => dispatch(action.removeProfile(data)),
        onSetCurrentProfile: (data) => dispatch(action.setCurrentProfile(data)),
        onOpenAlert: () => dispatch(action.openAlert()),
        onCloseAlert: () => dispatch(action.closeAlert()),
        onEnableEditProfile: (data) => dispatch(action.enableEditMode(data)),
        onDisableEditProfile: (data) => dispatch(action.disableEditMode(data)),
        onEditProfile: (data) => dispatch(action.editProfile(data)),
        onValidateProfile: (data) => dispatch(action.validateProfile(data)),
        onMoveUp:(data)=> dispatch(action.moveUpProfile(data)),
        onMoveDown:(data)=> dispatch(action.moveDownProfile(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);
