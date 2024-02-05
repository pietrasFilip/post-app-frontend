import React, {FC, useEffect} from "react";
import Client from "./Client";
import {fetchClients} from "../../state_management/features/clients/clientsSlice";
import {AppDispatch, RootState} from "../../state_management/features/store";
import {useDispatch, useSelector} from "react-redux";

const Clients: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootState) => state.clients.clients);

    useEffect(() => {
        dispatch(fetchClients())

        const intervalId = setInterval(() => {
            dispatch(fetchClients());
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch]);

    return (
        <div className="containter">
            {
                clients.map(client => <Client
                    key={client.id}
                    client={client}
                />)
            }
        </div>
    );
}

export default Clients;