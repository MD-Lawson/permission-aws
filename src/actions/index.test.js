import * as types from './actionTypes';
import * as actions from './index';

describe('actions', () => {
    it('should create an action to set the applications available', () => {
        const applications = [
            {
                Id: 1,
                Name: "NewCo"
            },
        ]
        const expectedAction = {
            type: types.SET_APPLICATIONS,
            payload: applications
        }

        expect(actions.setApplications(applications)).toEqual(expectedAction)
    })

    it('should create an action to set the selectedApplication', () => {
        const selectedApplication = 1;

        const expectedAction = {
            type: types.SET_SELECTED_APPLICATION,
            payload: selectedApplication
        }

        expect(actions.setSelectedApplication(selectedApplication)).toEqual(expectedAction)
    })
})