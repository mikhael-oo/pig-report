import {PersonInfo} from "./PersonInfo";
import {PigInfo} from "./PigInfo"

export interface Report {
    id?: number,
    personInfo: PersonInfo,
    pigInfo: PigInfo,
    location: Number[],
    extraNotes: String,
    time: String,
    Date: Date
}