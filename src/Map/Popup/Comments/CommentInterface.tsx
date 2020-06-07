export interface Comment {
    id: number;
    author: string;
    comment: string;
    setComments?: Function;
    stationId?: number;
}
