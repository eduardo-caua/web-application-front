/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { SideMenu } from '../shared/components';
import * as DrawerContext from '../shared/contexts/DrawerContext';
import { BrowserRouter } from 'react-router-dom';

describe('<SideMenu />', () => {
  test('Listing correctly the menu items', () => {
    const drawerOptions: DrawerContext.IDrawerOption[] = [
      {
        icon: 'home',
        path: '/home',
        label: 'Home'
      }
    ];

    const drawerContextValues: DrawerContext.IDrawerContextData = {
      isDrawerOpen: true,
      toggleDrawerOpen: jest.fn(),
      drawerOptions: drawerOptions,
      setDrawerOptions: jest.fn()
    };

    jest.spyOn(DrawerContext, 'useDrawerContext').mockImplementation(() => drawerContextValues);

    const wrapper = mount(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    );

    expect(wrapper.find('ForwardRef(ListItemText)').first().props()).toMatchObject({
      primary: 'Home'
    });
  });
});
