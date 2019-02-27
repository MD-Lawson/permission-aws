import React from 'react';
import { Link } from 'react-router-dom';
import FeatureSet from './featureSet';
import NavBar from '../../components/navbar.js'
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';

export class FeatureSetsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            featureSets: this.props.featureSets,
            newFeatureAddNew: false,
        }
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        this.props.actions.fetchFeatures("/api/features/" + this.props.nav.selectedApplication);
        this.props.actions.fetchFeatureSets("/api/featuresets/" + this.props.nav.selectedApplication);
    }

    componentDidUpdate(prevProps){
        if(this.props.nav.selectedApplication !== prevProps.nav.selectedApplication ) {
            this.props.actions.fetchFeatures("/api/features/" + this.props.nav.selectedApplication);
            this.props.actions.fetchFeatureSets("/api/featuresets/" + this.props.nav.selectedApplication);
        }
    }

    handleSave(updatedFeatureSet, changedFeatures){
        this.props.actions.editFeatureSet(updatedFeatureSet);
        if(changedFeatures.length > 0){
            for(var feature of changedFeatures)
            this.props.actions.saveFeatureSetFeature(feature);
        }

        this.props.actions.postFeatureSetEdits(updatedFeatureSet);
    }

    render() {
        //console.log(this.props.featureSets);
        var featureSets = this.props.featureSets;
        return (
            <div>
                <NavBar />
                <h1 className="md-display-1">Feature Sets</h1>

                <div layout="row" layout-xs="column">
                    <span flex="true"></span>
                    <span>
                        <Link to="/addFeatureSet"><button md-no-ink="true" className="saveButton">Add New</button></Link>
                    </span>
                </div>
                <div layout="row">
                    <div layout="column" flex="50">
                        <div flex="true">
                            <div>
                                {Object.values(featureSets).map((featureSet) =>
                                    <FeatureSet
                                        key={featureSet.FeatureSetId}
                                        id={featureSet.FeatureSetId}
                                        name={featureSet.Name}
                                        description={featureSet.Description}
                                        onSave={this.handleSave}
                                        allFeatures={this.props.features}
                                        usedFeatures={featureSet.Features}
                                        applicationId={this.props.nav.selectedApplication}
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
    features: state.features.features,
    nav: state.nav,
    featureSets: state.featureSets.featureSets,

});
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureSetsPage);