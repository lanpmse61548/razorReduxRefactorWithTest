import React from 'react';
import { mount } from 'enzyme';
import ProfilePanel from './profile-panel';
import profiles from '../store/reducers/profiles';
import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import ProfileItem from '../component/profile-panel/profile-item/profile-item';
import { get } from 'https';

const rootReducer = combineReducers({
    profiles: profiles,
    //dummy: dummy
})

const store = createStore(rootReducer);

// at(0) a wrapper around the node at a given index of the current wrapper.
// get(0) return the node

describe('ProfilePanel', () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount( <Provider store={store}><ProfilePanel/></Provider>);
  
    //expect(component).toMatchSnapshot();
    //expect(component.find(ProfileItem)).to.have.length(4);
   // expect(component.find(ProfileItem)).to.have.lengthOf(4);

    console.log(component.find(ProfileItem).at(0).text());
   // expect(component.find(ProfileItem)).to.have.lengthOf(4);
    expect(component.find(ProfileItem).length).toBe(7);
    expect(component.find(ProfileItem).get(2).props.value.name).toBe('movie');
    expect(component.find(ProfileItem).at(2).text()).toBe('movie');

  });
});