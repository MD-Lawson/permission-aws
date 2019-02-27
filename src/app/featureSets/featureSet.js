import React from 'react';
import {FeatureCardSet} from '../feature/featureCard';
export class FeatureSet extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            name: "",
            description: "",
            features: [],
            changedFeatures: [],   
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.enableChange = this.enableChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            description: this.props.description,
            features: this.props.usedFeatures,
        })
    }

    save() {
        
        var updatedFeatureSet = {
            FeatureSetId: this.props.id,
            Name: this.state.name,
            Description: this.state.description,
            Features: this.state.features

        }
        this.props.onSave(updatedFeatureSet, this.state.changedFeatures);
        this.setState({
            editing: !this.state.editing,
            changedFeatures: [],
        })
    }

    cancel() {
        this.setState({
            editing: !this.state.editing,
            changedFeatures: [],
        })
    }

    handleEdit() {
        this.setState({
            editing: !this.state.editing,
        })
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    enableChange(featureId, enable){
        var features = this.state.features;
        if(!enable){
            for(let i = 0; i < features.length; i++){
                if(features[i].FeatureId === featureId){
                    features.splice(i, 1);
                    let newFeatureChange = {
                        FeatureSetId: this.props.id,
                        Enabled: false,
                        FeatureId: featureId,

                    }
                    let shouldAdd = true;
                    if(this.state.changedFeatures.length === 0){
                        this.setState({
                            changedFeatures: this.state.changedFeatures.concat([newFeatureChange])
                        })
                    }else {
                        let tempArray = [...this.state.changedFeatures];
                        for(let j = 0; j < this.state.changedFeatures.length; j++){
                            if(this.state.changedFeatures[j].FeatureId === newFeatureChange.FeatureId){
                                tempArray.splice(j, 1);
                                this.setState({
                                    changedFeatures: [...tempArray]
                                });
                                shouldAdd = false;
                            }
                        }
                    }

                    if(shouldAdd){
                        this.setState({
                            changedFeatures: this.state.changedFeatures.concat([newFeatureChange])
                        })
                    }
                    
                }
            }
        }else {
            for(let i = 0; i < this.props.allFeatures.length; i++){
                if(this.props.allFeatures[i].FeatureId === featureId){
                    features.push(this.props.allFeatures[i]);
                    let newFeatureChange = {
                        FeatureSetId: this.props.id,
                        Enabled: true,
                        FeatureId: featureId,

                    }
                    let shouldAdd = true;
                    if(this.state.changedFeatures.length === 0){
                        this.setState({
                            changedFeatures: this.state.changedFeatures.concat([newFeatureChange])
                        })
                    }else {
                        let tempArray = [...this.state.changedFeatures];
                        for(let j = 0; j < this.state.changedFeatures.length; j++){
                            if(this.state.changedFeatures[j].FeatureId === newFeatureChange.FeatureId){
                                tempArray.splice(j, 1);
                                this.setState({
                                    changedFeatures: [...tempArray]
                                });
                                shouldAdd = false;
                            }
                        }
                    }

                    if(shouldAdd){
                        this.setState({
                            changedFeatures: this.state.changedFeatures.concat([newFeatureChange])
                        })
                    }
                    
                }
                }
            }
            this.setState({
                features: features,
            })
        }

    render() {
        var features = this.props.allFeatures;
        if (!this.state.editing) {
            return (
                <div className="container-fluid">
                    <div className="panel panel-default panelStyle">
                        <div className="row">

                            <div className="col-sm-8 pull-left">

                                <div className="row">
                                    <div name="title" className="col-sm-12">
                                        <h3> {this.props.name}</h3>
                                    </div>
                                </div>

                                <div className="row">
                                    <div name="description" className="col-sm-12">
                                    {this.props.description}
                                    </div>
                                </div>

                                <div className="row">
                                    <div name="description" className="col-sm-12">
                                        {this.state.features.length} features
                                    </div>
                                </div>

                            </div>

                            <div className="col-sm-2 pull-right">

                                <div className="row">
                                    <div className="col-sm-6 pull-left">
                                        <button className="actionButton" id="editButton" onClick={this.handleEdit}>Edit</button>
                                    </div>
                                </div>

                            </div>

                        </div >
                    </div>

                </div>
            )
        } else {
            return (
                <div className="container-fluid">
                    <div className="panel panel-default panelStyle">

                        <div className="row">
                            <div className="col-sm-10"></div>
                            <div className="col-sm-4 pull-right">
                                <div>
                                    <button className="actionButton" onClick={this.save}>Save</button>
                                    <button id="cancelButton" className="actionButton" onClick={this.cancel}>Cancel</button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 pull-left">
                            <h4><label style={{"color": "gray"}}>Name</label></h4>
                                <h3><input  className="textStyle" type="text" value={this.state.name} maxLength="50" onChange={this.handleNameChange} /></h3>
                            </div>

                        </div >

                        <div className="row">
                            <div className="col-sm-12 pull-left">
                            <label style={{"color": "gray"}}>Description</label>
                                <input className="textStyle" type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 pull-left">
                                {
                                    Object.keys(features).map((key) => {
                                        var inSet = [];
                                        if (features[key].ApplicationId === this.props.applicationId) {

                                            for (var i = 0; i < this.state.features.length; i++) {
                                                if (this.state.features[i].FeatureId === features[key].FeatureId) {
                                                    inSet.push(features[key].FeatureId)

                                                    return(
                                                    <FeatureCardSet FeatureId={features[key].FeatureId}
                                                    Name={features[key].Name}
                                                    id={features[key].Name}
                                                    key={features[key].FeatureId}
                                                    Description={features[key].Description}
                                                    ApplicationId={features[key].ApplicationId}
                                                    Enable={true}
                                                    onEnableChange={this.enableChange}
                                                    >
                                                </FeatureCardSet>
                                                    )
                                                }
                                            }
                                            if(inSet.includes(features[key].FeatureId)){

                                            }else {
                                                return (

                                                    <FeatureCardSet FeatureId={features[key].FeatureId}
                                                        Name={features[key].Name}
                                                        key={features[key].Key}
                                                        Description={features[key].Description}
                                                        ApplicationId={features[key].ApplicationId}
                                                        Enable={false}
                                                        onEnableChange={this.enableChange}
                                                        >
                                                    </FeatureCardSet>
    
                                                )
                                            }
                                            
                                        }else {
                                            return true;
                                        }

                                        return false;
                                    })

                                }
                            </div>
                        </div>

                    </div>

                </div>
            )
        }
    }
}

export default FeatureSet;