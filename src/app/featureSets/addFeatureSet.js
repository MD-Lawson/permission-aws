import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar.js';
import { connect } from "react-redux";
import {postFeatureSets} from "../../actions/featureSetActions";

class addFeatureSet extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMessage: "",
            nameValue: "",
            descriptionValue: "",
            saveEnabled: false,
        };

        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
    }

    handleFocus = (e) => {
        e.target.select();
    }

    save() {
        
        var newFeatureSet = {
            Name: this.state.nameValue,
            Description: this.state.descriptionValue,
            Features: [],
        }
        this.props.postNewFeature(newFeatureSet)
    }
    
    cancel(){
        this.props.history.goBack();
    }

    handleNameChange = (e) => {
        if (e.target.value !== ""  || this.state.descriptionValue !== "") {
            this.setState({
                saveEnabled: true,
                nameValue: e.target.value,
            })
        } else {
            this.setState({
                saveEnabled: false,
                nameValue: e.target.value,
            })
        }
    }

    handleDescriptionChange = (e) => {
        if (e.target.value !== "" || this.state.nameValue !== "") {
            this.setState({
                saveEnabled: true,
                descriptionValue: e.target.value,
            })
        } else {
            this.setState({
                saveEnabled: false,
                descriptionValue: e.target.value,
            })
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <h1 className="md-display-1">Add Feature Set</h1>
                <div className="container-fluid">
                <form>
                    <div className="panel panel-default panelStyle">

                        <div className="row">
                            <div className="col-sm-10"></div>
                            <div className="col-sm-4 pull-right">
                                <div>

                                <Link to="/featureSets"><button className="actionButton" onClick={this.save} disabled={!this.state.saveEnabled}>Save</button></Link>
                                    <button className="actionButton" onClick={this.cancel}>Cancel</button>



                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 pull-left">
                                <h4><label style={{ "color": "gray" }}>Name</label></h4>
                                <h3><input className="textStyle" type="text" value={this.state.name} maxLength="50" onChange={this.handleNameChange} required /></h3>
                            </div>

                        </div >

                        <div className="row">
                            <div className="col-sm-12 pull-left">
                                <label style={{ "color": "gray" }}>Description</label>
                                <input className="textStyle" type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </div>
                        </div>

                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
     postNewFeature: (data) => dispatch(postFeatureSets(data))
});

export default connect(null, mapDispatchToProps)(addFeatureSet);
