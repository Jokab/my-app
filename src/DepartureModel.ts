import { DateTime } from 'luxon';

export type DepartureModel = {
    expectedDepartureTime: DateTime,
    realTimeDepartureTime: DateTime,
    departureTime: DateTime,
    track: string,
    direction: string,
    lineShortName: string
}