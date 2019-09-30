import React from 'react';
import { mount } from 'enzyme';
import  ProfileItem from './profile-item';
describe(' ProfileItem', () => {
  it('should render correctly in "debug" mode', () => {

   let  profiles =
    {
        1: { icon: 'default', name:'default',prevValidName:'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game',prevValidName:'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie',prevValidName:'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music',prevValidName:'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom',prevValidName:'Custom', editable: true, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text demo long text demo',prevValidName:'demo long text demo long text demo', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'demo long texdsad',prevValidName:'demo long texdsad', editable: true, inEditMode: false, active: false }
    }

    let profilesGUI = Object.keys(profiles).map(p => {

        let tmp = profiles[+p];
        return <ProfileItem id={+p}
           // reference={(el) => { this.proRef[+p] = el; }}
           // setCurrentProfile={this.setCurrentProfile}
            value={tmp} key={+p}
           // saveRenameValue={this.saveRenameValue}
         //   disableEditMode={this.validate}
         >
        </ProfileItem>
    });
  
    expect(profilesGUI).toMatchSnapshot();
  });
});