import React from 'react';
import ReactDOM from 'react-dom';
import './Player.css';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

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
                    <br />
                    <div className="InputField">
                        < input type="text" onChange={this.streamChangeHandler} />
                    </div>

                    {
                        <button
                            onClick={() => this.props.history.push("/" + streamName)}
                            className="btn btn-primary"
                            id="start_play_button">
                            JOIN STREAM
                        </button>
                    }
                </div>
            </>
        );
    }
}

export default JoinStream;
