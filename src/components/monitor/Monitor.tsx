import {FormEvent, useEffect, useState} from "react";
import {BACKEND_URL, getRequest} from "../../service/Api";
import {ResponseDto} from "../../types/dto/ResponseDto";
import {useHTMLInput} from "../Utils";
import {QueueMonitorStatistics} from "../../types/dto/QueueMonitorStatistics";
import {useNavigate} from "react-router-dom";
import MonitorQueue from "./MonitorQueue";

const Monitor = () => {

    const {
        value: idValue,
        bind: idBind
    } = useHTMLInput('');

    const {
        value: usernameValue,
        bind: usernameBind
    } = useHTMLInput('');

    const [idFeedback, setIdFeedback] = useState<QueueMonitorStatistics>(
        {clientsCount: '0', timeLeft: '0'}
    );
    const [usernameFeedback, setUsernameFeedback] = useState<QueueMonitorStatistics>(
        {clientsCount: '0', timeLeft: '0'}
    );
    const navigate = useNavigate();

    const handleIdFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(idValue);

        const res = await getRequest<ResponseDto<QueueMonitorStatistics>>(
            `${BACKEND_URL}/clients/monitor/id/${idValue}`
        );

        if (res.status !== 200) {
            setTimeout(() => navigate(`/errors/${res.error}/${res.status}`), 1000);
        } else {
            setIdFeedback({
                clientsCount: res.data?.data.clientsCount || '0',
                timeLeft: res.data?.data.timeLeft || '0'})
        }
    }

    const handleUsernameFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(usernameValue);

        const res = await getRequest<ResponseDto<QueueMonitorStatistics>>(
            `${BACKEND_URL}/clients/monitor/username/${usernameValue}`
        );

        if (res.status !== 200) {
            setTimeout(() => navigate(`/errors/${res.error}/${res.status}`), 1000);
        } else {
            setUsernameFeedback({
                clientsCount: res.data?.data.clientsCount || '0',
                timeLeft: res.data?.data.timeLeft || '0'})
        }
    }

    useEffect(() => {

    }, []);

    return (
        <div className="col-6 offset-3 my-5">
            <h2>Find By Id</h2>
            <hr/>
            <form onSubmit={handleIdFormSubmit}>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input type="text" className="form-control" {...idBind}/>
                </div>

                <div className="form-group my-2">
                    <button disabled={!(/^\d+$/.test(idValue))} type="submit" className="btn btn-success">Get info</button>
                </div>

            </form>
            <hr/>
            {idFeedback && <h5>Your information: {<MonitorQueue monitor={idFeedback} />}</h5>}

            <hr/>

            <h2>Find By Username</h2>
            <hr/>
            <form onSubmit={handleUsernameFormSubmit}>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" {...usernameBind}/>
                </div>

                <div className="form-group my-2">
                    <button disabled={usernameValue === '' || !isNaN(Number(usernameValue))} type="submit" className="btn btn-success">Get info</button>
                </div>

            </form>
            <hr/>
            {usernameFeedback && <h5>Your information: {<MonitorQueue monitor={usernameFeedback} />}</h5>}
        </div>
    )
}

export default Monitor;