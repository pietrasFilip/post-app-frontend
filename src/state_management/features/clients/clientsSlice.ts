import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {GetClientDto} from "../../../types/dto/GetClientDto";
import {BACKEND_URL, getRequest} from "../../../service/Api";
import {ResponseDto} from "../../../types/dto/ResponseDto";

export interface Clients {
    clients: GetClientDto[];
    isLoading: boolean;
}

const initialState: Clients = {
    clients: [],
    isLoading: false
}

export const fetchClients = createAsyncThunk<GetClientDto[]>('clients/fetchClients', async () => {
    const response = await getRequest<ResponseDto<GetClientDto[]>>(`${BACKEND_URL}/clients/queue`);

    if (!response) {
        throw new Error('No response from the server');
    }

    if (!response.data) {
        throw new Error('No data in the response');
    }

    return response.data.data;
})

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchClients.fulfilled, (state, action: PayloadAction<GetClientDto[]>) => {
                state.clients = action.payload;
            })
    }
})

export const {} = clientsSlice.actions;
export default clientsSlice.reducer;