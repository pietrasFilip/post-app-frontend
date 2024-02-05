import {Priority} from "../types/dto/Priority";

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

export interface ValidationObject {
    [field: string]: ValidationResult
}

export interface Validation<T> {
    validate(value: T, touched: boolean): ValidationResult;
}

export class SelectInputValidation implements Validation<string> {
    validate(value: string, touched: boolean): ValidationResult {
        if (!touched) {
            return {
                message: 'Not touched',
                isValid: false
            }
        }

        let isValid = true;
        let error: string[] = [];

        if (value === '') {
            isValid = false;
            error.push(`Select priority`);
        }

        return {
            message: error.join('\n'),
            isValid
        };
    }


}

export class TextInputValidation implements Validation<string> {
    constructor(private minLen: number) {
    }
    validate(value: string, touched: boolean): ValidationResult {

        if (!touched) {
            return {
                message: 'Not touched',
                isValid: false
            }
        }

        let isValid = true;
        let error: string[] = [];

        if (value.length < this.minLen) {
            isValid = false;
            error.push(`Length of text is too short: [${this.minLen}]`);
        }

        return {
            message: error.join('\n'),
            isValid
        };
    }
}