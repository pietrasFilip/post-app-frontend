import React, {FC} from "react";
import {GetClientDto} from "../../types/dto/GetClientDto";

const Client: FC<{client: GetClientDto}> = ({client}) => (
    <div className="card-body">
        <h3 className="card-title">Username: {client.username}</h3>
        <h3 className="card-title">ID: {client.id}</h3>
        <h3 className="card-title">Priority: {client.priority}</h3>
        <hr/>
    </div>
);

export default Client;