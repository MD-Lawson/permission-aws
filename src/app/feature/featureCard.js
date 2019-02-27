import React from 'react';
import Switch from 'react-toggle-switch';

export class Feature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enable: this.props.Enable,
            changed: false,
            errorMessage: "",
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    save() {
        if (this.state.changed) {
            var newFeature = {
                ...this.props.Feature,
                Enable: this.state.enable
            }
            this.props.onSave(newFeature)
            this.setState(prevState => {
                return {
                    changed: !prevState.changed
                }
            })
        }
    }

    cancel() {
        this.setState(prevState => {
            return {
                changed: !prevState.changed,
                enable: !prevState.enable
            }
        })
    }

    toggleSwitch(){
        this.setState(prevState => {
            return {
                enable: !prevState.enable,
                changed: !prevState.changed
            };
        });
    };

    render() {

        return (
            <div className="container-fluid">
                <div className="panel panel-default panelStyle">
                    <div className="row">

                        <div className="col-sm-8 pull-left">

                            <div className="row">
                                <div name="title" className="col-sm-12">
                                   <h3> {this.props.Name}</h3>
                        </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    {this.props.Description}
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-2 pull-left">

                            <div className="row">
                                <div className="col-sm-6 pull-left">
                                    {this.state.enable ? "Enabled" : "Disabled"}
                                </div>

                                <div className="col-sm-6 pull-right">
                                    <Switch onClick={this.toggleSwitch} on={this.state.enable} aria-label="Enable Feature"></Switch>
                                </div>
                            </div>

                        </div>

                    </div >
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        {
                            this.state.changed &&
                            <div>
                                <button id="btnSave" className="actionButton" onClick={this.save}>Save</button>
                                <button id="btnCancel" className="actionButton" onClick={this.cancel}>Cancel</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}



class FeatureCardSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable: this.props.Enable,
            changed: false,
            errorMessage: "",
        };
        this.save = this.save.bind(this);
    }

    save() {
        
        if (this.state.changed) {
            this.props.onSave(this.props.FeatureId, this.state.enable)
            this.setState(prevState => {
                return {
                    changed: !prevState.changed
                }
            })
        }
    }

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                enable: !prevState.enable,
                changed: !prevState.changed
            };
        });
        this.props.onEnableChange(this.props.FeatureId, !this.state.enable);
    };


    render() {
        return (
            <div className="container-fluid">
                <div className="panel panel-default panelStyleSet">
                    <div className="row">

                        <div className="col-sm-8 pull-left">

                            <div className="row">
                                <div name="title" className="col-sm-12">
                                   {this.props.Name}
                        </div>
                            </div>

                        </div>

                        <div className="col-sm-2 pull-left">

                            <div className="row">
                                <div className="col-sm-6 pull-left">
                                    {this.state.enable ? "Enabled" : "Disabled"}
                                </div>

                                <div className="col-sm-6 pull-right">
                                    <Switch onClick={this.toggleSwitch} on={this.state.enable} aria-label="Enable Feature"></Switch>
                                </div>
                            </div>

                        </div>

                    </div >
                </div>
            </div>
        )
    }
}

export default Feature;

export {FeatureCardSet};