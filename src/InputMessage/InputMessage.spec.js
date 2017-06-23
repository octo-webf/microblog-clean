import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import InputMessage from './InputMessage';
import * as ApiHelper from '../ApiHelper/ApiHelper';

describe('InputMessage component', () => {
  describe('on render', () => {
    it('should render an input', () => {
      const wrapper = shallow(<InputMessage />);

      expect(wrapper.find('input')).to.have.length(1);
    });
  });

  describe('on change', () => {
    it('should set state with input value', () => {
      // given
      const wrapper = shallow(<InputMessage />);
      const input = wrapper.find('input');

      // when
      input.simulate('change', { target: { value: 'toto' } });

      // then
      expect(wrapper.state('inputValue')).to.equal('toto');
    });
  });

  describe('on key press', () => {
    let spyApiHelperPostMessage;

    beforeEach(() => {
      spyApiHelperPostMessage = sinon.stub(ApiHelper, 'postMessage').returns(Promise.resolve());
    });

    afterEach(() => {
      spyApiHelperPostMessage.restore();
    });

    describe('with a key different than enter', () => {
      it('should do nothing', () => {
        // given
        const input = shallow(<InputMessage />).find('input');

        // when
        input.simulate('keyPress', { key: 'notEnter' });

        // then
        expect(spyApiHelperPostMessage.callCount).to.equal(0);
      });
    });

    describe('with enter', () => {
      it('should call ApiHelper.postMessage with value', () => {
        // given
        const onSubmit = sinon.spy();
        const wrapper = shallow(<InputMessage onSubmit={onSubmit} />);
        wrapper.setState({ inputValue: 'My new message' });
        window.localStorage.setItem('name', 'John');

        const input = wrapper.find('input');

        // when
        input.simulate('keyPress', { key: 'Enter' });

        // then
        expect(onSubmit).to.have.been.calledOnce;
        expect(onSubmit.args[0]).to.deep.equal(['John', 'My new message']);
      });

      it('should invoke prop onEnter', () => {
        // given
        const onSubmitStub = sinon.stub();
        const wrapper = shallow(<InputMessage onSubmit={onSubmitStub} />);
        wrapper.setState({ inputValue: 'My new message' });
        const input = wrapper.find('input');

        // when
        input.simulate('keyPress', { key: 'Enter' });

        // then
        expect(onSubmitStub.callCount).to.equal(1);
        expect(wrapper.state('inputValue')).to.equal('');
      });
    });
  });
});
