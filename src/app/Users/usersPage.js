import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar.js'
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';
import SearchBar from '../../components/searchBar';
import pickBy from 'lodash.pickby';
import User from './user';

class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
        this.handleSave = this.handleSave.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount(){
        this.props.actions.fetchGroups("/api/groups");
        this.props.actions.fetchUsers("/api/users");
    }

    componentDidUpdate(prevProps){
        if(this.props.nav.selectedApplication !== prevProps.nav.selectedApplication ) {
            this.props.actions.fetchGroups("/api/groups");
            this.props.actions.fetchUsers("/api/users");
        }
    }

    handleSave(updatedUser, changedGroups) {

        this.props.actions.editUser(updatedUser);
        if(changedGroups.length > 0){
            for(var group of changedGroups){
               var newGroupUser = {
                    ...updatedUser,
                    Groups: null,
                }
                this.props.actions.editGroupUsers(newGroupUser, group.GroupId)
                this.props.actions.saveUserOnGroup(group);
            }
        }

        for(var i = 0; i < updatedUser.Groups.length; i++ ){
            updatedUser.Groups[i].Users = [];
        }
        this.props.actions.postUserEdits(updatedUser);

    }

    onSearchChange(searchValue) {
        this.setState({
            searchTerm: searchValue,
        });
    }

    render() {
        var searchTerm = this.state.searchTerm;
        var users = this.props.users;

        const searchRE = new RegExp(`${searchTerm}`, 'i');
        if (searchTerm) {
            users = pickBy(users, (user) => {
                return user.UserName.match(searchRE)
            });
        }

        return (
            <div>
                <NavBar />
                <h1 className="md-display-1">Users</h1>

                <div flex="true" className="md-input-container">
                    <SearchBar onChange={this.onSearchChange}></SearchBar>
                </div>

                <div layout="row" layout-xs="column">
                    <span flex="true"></span>
                    <span>
                        <Link to="/addUser"><button md-no-ink="true" className="saveButton" onClick={this.addNew}>Add New</button></Link>
                    </span>
                </div>

                <div layout="row">
                    <div layout="column" flex="50">
                        <div flex="true">
                            <div>
                                {Object.values(users).map((user) =>
                                    <User
                                        key={user.UserId}
                                        id={user.UserId}
                                        name={user.UserName}
                                        onSave={this.handleSave}
                                        groups={this.props.groups}
                                        usedGroups={user.Groups}
                                        enable={user.UserEnable}
                                        applicationId={this.props.nav.application}
                                        inititalEditState={false}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    groups: state.groups.groups,
    users: state.users.users,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);