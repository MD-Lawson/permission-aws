import React from 'react';
import { FeatureSetsPage } from './featureSetsPage';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../../components/navbar.js'
import FeatureSet from './featureSet';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

var testProps
const renderer = new ShallowRenderer();
describe("FeatureSets page", () => {
    var fetchFeatureSets;
    var fetchFeatures;

    beforeEach(() => {
        testProps = {
            featureSets: [{
                FeatureId: 2,
                Name: "ServiceChange",
                Description: "Allow a user to edit a service change for in contract.",
                Features: [{
                    FeatureId: 5,
                    Name: 'ActivityFeed',
                }]
            }],
            nav: { selectedApplication: 1 },
        }

        fetchFeatures = jest.fn();
        fetchFeatureSets = jest.fn();
    })

    afterEach(() => {
        fetchFeatureSets.mockClear();
    })

    it("renders components as expected", () => {
        let wrapper = shallow(<FeatureSetsPage {...testProps} actions={{
            fetchFeatureSets,
            fetchFeatures
        }} />);
        expect(wrapper.find(NavBar)).toHaveLength(1);
        expect(wrapper.find(Link)).toHaveLength(1);
        expect(wrapper.find(FeatureSet)).toHaveLength(1);
    })

    it("makes fetchFeatureSets call when mounts", () => {
        let spyMount = jest.spyOn(FeatureSetsPage.prototype, 'componentDidMount')
        let wrapper = shallow(<FeatureSetsPage {...testProps} actions={{
            fetchFeatureSets,
            fetchFeatures
        }} />);
        expect(spyMount).toHaveBeenCalledTimes(1);
        expect(fetchFeatureSets).toHaveBeenCalledTimes(1);
        spyMount.mockClear();
    })

    it("makes fetchFeatureSets call when selectedApplication prop updates", () => {
        let spyMount = jest.spyOn(FeatureSetsPage.prototype, 'componentDidMount')
        let spyUpdate = jest.spyOn(FeatureSetsPage.prototype, 'componentDidUpdate')
        let wrapper = shallow(<FeatureSetsPage {...testProps} actions={{
            fetchFeatureSets,
            fetchFeatures
        }} />);

        wrapper.setProps({
            nav: {
                selectedApplication: 2
            }
        });
        //wrapper.update();
        expect(spyMount).toHaveBeenCalledTimes(1);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(fetchFeatures).toHaveBeenCalledTimes(2);
        spyMount.mockClear();
    })

    it("calles handle when save happens on feature set and makes a post action", () => {
        let postFeatureSetEdits = jest.fn();
        let editFeatureSet = jest.fn();
        let saveFeatureSetFeature = jest.fn();
        let spyFeatureSetSaved = jest.spyOn(FeatureSetsPage.prototype, 'handleSave')

        let wrapper = shallow(<FeatureSetsPage {...testProps} actions={{
            fetchFeatureSets,
            fetchFeatures,
            postFeatureSetEdits,
            editFeatureSet,
            saveFeatureSetFeature,
        }} />);

        wrapper.find(FeatureSet).first().simulate('save', { FeatureId: 1, Enable: [1] }, [1]);
        expect(spyFeatureSetSaved).toHaveBeenCalledTimes(1);
        expect(postFeatureSetEdits).toHaveBeenCalledTimes(1);
        expect(editFeatureSet).toHaveBeenCalledTimes(1);
        expect(saveFeatureSetFeature).toHaveBeenCalledTimes(1);
    })
})