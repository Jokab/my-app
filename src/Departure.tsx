import React, { Component } from "react";
import { LineNumber } from "./LineNumber";
import { DateTime} from 'luxon';
import './Departure.css';

type DepartureProps = {
    departure: any
}
  
export class Departure extends Component<DepartureProps, {}> {
    render() {
        let minutesLate = this.calculateHowLate(this.props.departure.time, this.props.departure.rtTime)

        const departureTime = this.props.departure.rtTime ? this.props.departure.rtTime : this.props.departure.time;
        let timeCell;
        if (minutesLate > 0) {
            timeCell = <td>{departureTime} (+{minutesLate})</td>
        } else if (minutesLate < 0) {
            timeCell = <td>{departureTime} (-{minutesLate})</td>
        } else {
            timeCell = <td>{departureTime}</td>
        }
        return (
            <tr>
                <td className="LineNumberCell"><LineNumber line={this.props.departure.sname}/></td>
                <td>{this.props.departure.direction}</td>
                {timeCell}
            </tr>
        )
    }

    calculateHowLate(time: string, rtTime: string): number {
        return DateTime.fromFormat(rtTime, "HH:mm").diff(DateTime.fromFormat(time, "HH:mm")).minutes;
    }
}