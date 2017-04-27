export class StationExtra{
    description: string
    slots: number
    status: string
    uid: number
}

export class Station{
    id: string
    name: string
    latitude: number 
    longitude: number 
    free_bikes: number
    empty_slots :number
    timestamp: Date
    extra: StationExtra
}


