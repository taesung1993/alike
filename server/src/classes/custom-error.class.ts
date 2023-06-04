interface Parameter {
  status: number;
  message: string;
}

class CustomError {
  private _status: number | null = null;
  private _message: string | null = null;

  constructor({ status, message }: Parameter) {
    this._status = status;
    this._message = message;
  }

  get status() {
    return this._status!;
  }

  get message() {
    return this._message!;
  }
}

export default CustomError;
