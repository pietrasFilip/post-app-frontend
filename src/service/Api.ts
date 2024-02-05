import axios, {AxiosError} from "axios";
import {RestResponse} from "../types/dto/RestResponse";
import queryString from 'query-string';
import {ResponseDto} from "../types/dto/ResponseDto";
import {GetClientDto} from "../types/dto/GetClientDto";

export const BACKEND_URL = 'http://localhost:8080';

export interface QueryStringData {
    [prop: string]: string
}

export const postRequest = async <T, R> (url: string, data: T): Promise<RestResponse<R>> => {
    try {
        const response = await axios.post<R>(url, data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        const axiosErrorResponseData = axiosError.response?.data as ResponseDto<GetClientDto>;
        return {
            status: axiosError.response?.status || 500,
            error: axiosErrorResponseData.error
        }
    }
}

export const getRequest = async <T> (url: string, queryStringData: QueryStringData = {}): Promise<RestResponse<T>> => {
    try {
        queryString.stringify(queryStringData);
        const response = await axios.get<T>(url);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        const axiosErrorResponseData = axiosError.response?.data as ResponseDto<GetClientDto>;
        return {
            status: axiosError.response?.status || 500,
            error: axiosErrorResponseData.error
        }
    }
}