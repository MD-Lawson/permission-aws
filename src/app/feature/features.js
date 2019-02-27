import React from 'react';
import SearchBar from '../../components/searchBar';
import NavBar from '../../components/navbar.js'
import pickBy from 'lodash.pickby';
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';
import Feature from './featureCard';

export class Features extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onFeatureSaved = this.onFeatureSaved.bind(this);
    }

    componentDidMount(){
        this.fetchComponentData();
    }

    componentDidUpdate(prevProps){
        if(this.props.nav.selectedApplication !== prevProps.nav.selectedApplication ) {
            this.fetchComponentData();
        }
    }

    fetchComponentData(){
        this.props.actions.fetchFeatures("/api/features/" + this.props.nav.selectedApplication);
    }

    onSearchChange(searchValue) {
        this.setState({
            searchTerm: searchValue,
        });
    }

    onFeatureSaved(newFeature) {
        this.props.actions.postFeatures(newFeature.FeatureId, newFeature.Enable, newFeature);
    }

    render() {
        var features = this.props.features;
        var searchTerm = this.state.searchTerm;

        const searchRE = new RegExp(`${searchTerm}`, 'i');
        if (searchTerm) {
            features = pickBy(features, (value) => {
                return value.Name.match(searchRE) || value.Description.match(searchRE);
            });
        }

        return (
            <div>
                <NavBar />

                <h1 className="md-display-1">Features</h1>

                <div flex="true" className="md-input-container">
                    <SearchBar onChange={this.onSearchChange}></SearchBar>
                </div>

                <div>
                    {
                        Object.keys(features).map((key) => {
                            if (features[key].ApplicationId === this.props.nav.selectedApplication) {
                                return (

                                    <Feature FeatureId={features[key].FeatureId}
                                        Name={features[key].Name}
                                        key={features[key].Key}
                                        Description={features[key].Description}
                                        ApplicationId={features[key].ApplicationId}
                                        Enable={features[key].Enable}
                                        onSave={this.onFeatureSaved}
                                        Feature={features[key]}>
                                    </Feature>

                                )
                            } else {
                                return null;
                            }
                        })

                    }
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    features: state.features.features,
    nav: state.nav,
});
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Features);