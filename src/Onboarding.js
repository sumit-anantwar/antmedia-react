import React from 'react';
import './Player.css';
import logo from './vox_logo.svg';

class Onboarding extends React.Component {

    state: Object = {
        streamName: ""
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        let streamId = this.props.match.params.streamId;
        console.log(streamId)

        this.props.history.push("/player/" + streamId.toUpperCase())
    }

    render() {

        const { streamName } = this.state;

        return (
            <>
                <div className="Player">
                </div>
            </>
        );
    }
}

export default Onboarding;
