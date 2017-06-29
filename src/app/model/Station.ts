export class StationExtra{
    description: string
    slots: number
    status: string
    uid: string
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
    
    constructor(data) {
        Object.assign(this, data);
    }
}

export class StationListItem{
    name: string
    distance: number
    uid: string
    
    constructor(data) {
        Object.assign(this, data);
    }
}


