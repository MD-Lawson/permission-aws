import React from 'react';
import Role from "./role";
import NavBar from '../../components/navbar.js'
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';
import SearchBar from '../../components/searchBar';
import pickBy from 'lodash.pickby';

class RolesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
        this.handleSave = this.handleSave.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    handleSave(newRole){
        this.props.actions.editRole(newRole);
        this.props.actions.postRoleEdits(newRole);
    }

    componentDidMount(){
        this.props.actions.fetchRoles("/api/roles");
        this.props.actions.fetchFeatureSets("/api/featureSets?applicationId=" + this.props.nav.selectedApplication);
    }

    componentDidUpdate(prevProps){
        if(this.props.nav.selectedApplication !== prevProps.nav.selectedApplication ) {
            this.props.actions.fetchRoles("/api/roles");
            this.props.actions.fetchFeatureSets("/api/featureSets?applicationId=" + this.props.nav.selectedApplication);
        }
    }

    onSearchChange(searchValue) {
        this.setState({
            searchTerm: searchValue,
        });
    }

    render() {
        var roles = this.props.roles
        var searchTerm = this.state.searchTerm;

        const searchRE = new RegExp(`${searchTerm}`, 'i');
        if (searchTerm) {
            roles = pickBy(roles, (role) => {
                return role.Name.match(searchRE) || role.Description.match(searchRE);
            });
        }

        return (
            <div>
                <NavBar />
                <h1 className="md-display-1">Roles</h1>

                <div flex="true" className="md-input-container">
                    <SearchBar onChange={this.onSearchChange}></SearchBar>
                </div>

                <div layout="row">
                    <div layout="column" flex="50">
                        <div flex="true">
                            <div>
                                {Object.values(roles).map((role) =>
                                    <Role
                                        key={role.RoleId}
                                        id={role.RoleId}
                                        name={role.Name}
                                        description={role.Description}
                                        onSave={this.handleSave}
                                        featureSets={this.props.featureSets}
                                        usedFeatureSet={role.FeatureSetId}
                                        enable={role.Enable}
                                        applicationId={this.props.nav.application}
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
    featureSets: state.featureSets.featureSets,
    roles: state.roles.roles,

});
const mapDispatchToProps = dispatch => {
     return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesPage);