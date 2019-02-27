import React from 'react';
import Switch from 'react-toggle-switch';
import find from 'lodash/find'
import filter from 'lodash/filter';

class User extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            editing: this.props.initialEditState,
            name: this.props.name,
            enabled: this.props.enable,
            usedGroups: this.props.usedGroups,
            idFound: false,
            changedGroups: [],
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    save() {
        var updatedUser;
        if (this.props.initialEditState) {
            updatedUser = {
                UserId: this.props.id,
                UserName: this.state.name,
                UserEnable: this.state.enabled,
                Groups: this.state.usedGroups,
            }

            this.props.onSave(updatedUser, this.state.changedGroups);

        } else {
            updatedUser = {
                UserId: this.props.id,
                UserName: this.state.name,
                UserEnable: this.state.enabled,
                Groups: this.state.usedGroups,
            };

            this.props.onSave(updatedUser, this.state.changedGroups);
            this.setState({
                editing: !this.state.editing,
            })
        }

    }

    cancel() {
        if (this.props.initialEditState) {
            this.props.handleCancel();
        } else {
            this.setState({
                editing: !this.state.editing,
            })
        }
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

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                enabled: !prevState.enabled,
                changed: !prevState.changed
            };
        });
    };

    handleCheckBox(group, addedToUsedGroups, event) {
        if (addedToUsedGroups) {
            let groupArray = [...this.state.usedGroups];
            groupArray.push(group);
            this.setState({
                usedGroups: groupArray,
            })
            
            
            let newGroupChange = {
                UserId: this.props.id,
                Enabled: true,
                GroupId: group.GroupId,

            }
            let shouldAdd = true;
            if(this.state.changedGroups.length === 0){
                this.setState({
                    changedGroups: this.state.changedGroups.concat([newGroupChange])
                })
            }else {
                let tempArray = [...this.state.changedGroups];
                for(let j = 0; j < this.state.changedGroups.length; j++){
                    if(this.state.changedGroups[j].GroupId === newGroupChange.GroupId){
                        tempArray.splice(j, 1);
                        this.setState({
                            changedGroups: [...tempArray]
                        });
                        shouldAdd = false;
                    }
                }
            }

            if(shouldAdd){
                this.setState({
                    changedGroups: this.state.changedGroups.concat([newGroupChange])
                })
            }
        } else {
            let groupArray = filter(this.state.usedGroups, function(usedGroup) {
                if(usedGroup.GroupId !== group.GroupId){
                    return usedGroup;
                }
            })
            this.setState({
                usedGroups: [...groupArray],
            });
            
            
            let newGroupChange = {
                UserId: this.props.id,
                Enabled: false,
                GroupId: group.GroupId,

            }
            let shouldAdd = true;
            if(this.state.changedGroups.length === 0){
                this.setState({
                    changedGroups: this.state.changedGroups.concat([newGroupChange])
                })
            }else {
                let tempArray = [...this.state.changedGroups];
                for(let j = 0; j < this.state.changedGroups.length; j++){
                    if(this.state.changedGroups[j].GroupId === newGroupChange.GroupId){
                        tempArray.splice(j, 1);
                        this.setState({
                            changedGroups: [...tempArray]
                        });
                        shouldAdd = false;
                    }
                }
            }

            if(shouldAdd){
                this.setState({
                    changedGroups: this.state.changedGroups.concat([newGroupChange])
                })
            }
        }
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
                                <h4><label style={{ "color": "gray" }}>Name</label></h4>
                                <h3><input className="textStyle" type="text" value={this.state.name} maxLength="50" onChange={this.handleNameChange} /></h3>
                            </div>

                        </div >

                        <div className="row">

                            <div className="col-sm-1">
                                {this.state.enabled ? "Enabled" : "Disabled"}
                            </div>

                            <div className="col-sm-1 pull-left">
                                <Switch onClick={this.toggleSwitch} on={this.state.enabled} aria-label="Enable"></Switch>
                            </div>

                            <div className="col-sm-10 pull-left">
                                <form className="checkbox">
                                    <label><h4>Groups</h4></label>
                                    <ul className="checkbox">
                                        {Object.values(this.props.groups).map((group) => {
                                            if (find(this.state.usedGroups, ['GroupId', group.GroupId]) !== undefined) {
                                                return (
                                                    <li key={group.GroupId}>
                                                        <div className="row">

                                                            <div className="col-sm-1 pull-left">
                                                                <div className="container">
                                                                    <input
                                                                        key={group.GroupId}
                                                                        name={group.Name}
                                                                        className="checkbox"
                                                                        type="checkbox"
                                                                        checked={true}
                                                                        onChange={() => this.handleCheckBox(group.GroupId)}
                                                                    />
                                                                    <span className="checkmark" onClick={() => this.handleCheckBox(group, false)}></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-11">
                                                                <label className="group-name">{group.Name}</label>
                                                            </div>

                                                        </div >
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li key={group.GroupId}>
                                                        <div className="row">

                                                            <div className="col-sm-1 pull-left">
                                                                <div className="container">
                                                                    <input
                                                                        key={group.GroupId}
                                                                        name={group.Name}
                                                                        className="checkbox"
                                                                        type="checkbox"
                                                                        checked={false}
                                                                        onChange={() => this.handleCheckBox(group.GroupId)}
                                                                    /><span className="checkmark" onClick={() => this.handleCheckBox(group, true)}></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-11">
                                                                <label className="group-name">{group.Name}</label>
                                                            </div>

                                                        </div >
                                                    </li>
                                                )
                                            }

                                        }
                                        )}
                                    </ul>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            )
        }
    }
}

export default User;