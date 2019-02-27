import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios'
import NavBar from '../../components/navbar.js'
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';
import User from './user';

class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            shouldRedirect: false,
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSave(newUser) {

        newUser = {
            ...newUser, UserId: 0,
        }

        this.props.actions.addNewUser(newUser);
        axios.post(`/api/users/` + newUser.UserId + `/save`, newUser).then(res => {
            Object.values(this.props.groups).map((group) => {
                for(var i = 0; i < newUser.Groups.length; i++){
                    if(group.GroupId === newUser.Groups[i].GroupId){
                        var groupUser = {
                            UserId: res.data.UserId,
                            GroupId: group.GroupId,
                            Enabled: true,
                        }
                        // console.log("user " + groupUser.UserId + " added to group " + groupUser.GroupId );
                        this.props.actions.saveUserOnGroup(groupUser);
                    }
                }
                return false;
            })

            this.setState({
                shouldRedirect: true,
            })

        })
    }

    handleCancel() {
        this.props.history.goBack();
    }

    render() {

        if(this.state.shouldRedirect){
            return(<Redirect to="/users" />)
        }

        return (
            <div>
                <NavBar />
                <h1 className="md-display-1">Add User</h1>

                <div layout="row">
                    <div layout="column" flex="50">
                        <div flex="true">
                            <div>

                                <User
                                    key=""
                                    id=""
                                    name=""
                                    onSave={this.handleSave}
                                    groups={this.props.groups}
                                    usedGroups={[]}
                                    enable={false}
                                    applicationId={this.props.nav.application}
                                    initialEditState={true}
                                    handleCancel={this.handleCancel}
                                />

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

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);