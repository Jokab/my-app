import { Component } from "react"
import { Departure } from './Departure';
import './TimeTable.css';


type TimeTableProps = {
    track: string;
    departures: Object[];
}

export class TimeTable extends Component<TimeTableProps, {}> {
    render() {
        return (
            <div className="TimeTable">
                <div>Läge {this.props.track}</div>
                <table className="Main">
                    <tbody>
                        {this.props.departures.map((e: any, i: any) => {
                            return <Departure departure={e}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    };
}