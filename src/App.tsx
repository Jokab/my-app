import {LineNumber} from './LineNumber';
import './App.css';
import React, { Component } from 'react';

type AppState = {
  departures: any;
}

const baseUrl = "https://api.vasttrafik.se/bin/rest.exe/v2";

function Clock() {
  return (
    <div className="Clock">Klockan är nu: {new Date().toLocaleTimeString("sv-SE")}</div>
  )
}

type DepartureProps = {
  departure: any
}

class Departure extends Component<DepartureProps, {}> {
  render() {
    return (
      <tr>
          <td className="LineNumberCell"><LineNumber line={this.props.departure.sname}/></td>
          <td>{this.props.departure.direction}</td>
          <td>{this.props.departure.time}</td>
      </tr>
    )
  }
}

type TimeTableProps = {
  track: string;
  departures: Object[];
}

class TimeTable extends Component<TimeTableProps, {}> {
  render() {
    return (
      <div>
        <div>Läge {this.props.track}</div>
        <table className="Main">
          <thead>
            <th>Linje</th>
            <th>Ändhållplats</th>
            <th>Avgångstid</th>
          </thead>
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

class App extends Component<{}, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {departures: []};
  }
  
  render() {
    return (
      <div className="App">
        <Clock/>
        <div className="TimeTables">
          <TimeTable departures={this.state.departures.filter((x: any) => x.track === "A")} track={"A"}/>
          <TimeTable departures={this.state.departures.filter((x: any) => x.track === "B")} track={"B"}/>
        </div>
      </div>  
    );
  }

  async componentDidMount() {
    const location = await this.getStop("Musikvägen, Göteborg");
    const departures = await this.getDepartures(location.id, new Date());

    this.setState({...this.state, departures: departures.DepartureBoard.Departure});
  }

  /**
   * 
   * @param searchString String to search for as stop
   * @returns Exact match if found, else the top search result, i.e. the best match
   */
  async getStop(searchString: string): Promise<any> {
    const response = await this.makeRequest(baseUrl + "/location.name?input=" + encodeURIComponent(searchString) + "&format=json");

    const stops = response.LocationList.StopLocation;
    const exactMatch = stops.filter((x: any) => x.name === searchString);

    return exactMatch ? exactMatch[0] : stops[0];
  }

  /**
   * 
   * @param stopId ID of the stop as retrieved from /location
   * @param dateTime Date and time to search departures from
   * @returns Next 20 departures
   */
  async getDepartures(stopId: string, dateTime: Date): Promise<any> {
    const timeWithoutSeconds = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const date = encodeURIComponent(dateTime.toLocaleDateString("sv-SE"));
    const time = encodeURIComponent(timeWithoutSeconds);
    const response = await this.makeRequest(baseUrl + `/departureBoard?id=${stopId}&format=json&date=${date}&time=${time}&timeSpan=20`);
    return response;
  }

  async makeRequest(url: string) {
    const bearer = await this.credentials();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + bearer.access_token
      },
    });

    return response.json();
  }
  
  async credentials() {
    const apiSecret = process.env.REACT_APP_VASTTRAFIK_API_SECRET;
    const encoded = new Buffer(`dMetdRHWVmhmMBir005xvYoOnxca:${apiSecret}`).toString('base64');
    const response = await fetch("https://api.vasttrafik.se:443/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic: ' + encoded,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'device_123532813290820193'
      })
    });
    return response.json();
  }
}



export default App;

