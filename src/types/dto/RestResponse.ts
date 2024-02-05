export interface RestResponse<T> {
    data?: T;
    status: number;
    error?: string;
}