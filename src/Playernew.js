import { React, Component } from 'react';
import WebRTCAdaptor from './js/webrtc_adaptor';
import './Player.css';
import logo from './vox_logo.svg';

class Playernew extends Component {
    webRTCAdaptor: ?WebRTCAdaptor = null;

    state: Object = {
        mediaConstraints: {
            video: false,
            audio: false
        },
        streamName: 'stream1',
        token: '',
        pc_config: {
            'iceServers': [{
                'urls': 'stun:stun.l.google.com:19302'
            }]
        },
        sdpConstraints: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        },
        websocketURL: "wss://connect.coderalabs.io:5443/VoxConnect/websocket",
        isPlaying: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        let streamId = this.props.match.params.streamId;
        console.log(streamId)

        this.webRTCAdaptor = this.initiateWebrtc();
        this.setState({
            streamName: streamId,
            isPlaying: false
        });
    }

    onStartPlaying = (name: String): void => {
        this.webRTCAdaptor.joinRoom(this.state.streamName);
    }

    initiateWebrtc(): WebRTCAdaptor {
        return new WebRTCAdaptor({
            websocket_url: this.state.websocketURL,
            mediaConstraints: this.state.mediaConstraints,
            peerconnection_config: this.state.pc_config,
            sdp_constraints: this.state.sdpConstraints,
            remoteVideoId: "remoteVideo",
            isPlayMode: true,
            debug: true,
            candidateTypes: ["tcp", "udp"],
            callback: (info, obj) => {
                if (info == "initialized") {
                    console.log("initialized");

                } else if (info == "play_started") {
                    //joined the stream
                    console.log("play started");
                    this.setState({ isPlaying: true });

                } else if (info == "play_finished") {
                    //leaved the stream
                    console.log("play finished");

                } else if (info == "closed") {
                    //console.log("Connection closed");
                    if (typeof obj != "undefined") {
                        console.log("Connecton closed: "
                            + JSON.stringify(obj));
                    }
                } else if (info == "streamInformation") {


                } else if (info == "ice_connection_state_changed") {
                    console.log("iceConnectionState Changed: ", JSON.stringify(obj));
                } else if (info == "updated_stats") {
                    //obj is the PeerStats which has fields
                    //averageIncomingBitrate - kbits/sec
                    //currentIncomingBitrate - kbits/sec
                    //packetsLost - total number of packet lost
                    //fractionLost - fraction of packet lost
                    console.log("Average incoming kbits/sec: " + obj.averageIncomingBitrate
                        + " Current incoming kbits/sec: " + obj.currentIncomingBitrate
                        + " packetLost: " + obj.packetsLost
                        + " fractionLost: " + obj.fractionLost
                        + " audio level: " + obj.audioLevel);

                } else if (info == "data_received") {
                    console.log("Data received: " + obj.event.data + " type: " + obj.event.type + " for stream: " + obj.streamId);
                } else if (info == "bitrateMeasurement") {
                    console.log(info + " notification received");

                    console.log(obj);
                } else {
                    console.log(info + " notification received");
                }
            },
            callbackError: function (error) {
                //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

                console.log("error callback: " + JSON.stringify(error));
                alert(JSON.stringify(error));
            }
        });
    }

    render() {
        const { streamName, isPlaying } = this.state;

        return (
            <>
                <div className="Player">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />

                        <div className="InputField">
                            <h1> {streamName} </h1>
                        </div>

                        <video hidden id="remoteVideo" autoPlay controls playsInline></video>

                        {
                            isPlaying ? (
                                <button
                                    onClick={(aaa) => this.props.history.push("/")}
                                    className="btn btn-primary"
                                    id="start_play_button">
                                    Disconnect
                                </button>
                            ) : (
                                <button
                                    onClick={this.onStartPlaying.bind(this, streamName)}
                                    className="btn btn-primary"
                                    id="start_play_button">
                                    Start Playing
                                </button>
                            )
                        }
                    </header>
                </div>
            </>
        );
    }
}

export default Playernew;
