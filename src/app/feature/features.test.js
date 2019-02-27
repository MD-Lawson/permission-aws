import React from 'react';
import {Features} from './features';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from '../../components/searchBar';
import NavBar from '../../components/navbar.js'
import Feature from './featureCard';

Enzyme.configure({ adapter: new Adapter() });

var testProps = {
    features: [{
        FeatureId: 2,
        Key: "ServiceChange",
        Name: "ServiceChange",
        Description: "Allow a user to edit a service change for in contract.",
        ApplicationId: 1,
        Enable: true,
    },
    {
        FeatureId: 3,
        Key: "ModifyServiceChange",
        Name: "ModifyServiceChange",
        Description: "Allow a user to edit a service change for in contract.",
        ApplicationId: 1,
        Enable: true,
    }],
    nav: { selectedApplication: 1 },
}


const renderer = new ShallowRenderer();
describe("Features page", () => {
    it("renders components as expected", () => {
        let fetchFeatures = jest.fn();
        let wrapper = shallow(<Features {...testProps} actions={{
            fetchFeatures
        }} />);
        expect(wrapper.find(NavBar)).toHaveLength(1);
        expect(wrapper.find(SearchBar)).toHaveLength(1);
        expect(wrapper.find(Feature)).toHaveLength(2);
    })
    it("makes fetchFeatures call when mounts", () => {
        let fetchFeatures = jest.fn();
        let spyMount = jest.spyOn(Features.prototype, 'componentDidMount')
        let wrapper = shallow(<Features {...testProps} actions={{
            fetchFeatures
        }} />);
        expect(spyMount).toHaveBeenCalledTimes(1);
        expect(fetchFeatures).toHaveBeenCalledTimes(1);
        spyMount.mockClear();
    })

    it("makes fetchFeatures call when selectedApplication prop updates", () => {
        let fetchFeatures = jest.fn();
        let spyMount = jest.spyOn(Features.prototype, 'componentDidMount')
        let spyUpdate = jest.spyOn(Features.prototype, 'componentDidUpdate')
        let wrapper = shallow(<Features {...testProps} actions={{
            fetchFeatures
        }} />);

        wrapper.setProps({nav: {
            selectedApplication: 2
        }});
        //wrapper.update();
        expect(spyMount).toHaveBeenCalledTimes(1);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(fetchFeatures).toHaveBeenCalledTimes(2);
        spyMount.mockClear();
    })

    it("calls searchChange when value in search bar changes and sets state", () => {
        let fetchFeatures = jest.fn();
        let spySearchChange =jest.spyOn(Features.prototype, 'onSearchChange')
        let spySetState = jest.spyOn(Features.prototype, 'setState')
        
        let wrapper = shallow(<Features {...testProps} actions={{
            fetchFeatures
        }} />);

        wrapper.find(SearchBar).simulate('change');
        expect(spySearchChange).toHaveBeenCalledTimes(1);
        expect(spySetState).toHaveBeenCalledTimes(1);
    })

    it("calles onFeatureSaved when save happens on feature card and makes a post action", () => {
        let fetchFeatures = jest.fn();
        let postFeatures = jest.fn();
        let spyFeatureSaved =jest.spyOn(Features.prototype, 'onFeatureSaved')

        let wrapper = shallow(<Features {...testProps} actions={{
            fetchFeatures,
            postFeatures
        }} />);

        wrapper.find(Feature).first().simulate('save', {FeatureId: 1, Enable: true});
        expect(spyFeatureSaved).toHaveBeenCalledTimes(1);
        expect(postFeatures).toHaveBeenCalledTimes(1);
    })
})