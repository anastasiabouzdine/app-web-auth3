/* global describe, it, beforeEach, expect */

import { shallowMount } from '@vue/test-utils';
import Authorization from '@/components/views/Authorization';
import Permissions from '@/components/views/bits/Permissions';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Authorization.test.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Authorization);
  });

  it('renders correctly (snapshots matching)', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('deactivates submit button when form is not yet filled', () => {
    const submitButton = wrapper.find('#submitButton');
    expect(wrapper.vm.validForm).toBe(false);
    expect(submitButton.attributes().disabled).toBe('true');
  });

  it('activates submit button when form is valid', () => {
    wrapper.setData({
      validForm: true,
    });
    const submitButton = wrapper.find('#submitButton');
    expect(submitButton.attributes().disabled).toBeFalsy();
  });

  it('validates required fields correctly', () => {
    const requiredRule = wrapper.vm.rules.required;
    expect(requiredRule()).toBe('This field is required.');
    expect(requiredRule('notEmpty')).toBe(true);
  });

  it('shows authorization form by default', () => {
    const authForm = wrapper.find({ref: 'form'});
    expect(authForm.exists()).toBe(true);
    const permissions = wrapper.find(Permissions);
    expect(permissions.exists()).toBe(false);
  });

  it('shows requested permissions when permissions array and appId are provided', () => {
    wrapper = shallowMount(Authorization, {
      propsData: {
        permissionsArray: '[{streamId: "diary", level: "read"}]',
        appId: 'testApp',
      },
    });
    const authForm = wrapper.find({ref: 'form'});
    expect(authForm.exists()).toBe(false);
    const permissions = wrapper.find(Permissions);
    expect(permissions.exists()).toBe(true);
  });
});