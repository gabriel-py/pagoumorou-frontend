export interface SearchServicePayload {
    location: string;
    lat: number;
    lon: number;
    gender: string;
    moveDate: string;
    stayDuration: number;
}


export interface SearchResponse {
    success: boolean;
    message: string;
}
