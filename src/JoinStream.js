import React from 'react';
import './Player.css';
import logo from './vox_logo.svg';

class JoinStream extends React.Component {

    state: Object = {
        streamName: ""
    };

    constructor(props) {
        super(props);
    }

    streamChangeHandler = ({ target: { value } }: Event): void => {
        console.log(value);
        this.setState({ streamName: value });
    }

    render() {

        const { streamName } = this.state;

        return (
            <>
                <div className="Player">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <br />
                        <div className="InputField">
                            < input type="text" onChange={this.streamChangeHandler} />
                        </div>

                        {
                            <button
                                onClick={() => this.props.history.push("/" + streamName.toUpperCase())}
                                className="btn btn-primary"
                                id="start_play_button">
                                JOIN STREAM
                            </button>
                        }
                    </header>
                </div>
            </>
        );
    }
}

export default JoinStream;
