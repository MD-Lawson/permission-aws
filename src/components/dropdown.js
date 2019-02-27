import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

var buttonstylerole = {
    backgroundColor: 'white',
}

class DropdownOld extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(e) {

        if (!this.dropdownMenu.contains(e.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    render() {
        return (
            <div>
                <button onClick={this.showMenu}>
                    Show menu
          </button>

                {
                    this.state.showMenu
                        ? (
                            <div className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <button> Menu item 1 </button>
                                <button> Menu item 2 </button>
                                <button> Menu item 3 </button>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}


class DropdownBoot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
        }
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }

    handleMenuItemClick(eventKey) {
        this.props.onClick(eventKey.target.id)
        this.setState({
            title: eventKey.target.id,
        });
    }

render() {
    return (
        <DropdownButton
            bsPrefix="button dropdownButton"
            title={this.state.title}
            id={1}
        >{this.props.actions.map((key) => {
            return (
                <Dropdown.Item key={key} id={key} onClick={this.handleMenuItemClick}>{key}</Dropdown.Item>
            );
        })}
        </DropdownButton>
    )
}
}

class DropdownBootRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            newFeatureSetid: 0,
        }
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }

    handleMenuItemClick(eventKey) {
        eventKey.persist()
        // this.props.onClick(eventKey.target.id)
        let targetId = parseInt(eventKey.target.id, 10);


        for (let i = 0; i < this.props.actions.length; i++) {

            if (targetId === this.props.actions[i].FeatureSetId) {
                this.setState({
                    title: this.props.actions[i].Name,
                })
                this.props.onClick(this.props.actions[i].FeatureSetId);
            }
        }

    }

    render() {
        return (
            <DropdownButton
                className="button md-raised"
                style={buttonstylerole}
                title={this.state.title}
                id={1}

            >{
                    this.props.actions.map((key) => {
                        return (
                            <Dropdown.Item key={key.FeatureSetId} id={key.FeatureSetId} onClick={this.handleMenuItemClick} eventKey={key.Name} name={key.Name}>{key.Name}</Dropdown.Item>

                        );

                    })

                }
            </DropdownButton>
        )
    }
}

export {
    DropdownOld,
    DropdownBoot,
    DropdownBootRole,
}