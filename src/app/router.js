import React, { Component } from "react";
import NavBar from '../components/navbar.js';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import CassiniAdminUi from './cassiniAdminUi.js';
import Features from './feature/features.js';
import FeatureSetsPage from './featureSets/featureSetsPage'
import AddFeatureSet from "./featureSets/addFeatureSet";
import RolesPage from "./roles/rolesPage";
import GroupsPage from "./groups/groupsPage";
import AddGroup from "./groups/addGroup";
import UsersPage from "./Users/usersPage";
import AddUser from "./Users/addUser";




class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={CassiniAdminUi} />
                <Route path='/features' component={Features} />
                <Route path='/featuresets' component={FeatureSetsPage} />
                <Route path='/addFeatureSet' component={AddFeatureSet} />
                <Route path='/roles' component={RolesPage} />
                <Route path='/groups' component={GroupsPage} />
                <Route path='/addGroup' component={AddGroup} />
                <Route path='/users' component={UsersPage} />
                <Route path='/addUser' component={AddUser} />
                <Route render={() =>
                    <div>
                        <NavBar />
                        <Redirect to='/' />
                    </div>
                } />
            </Switch>
        );

    }
}

export default withRouter(Routes);