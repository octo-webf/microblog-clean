/* eslint no-unused-expressions:0 */
import React from 'react';
import sinon from 'sinon';
import { Redirect } from 'react-router';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login component', () => {
  const props = {
    onAuthenticateAction: sinon.spy(),
    onUpdateLoginAction: sinon.spy(),
  };

  describe('on render', () => {
    it('should render an input', () => {
      const wrapper = shallow(<Login {...props} />);

      expect(wrapper.find('input')).to.have.length(1);
    });

    it('When user is authenticated should redirect to /', () => {
      const wrapper = shallow(<Login {...props} isAuthenticated />);

      expect(wrapper.find(Redirect)).to.have.length(1);
    });
  });

  describe('on change', () => {
    it('should dispatch onUpdateLoginAction', () => {
      // given
      const wrapper = shallow(<Login {...props} />);
      const input = wrapper.find('input');

      // when
      input.simulate('change', { target: { value: 'toto' } });

      // then
      expect(props.onUpdateLoginAction).to.have.been.calledOnce;
    });
  });

  describe('on key press', () => {
    describe('with a key different than enter', () => {
      beforeEach(() => {
        window.localStorage.clear();
      });

      it('should do nothing', () => {
        // given
        const input = shallow(<Login {...props} />).find('input');

        // when
        input.simulate('keyPress', { keyCode: 'notEnter' });

        // then
        expect(window.localStorage.length).to.equal(0);
      });
    });

    describe('with enter', () => {
      it('should dispatch onAuthenticateAction', () => {
        // given
        const wrapper = shallow(<Login {...props} />);
        wrapper.setState({ inputValue: 'My name' });
        const input = wrapper.find('input');

        // when
        input.simulate('keyPress', { key: 'Enter' });

        // then
        expect(props.onAuthenticateAction).to.have.been.calledOnce;
      });

      it('should save name inside local Storage with value', () => {
        // given
        const wrapper = shallow(<Login {...props} login="My name" />);
        wrapper.setState({ inputValue: 'My name' });
        const input = wrapper.find('input');

        // when
        input.simulate('keyPress', { key: 'Enter' });

        // then
        expect(window.localStorage.getItem('name')).to.equal('My name');
      });
    });
  });
});
