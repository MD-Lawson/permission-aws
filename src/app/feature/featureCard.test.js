import React from 'react';
import { Feature } from './featureCard';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from 'react-toggle-switch';

Enzyme.configure({ adapter: new Adapter() });


var testProps = {
    FeatureId: 1,
    Name: "test",
    key: "test",
    Description: "test",
    ApplicationId: 1,
    Enable: true,
    onSave: jest.fn(), 
    Feature: 0
}

describe("Feature Card", () => {
    it("renders component as expected when state is unchanged", () => {
        let wrapper = shallow(<Feature {...testProps} />);
        expect(wrapper.find('div')).toHaveLength(14);
        expect(wrapper.find(Switch)).toHaveLength(1);
        expect(wrapper.find('button')).toHaveLength(0);
    })

    it("calls toggleSwitch when switch is pressed and calls setState", () => {
        let spyToggle = jest.spyOn(Feature.prototype, 'toggleSwitch')
        let spySetState = jest.spyOn(Feature.prototype, 'setState')

        let wrapper = shallow(<Feature {...testProps} />);
        expect(wrapper.state().changed).toEqual(false);
        wrapper.find(Switch).prop('onClick')();

        expect(spyToggle).toHaveBeenCalledTimes(1);
        expect(spySetState).toHaveBeenCalledTimes(1);
        expect(wrapper.state().changed).toEqual(true);
    })

    it("renders properly when state changed=true, i.e it renders buttons", () => {
        let wrapper = shallow(<Feature {...testProps} />);
        wrapper.find(Switch).prop('onClick')();

        expect(wrapper.find('button')).toHaveLength(2);
    })

    it("correctly calls prop onSave and updates state properrly when save is clicked", () => {
        let spySetState = jest.spyOn(Feature.prototype, 'setState')
        spySetState.mockClear();
        let spySave = jest.spyOn(Feature.prototype, 'save')
        let wrapper = shallow(<Feature {...testProps} />);
        wrapper.find(Switch).prop('onClick')();

        wrapper.find('#btnSave').prop('onClick')();

        expect(spySave).toHaveBeenCalledTimes(1);
        expect(testProps.onSave).toHaveBeenCalledTimes(1);
        expect(spySetState).toHaveBeenCalledTimes(2);
        expect(wrapper.state().changed).toEqual(false);
    })

    it("correctly cancels when cancel button is pressed", () => {
        let spySetState = jest.spyOn(Feature.prototype, 'setState')
        spySetState.mockClear();
        let spyCancel = jest.spyOn(Feature.prototype, 'cancel')
        let wrapper = shallow(<Feature {...testProps} />);
        wrapper.find(Switch).prop('onClick')();
        expect(wrapper.state().enable).toEqual(false);
        expect(wrapper.state().changed).toEqual(true);

        wrapper.find('#btnCancel').prop('onClick')();

        expect(spyCancel).toHaveBeenCalledTimes(1);
        expect(spySetState).toHaveBeenCalledTimes(2);
        expect(wrapper.state().changed).toEqual(false);
        expect(wrapper.state().enable).toEqual(true);
    })
})