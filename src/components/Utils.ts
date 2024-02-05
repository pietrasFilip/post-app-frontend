import {useState} from "react";
import {ChangeEvent} from "react";

export interface BindData<T, U> {
    value: T;
    onChange: (t: U) => void;
}

export interface HTMLInputData<T> {
    value: T;
    setValue: (t: T) => void;
    touched: boolean;
    setTouched: (b: boolean) => void;
    reset: () => void;
    bind: BindData<string, ChangeEvent<HTMLInputElement>>
}

export function useHTMLInput(init: string): HTMLInputData<string> {
    const [value, setValue] = useState<string>(init);
    const [touched, setTouched] = useState<boolean>(false);

    return {
        value,
        setValue,
        touched,
        setTouched,
        reset: () => setValue(init),
        bind: {
            value,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setValue(event?.target?.value)
                setTouched(true)
            }
        }
    }
}

export interface HTMLSelectData<T> {
    value: T;
    setValue: (t: T) => void;
    touched: boolean;
    setTouched: (b: boolean) => void;
    reset: () => void;
    bind: BindData<string, ChangeEvent<HTMLSelectElement>>
}

export function useHTMLSelect(init: string): HTMLSelectData<string> {
    const [value, setValue] = useState<string>(init);
    const [touched, setTouched] = useState<boolean>(false);

    return {
        value,
        setValue,
        touched,
        setTouched,
        reset: () => setValue(init),
        bind: {
            value,
            onChange: (event: ChangeEvent<HTMLSelectElement>) => {
                setValue(event?.target?.value)
                setTouched(true)
            }
        }
    }
}