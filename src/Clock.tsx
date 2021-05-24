import React, { Component } from "react";
import './Clock.css';

type ClockState = {
    currentTime: any;
}

export class Clock extends Component<{}, ClockState> {
    timerId: any;

    constructor(props: any) {
        super(props);
        this.state = { currentTime: new Date() }
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.setState({...this.state, currentTime: new Date()}), 
        1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div className="Clock">Klockan är nu<br/> {this.state.currentTime.toLocaleTimeString("sv-SE")}</div>
        );
    }
}