import React from 'react';
import { mount } from 'enzyme';
import ProfilePanel from './profile-panel';
import profiles from '../store/reducers/profiles';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import ProfileItem from '../component/profile-panel/profile-item/profile-item';
import Alert from '../component/alert/alert';
import * as actionTypes from '../store/actions/actionTypes'
//npm test -- --coverage
const rootReducer = combineReducers({
  profiles: profiles,
  //dummy: dummy
})

localStorage.removeItem("reduxState");
const store = createStore(rootReducer);

// at(0) a wrapper around the node at a given index of the current wrapper.
// get(0) return the node
const component = mount(<Provider store={store}><ProfilePanel /></Provider>);

describe('ProfilePanel', () => {
  it('should render correctly in "debug" mode', () => {

    //expect(component).toMatchSnapshot();
    //expect(component.find(ProfileItem)).to.have.length(4);
    // expect(component.find(ProfileItem)).to.have.lengthOf(4);

    console.log(component.find(ProfileItem).at(0).text());
    // expect(component.find(ProfileItem)).to.have.lengthOf(4);
    expect(component.find(ProfileItem).length).toBe(7);
    expect(component.find(ProfileItem).get(2).props.value.name).toBe('movie');
    expect(component.find(ProfileItem).at(2).text()).toBe('movie');

  });


  it('should render correctly after button add clicked', () => {

    component.find('#add-profile-btn')
      .simulate('click');

    expect(component.find(ProfileItem).length).toBe(8);
    expect(component.find(ProfileItem).at(7).text()).toBe('New Profile');


  });


  it('should render correctly after chose a profile', () => {
    component.find(ProfileItem).at(1).simulate('click');
    expect(component.find(ProfileItem).at(1).children().hasClass('active')).toBe(true);
  });


  it('should render correctly after edit a profile', () => {
    component.find(ProfileItem).at(4).simulate('click');
    // console.log(component.find(ProfileItem).at(4).debug());

    component.find('#edit-profile-btn')
      .simulate('click');
    // component.find(ProfileItem).get(4).value = 'text'  
    //  console.log(component.find(ProfileItem).at(4).debug());

    component.find(ProfileItem).at(4).find('#input-profile').
      simulate('change', { target: { value: 'Mynewvalue' } })
      .simulate('keypress', { key: 'Enter' })

    expect(component.find(ProfileItem).at(4).find('#input-profile').exists()).toEqual(true);

    //    component.find(ProfileItem).at(4).find('#input-profile').instance().value = 'abc';
    // component.find(ProfileItem).at(4).find('#input-profile').simulate('keypress', { key: 'Enter' });
    //  component.find(ProfileItem).at(4).simulate('blur');
    // component.find(ProfileItem).at(1).simulate('click');
    // expect(component.find(ProfileItem).at(1).children().hasClass('active')).toBe(true);


    // expect(component.find(ProfileItem).at(4).find('#input-profile').prop('value')).toEqual('asa');
    // expect(component.find(ProfileItem).at(4).get(0).props.value.name).toEqual('asa');

    // expect(component.find(ProfileItem).at(4).text()).toBe('My new value');

  });



  it('should render correctly after chose a profile', () => {
    component.find(ProfileItem).at(1).simulate('click');
    expect(component.find(ProfileItem).at(1).children().hasClass('active')).toBe(true);
  });


  it('should render correctly after move up', () => {
    component.find(ProfileItem).at(4).simulate('click');
    // console.log(component.find(ProfileItem).at(4).debug());

    component.find('#move-up-btn')
      .simulate('click');
    expect(component.find(ProfileItem).at(3).children().hasClass('active')).toBe(true);


  });


  it('should render correctly after after move down', () => {
    component.find(ProfileItem).at(3).simulate('click');
    // console.log(component.find(ProfileItem).at(4).debug());

    component.find('#move-down-btn')
      .simulate('click');
    expect(component.find(ProfileItem).at(4).children().hasClass('active')).toBe(true);


  });


  it('should render correctly when chose default profiles', () => {
    component.find(ProfileItem).at(1).simulate('click');
    expect(component.find('#remove-profile-btn').exists()).toBe(false)
    expect(component.find('#edit-profile-btn').exists()).toBe(false)
  });

  it('should render correctly when chose last profiles', () => {
    component.find(ProfileItem).at(7).simulate('click');
    expect(component.find('#move-down-btn').hasClass('disabled')).toBe(true)

    component.find(ProfileItem).at(0).simulate('click');
    expect(component.find('#move-up-btn').hasClass('disabled')).toBe(true)
  });


  it('should render correctly after delete a profile', () => {
    component.find(ProfileItem).at(6).simulate('click');

    component.find('#remove-profile-btn')
      .simulate('click');

    component.find(Alert).find('#alert-button').simulate('click');

    expect(component.find(ProfileItem).length).toBe(7);

    expect(component.find(ProfileItem).at(5).children().hasClass('active')).toBe(true);
  });

  // test reducer


  it('editing profile text', () => {
    expect(profiles(({
      currentProfile: 4,
      openAlert: false,
      profiles:
      {
        1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
      }
    }), {
      type: actionTypes.EDIT_PROFILES,
      data: {
        currentProfile: 4,
        openAlert: false,
        profiles:
        {
          1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
          2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
          3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
          4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
          5: { icon: 'custom', name: 'Custom aaa', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },
          6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
          7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
        }
      }
    })).toEqual({
      currentProfile: 4,
      openAlert: false,
      profiles:
      {
        1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom aaa', prevValidName: 'Custom aaa', editable: true, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
      }
    })
  });



  it('move up', () => {
    expect(profiles(({
      currentProfile: 4,
      openAlert: false,
      profiles:
      {
        1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
      }
    }), {
      type: actionTypes.MOVE_UP_PROFILE,
      data: {
        currentProfile: 4,
        openAlert: false,
        profiles:
        {
          1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
          2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
          3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
          4: { icon: 'custom', name: 'Custom aaa', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },
          5: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
          6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
          7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
        }
      }
    })).toEqual({
      currentProfile: 4,
      openAlert: false,
      profiles:
      {
        1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'custom', name: 'Custom aaa', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },
        5: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
      }
    })
  });


  it('move DOWN', () => {
    expect(profiles(({
      currentProfile: 4,
      openAlert: false,
      profiles:
      {
        1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },
        6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
      }
    }), {
      type: actionTypes.MOVE_DOWN_PROFILE,
      data: {
        currentProfile: 5,
        openAlert: false,
        profiles:
        {
          1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
          2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
          3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
          4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
          5: { icon: 'custom', name: 'Custom aaa', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },

          6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
          7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
        }
      }
    })).toEqual({
      currentProfile: 5,
      openAlert: false,
      profiles:
      {
        1: { icon: 'default', name: 'default', prevValidName: 'default', editable: false, inEditMode: false, active: true },
        2: { icon: 'game', name: 'game', prevValidName: 'game', editable: false, inEditMode: false, active: false },
        3: { icon: 'movie', name: 'movie', prevValidName: 'movie', editable: false, inEditMode: false, active: false },
        4: { icon: 'music', name: 'music', prevValidName: 'music', editable: false, inEditMode: false, active: false },
        5: { icon: 'custom', name: 'Custom aaa', prevValidName: 'Custom', editable: true, inEditMode: false, active: false },

        6: { icon: 'custom', name: 'demo long text', prevValidName: 'demo long text', editable: true, inEditMode: false, active: false },
        7: { icon: 'custom', name: 'another test', prevValidName: 'another test', editable: true, inEditMode: false, active: false }
      }
    })
  });

});

