import features from "./featuresReducer";
import nav from "./navReducer";
import featureSets from "./featureSetsReducer";
import roles from "./rolesReducer";
import groups from "./groupsReducer";
import users from "./usersReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    features,
    nav,
    featureSets,
    roles,
    groups,
    users,
})
export default rootReducer;