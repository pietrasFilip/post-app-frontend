import {FormEvent, useEffect, useRef, useState} from "react";
import {CreateClientDto} from "../../types/dto/CreateClientDto";
import {convertToPriority, Priority} from "../../types/dto/Priority";
import {SelectInputValidation, TextInputValidation, ValidationObject, ValidationResult} from "../../service/Validation";
import {useHTMLInput, useHTMLSelect} from "../Utils";
import {postRequest, BACKEND_URL} from "../../service/Api";
import {useNavigate} from "react-router-dom";
import {ResponseDto} from "../../types/dto/ResponseDto";
import {GetClientDto} from "../../types/dto/GetClientDto";

const AddClient = () => {
    const {
        value: usernameValue,
        touched: usernameTouched,
        bind: usernameBind
    } = useHTMLInput('');

    const {
        value: passwordValue,
        reset: passwordReset,
        bind: passwordBind
    } = useHTMLInput('');

    const {
        value: priorityValue,
        touched: priorityTouched,
        bind: priorityBind
    } = useHTMLSelect('');

    const navigate = useNavigate();

    const [error, setError] = useState<ValidationObject>({});

    const [feedback, setFeedback] = useState('');

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const createClientDto: CreateClientDto = {
            username: usernameValue,
            password: passwordValue,
            priority: convertToPriority(priorityValue)
        };
        const res = await postRequest<CreateClientDto, ResponseDto<GetClientDto>>(
            `${BACKEND_URL}/clients/add`,
            createClientDto);

        if (res.status !== 200) {
            setTimeout(() => navigate(`/errors/${res.error}/${res.status}`), 1000);
        } else {
            setFeedback(JSON.stringify(res.data?.data.id))
        }
    }

    const isValid = () => Object.entries(error).every(vo => vo[1].isValid);

    useEffect(() => {
        const textInputValidator = new TextInputValidation(1);
        const selectInputValidator = new SelectInputValidation();
        setError({
            "username": textInputValidator.validate(usernameValue, usernameTouched),
            "priority": selectInputValidator.validate(priorityValue, priorityTouched)
        })
        if (priorityBind.value === Priority.NORMAL || priorityBind.value === '') {
            passwordReset();
        }

    }, [usernameValue, passwordValue, priorityValue]);

    return (
        <div className="col-6 offset-3 my-5">
            <h2>Add Client</h2>
            <hr/>
            <form onSubmit={handleFormSubmit}>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" {...usernameBind}/>
                </div>
                {
                    !error['username']?.isValid && usernameTouched &&
                    <div>
                        <p className="text-danger">{error['username'].message}</p>
                    </div>
                }

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           className="form-control"
                           disabled={priorityBind.value === Priority.NORMAL || priorityBind.value === ''}
                           {...passwordBind}/>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select className="form-select" id="priority" required={true} {...priorityBind}>
                        <option value="">Priority</option>
                        {Object.values(Priority).map((priority) => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))
                        }
                    </select>
                </div>
                {
                    !error['priority']?.isValid && priorityTouched &&
                    <div>
                        <p className="text-danger">{error['priority'].message}</p>
                    </div>
                }

                <div className="form-group my-2">
                    <button disabled={!isValid()} type="submit" className="btn btn-success">Add</button>
                </div>
            </form>
            <hr/>
            {feedback && <h4>Your ID: {feedback}</h4>}
        </div>
    )
}

export default AddClient;