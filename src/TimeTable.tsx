import { Component } from "react"
import { Departure } from './Departure';
import { DepartureModel } from "./DepartureModel";
import './TimeTable.css';
import { DateTime } from 'luxon';



type TimeTableProps = {
    track: string;
    departures: DepartureModel[];
}

const MINIMUM_TIME_UNTIL_DEPARTURE = 3;

export class TimeTable extends Component<TimeTableProps, {}> {
    render() {
        const reasonableDepartures = this.props.departures.filter(x => x.departureTime.diff(DateTime.local(), ["minutes"]).minutes > MINIMUM_TIME_UNTIL_DEPARTURE);

        return (
            <div className="TimeTable">
                <div>Läge {this.props.track}</div>
                <table className="Main">
                    <tbody>
                        {reasonableDepartures.map((e: any, i: any) => {
                            return <Departure key={i} departure={e}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    };
}