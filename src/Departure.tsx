import React, { Component } from "react";
import { LineNumber } from "./LineNumber";
import { DateTime} from 'luxon';
import './Departure.css';
import { DepartureModel } from "./DepartureModel";

type DepartureProps = {
    departure: DepartureModel
}
  
export class Departure extends Component<DepartureProps, {}> {
    render() {
        let minutesLate = this.props.departure.realTimeDepartureTime.diff(this.props.departure.departureTime).minutes;

        let timeCell;
        if (minutesLate > 0) {
            timeCell = <td>{this.props.departure.departureTime.toFormat("HH:mm")} (+{minutesLate})</td>
        } else if (minutesLate < 0) {
            timeCell = <td>{this.props.departure.departureTime.toFormat("HH:mm")} (-{minutesLate})</td>
        } else {
            timeCell = <td>{this.props.departure.departureTime.toFormat("HH:mm")}</td>
        }
        return (
            <tr>
                <td className="LineNumberCell"><LineNumber line={this.props.departure.lineShortName}/></td>
                <td>{this.props.departure.direction}</td>
                {timeCell}
            </tr>
        )
    }
}