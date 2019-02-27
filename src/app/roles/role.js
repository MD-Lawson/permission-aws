import React from 'react';
import Switch from 'react-toggle-switch';
import { DropdownBootRole as Dropdown } from '../../components/dropdown.js';

class Role extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            name: this.props.name,
            description: this.props.description,
            newFeatureSetId: this.props.usedFeatureSet,
            enable: this.props.enable,
            idFound: false,    
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    componentDidMount() {
 
    }

    save() {
        var newRole = {
            RoleId: this.props.id,
            Name: this.state.name,
            Description: this.state.description,
            FeatureSetId: this.state.newFeatureSetId,
            Enable: this.state.enable,
        };

        this.props.onSave(newRole);
        this.setState({
            editing: !this.state.editing,
        })
    }

    cancel() {
        this.setState({
            editing: !this.state.editing,
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

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                enable: !prevState.enable,
                changed: !prevState.changed
            };
        });
    };

    handleDropdownClick(newId) {
        // var id = parseInt(newId);
        this.setState({
            newFeatureSetId: newId,
        })  
    }

    setTitle(){
        var featureSets = this.props.featureSets;
        var title = "NA"
        
        for (var i = 0; i < featureSets.length; i++) {
            if(featureSets[i].FeatureSetId === this.props.usedFeatureSet) {
                title = featureSets[i].Name;
                break;
            }
        }
        
        return title;
    }

    render() {
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

                            </div>

                            <div className="col-sm-2 pull-right">

                                <div className="row">
                                    <div className="col-sm-6 pull-left">
                                        <button className="saveButton" onClick={this.handleEdit}>Edit</button>
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
                                    <button className="saveButton" onClick={this.save}>Save</button>
                                    <button className="saveButton" onClick={this.cancel}>Cancel</button>
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

                            <div className="col-sm-3 pull-left">
                                    {this.state.enable ? "Enabled" : "Disabled"}
                            </div>

                            <div className="col-sm-3 pull-left">
                                <Switch onClick={this.toggleSwitch} on={this.state.enable} aria-label="Enable Feature"></Switch>
                            </div>

                            <div className="col-sm-6 pull-left">
                                <Dropdown actions={this.props.featureSets} onClick={this.handleDropdownClick} title={this.setTitle()}></Dropdown>
                            </div>

                        </div>

                    </div>

                </div>
            )
        }
    }
}

export default Role;