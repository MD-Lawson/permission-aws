import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DropdownBoot as Dropdown } from './dropdown.js';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { bindActionCreators } from 'redux';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.state = {
            actions: ["Production", "Legacy"]
        }


    }
    componentDidMount() {
        axios.get("/api/applications").then(response => {
            this.props.actions.setApplications(response.data);
            let result = this.props.nav.applications.map(application => application.Name);

            this.setState({
                actions: result,
            })
        })
    }

    handleDropdownClick(appName) {

        for (var i = 0; i < this.props.nav.applications.length; i++) {
            if (appName === this.props.nav.applications[i].Name) {
                this.props.actions.setSelectedApplication(this.props.nav.applications[i].Id);
            }
        }

    }

    setTitle() {
        var title = "Production";

        for (var i = 0; i < this.props.nav.applications.length; i++) {
            if (this.props.nav.selectedApplication === this.props.nav.applications[i].Id) {
                title = this.props.nav.applications[i].Name;
            }
        }

        return title;
    }

    // <Container fluid={true} bsPrefix='navbar'>
    //             <Row>
    //                 <ButtonToolbar>
    //                     <Col sm={3}>
    //                         <h3>
    //                             <span>Cassini Admin</span>
    //                         </h3>
    //                     </Col>
    //                     <Col sm={2}>
    //                         <span className="pull-right">
    //                             <label>
    //                                 <h3>Application:</h3>
    //                             </label>
    //                         </span>
    //                     </Col>
    //                     <Col sm={7}>
    //                         <span>
    //                             <Dropdown actions={this.state.actions} onClick={this.handleDropdownClick} title={this.setTitle()}></Dropdown>
    //                             <Link to="/features"><Button aria-label="Features" className="button navButton">Features</Button></Link>
    //                             <Link to="/featureSets"><Button aria-label="Feature Sets" className="button navButton">Features Sets</Button></Link>
    //                             <Link to="/roles"><Button aria-label="Roles" className="button navButton">Roles</Button></Link>
    //                             <Link to="/groups"><Button aria-label="Groups" className="button navButton">Groups</Button></Link>
    //                             <Link to="/users"><Button aria-label="Users" className="button navButton">Users</Button></Link>
    //                         </span>
    //                     </Col>
    //                 </ButtonToolbar>
    //             </Row>
    //         </Container>



    // <div className="row">
    //                 <ButtonToolbar>
    //                     <div className="col-sm-3">
    //                         <h3>
    //                             <span>Cassini Admin</span>
    //                         </h3>
    //                     </div>
    //                     <div className="col-sm-2">
    //                         <span className="pull-right">
    //                             <label>
    //                                 <h3>Application:</h3>
    //                             </label>
    //                         </span>
    //                     </div>
    //                     <div className="col-sm-7">
    //                         <span>
    //                             <Dropdown actions={this.state.actions} onClick={this.handleDropdownClick} title= {this.setTitle()}></Dropdown>
    //                             <Link to="/features"><Button aria-label="Features" className="button navButton">Features</Button></Link>
    //                             <Link to="/featureSets"><Button aria-label="Feature Sets" className="button navButton">Features Sets</Button></Link>
    //                             <Link to="/roles"><Button aria-label="Roles" className="button navButton">Roles</Button></Link>
    //                             <Link to="/groups"><Button aria-label="Groups" className="button navButton">Groups</Button></Link>
    //                             <Link to="/users"><Button aria-label="Users" className="button navButton">Users</Button></Link>
    //                         </span>
    //                     </div>
    //                 </ButtonToolbar>
    //             </div>

    render() {
        return (
            <div className='navbar'>
                <Container style={{ width: '100%' }}>
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <h3>
                            <span>Permissions Administrator</span>
                        </h3>
                    </div>

                    <Row style={{ whiteSpace: "nowrap", width: '1140px' }} noGutters={true}>
                        <Col>
                            <label className='navLabel'>
                                <h4>Application:</h4>
                            </label>
                        </Col>
                        <Col><Dropdown actions={this.state.actions} onClick={this.handleDropdownClick} title={this.setTitle()}></Dropdown></Col>
                        <Col><Link to="/features"><Button aria-label="Features" className="button navButton">Features</Button></Link></Col>
                        <Col><Link to="/featureSets"><Button aria-label="Feature Sets" className="button navButton">Features Sets</Button></Link></Col>
                        <Col><Link to="/roles"><Button aria-label="Roles" className="button navButton">Roles</Button></Link></Col>
                        <Col><Link to="/groups"><Button aria-label="Groups" className="button navButton">Groups</Button></Link></Col>
                        <Col><Link to="/users"><Button aria-label="Users" className="button navButton">Users</Button></Link></Col>


                    </Row>
                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    nav: state.nav
});
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);