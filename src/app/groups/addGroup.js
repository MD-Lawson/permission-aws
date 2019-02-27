import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar.js';
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from 'redux';
import { DropdownBootRole as Dropdown } from '../../components/dropdown.js';
import Snackbar from '@material-ui/core/Snackbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        // In Japanese the characters are usually larger.
        useNextVariants: true,
        fontSize: 24,
    },
});

class addGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMessage: "",
            nameValue: "",
            descriptionValue: "",
            FeatureSetId: 0,
            saveEnabled: false,
            displaySnackbar: false,
        };

        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.renderSnackbar = this.renderSnackbar.bind(this);

    }

    componentDidMount(){
        this.props.actions.fetchFeatureSets("/api/featureSets?applicationId=" + this.props.nav.selectedApplication);
    }

    save() {
        if (this.state.FeatureSetId <= 0) {
            this.setState({
                displaySnackbar: true,
            })
        } else {
            var newGroup = {
                GroupId: 0,
                Name: this.state.nameValue,
                Description: this.state.descriptionValue,
                FeatureSetId: this.state.FeatureSetId,
            }

            this.props.actions.postNewGroup(newGroup)
        }


    }

    cancel() {
        this.props.history.goBack();
    }

    handleNameChange = (e) => {
        if (e.target.value !== "" || this.state.descriptionValue !== "") {
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

    handleDropdownClick(newId) {

        this.setState({
            FeatureSetId: newId,
        })
    }
    handleSnackbarClose(){
        this.setState({
            displaySnackbar: false,
        })
    }

    renderSnackbar() {
        return (
            <MuiThemeProvider theme={theme}>
                <Snackbar autoHideDuration={3000}
                    open={this.state.displaySnackbar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">You must select a feature set!</span>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} 
                    onClose={() => this.handleSnackbarClose()}/>
            </MuiThemeProvider>)

    };
    render() {

        return (

            <div>
                <NavBar />
                <h1 className="md-display-1">Add Group</h1>
                <div className="container-fluid">

                    <div className="panel panel-default panelStyle">

                        <div className="row">
                            <div className="col-sm-10"></div>
                            <div className="col-sm-4 pull-right">
                                <div>

                                    {(this.state.FeatureSetId !== 0) ? 
                                        <Link to="/groups"><button className="saveButton" onClick={this.save} disabled={!this.state.saveEnabled}>Save</button></Link>
                                        :
                                        <button className="saveButton" onClick={this.save} disabled={!this.state.saveEnabled}>Save</button>
                                    }
                                    <button className="saveButton" onClick={this.cancel}>Cancel</button>



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

                        <div className="row">
                            <div className="col-sm-12 pull-left">
                                <Dropdown actions={this.props.featureSets} onClick={this.handleDropdownClick} title="Select Feature Set"></Dropdown>
                            </div>
                        </div>

                        <this.renderSnackbar />

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    featureSets: state.featureSets.featureSets,
    groups: state.groups.groups,
    nav: state.nav,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(addGroup);
