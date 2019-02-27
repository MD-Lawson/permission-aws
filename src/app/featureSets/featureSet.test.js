import React from 'react';
import {FeatureSet} from './featureSet';
import {FeatureCardSet} from '../feature/featureCard';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var testProps
describe("FeatureSet", () => {
    var onSave;


    beforeEach(() => {
        testProps = {
                id: 2,
                name: "ServiceChange",
                description: "Allow a user to edit a service change for in contract.",
                usedFeatures: [{
                    FeatureId: 5,
                    Name: 'ActivityFeed',
                }],
                allFeatures: [{
                    FeatureId: 5,
                    Name: 'ActivityFeed'
                },
                {
                    FeatureId: 1,
                    Name: 'Props'
                }],
                nav: { selectedApplication: 1 },
        }

        onSave = jest.fn();
    })

    afterEach(() => {
        onSave.mockClear();
    })

    it("renders components as expected", () => {
        let wrapper = shallow(<FeatureSet {...testProps} onSave={onSave} />);
        expect(wrapper.find('#editButton')).toHaveLength(1);
        expect(wrapper.find(FeatureCardSet)).toHaveLength(0);
        expect(wrapper.find('.saveButton')).toHaveLength(1);
    })

    it("renders components as expected after edit button has been pressed", () => {
        let wrapper = shallow(<FeatureSet {...testProps} onSave={onSave} />);
        wrapper.find('#editButton').first().simulate('click');
        expect(wrapper.find('.saveButton')).toHaveLength(2);
        expect(wrapper.find(FeatureCardSet)).toHaveLength(2);
    })

    it("renders properly after cancel button has been pressed", () => {
        let wrapper = shallow(<FeatureSet {...testProps} onSave={onSave} />);
        wrapper.setState({
            editing: true,
        });
        wrapper.find('#cancelButton').first().simulate('click');
        expect(wrapper.find('#editButton')).toHaveLength(1);
        expect(wrapper.find(FeatureCardSet)).toHaveLength(0);
    })

    it("updates properly when enablechange is called on enabled feature", () => {
        let wrapper = shallow(<FeatureSet {...testProps} onSave={onSave} />);
        wrapper.setState({
            editing: true,
        });
        let newChangedFeature = {
            FeatureSetId: 2,
            Enabled: true,
            FeatureId: 5,
        }
        wrapper.find(FeatureCardSet).first().simulate('enableChange', 5, true);
        console.log(wrapper.state());
        expect(wrapper.find(FeatureCardSet)).toHaveLength(2);
        // expect(wrapper.state().changedFeatures).toHaveLength(1);
        // expect(wrapper.state().changedFeatures[0]).toEqual(newChangedFeature);
    })

    it("updates properly when enablechange is called on unenabled feature", () => {
        let testProps = {
            id: 2,
            name: "ServiceChange",
            description: "Allow a user to edit a service change for in contract.",
            usedFeatures: [{
                FeatureId: 4,
                Name: 'ActivityFeed',
            }],
            allFeatures: [{
                FeatureId: 5,
                Name: 'ActivityFeed'
            },
            {
                FeatureId: 1,
                Name: 'Props'
            }],
            nav: { selectedApplication: 1 },
    }
        let wrapper = shallow(<FeatureSet {...testProps} onSave={onSave} />);
        wrapper.setState({
            editing: true,
        });
        let newChangedFeature = {
            FeatureSetId: 2,
            Enabled: false,
            FeatureId: 5,
        }
        wrapper.find(FeatureCardSet).first().Enabled.toEqual(false);
        wrapper.find(FeatureCardSet).first().simulate('enableChange');
        expect(wrapper.state().changedFeatures).toHaveLength(1);
        expect(wrapper.state().changedFeatures[0]).toEqual(newChangedFeature);
    })
})