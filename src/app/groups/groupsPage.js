import React from 'react';
import Group from "./group";
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar.js'
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';
import SearchBar from '../../components/searchBar';
import pickBy from 'lodash.pickby';

class GroupsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
        this.handleSave = this.handleSave.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    handleSave(updatedGroup) {

        this.props.actions.editGroup(updatedGroup);
        this.props.actions.postGroupEdits(updatedGroup);
    }

    // componentWillReceiveProps(nextProps){
    //     this.props.actions.postGroupEdits(nextProps.groups);
    // }

    componentDidMount(){
        this.props.actions.fetchGroups("/api/groups");
        this.props.actions.fetchFeatureSets("/api/featureSets?applicationId=" + this.props.nav.selectedApplication);
    }

    componentDidUpdate(prevProps){
        if(this.props.nav.selectedApplication !== prevProps.nav.selectedApplication ) {
            this.props.actions.fetchGroups("/api/groups");
            this.props.actions.fetchFeatureSets("/api/featureSets?applicationId=" + this.props.nav.selectedApplication);
        }
    }

    onSearchChange(searchValue) {
        this.setState({
            searchTerm: searchValue,
        });
    }

    render() {
        var searchTerm = this.state.searchTerm;

        var groups = this.props.groups;

        const searchRE = new RegExp(`${searchTerm}`, 'i');
        if (searchTerm) {
            groups = pickBy(groups, (group) => {
                return group.Name.match(searchRE) || group.Description.match(searchRE);
            });
        }

        return (
            <div>
                <NavBar />
                <h1 className="md-display-1">Groups</h1>

                <div flex="true" className="md-input-container">
                    <SearchBar onChange={this.onSearchChange}></SearchBar>
                </div>

                <div layout="row" layout-xs="column">
                    <span flex="true"></span>
                    <span>
                        <Link to="/addGroup"><button md-no-ink="true" className="saveButton" onClick={this.addNew}>Add New</button></Link>
                    </span>
                </div>

                <div layout="row">
                    <div layout="column" flex="50">
                        <div flex="true">
                            <div>
                                {Object.values(groups).map((group) =>
                                    <Group
                                        key={group.GroupId}
                                        id={group.GroupId}
                                        name={group.Name}
                                        description={group.Description}
                                        onSave={this.handleSave}
                                        featureSets={this.props.featureSets}
                                        usedFeatureSet={group.FeatureSetId}
                                        users={group.Users}
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
    groups: state.groups.groups,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);