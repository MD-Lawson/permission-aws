import React from 'react';
import NavBar from '../components/navbar';

class CassiniAdminUi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            features: ""
        } 
    }

    render() {
        return (
            <div>
                <NavBar />
                <div ui-view="content" className="md-content md-padding">
                    <h1>Home</h1>
                </div>
            </div>

        )
    }
}

export default CassiniAdminUi;