import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Error = () => {
    const {message, status} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate("/"), 5000);
    }, []);

    return (
        <div className="container alert alert-danger">
            <h2>Error Message: {message}</h2>
            <h2>Error Status: {status}</h2>
        </div>
    )
}

export default Error;