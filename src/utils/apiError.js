class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = null,

    ) {
        //TO overwrite
        super(message);
        //TODO: maybe this.statusCode is not working, try this.status instead.
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        //Todo: Read more about data field in Node JS, API Error docs
        this.success = false;
        //TODO: Check if below is correct
        this.error = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }




    }
}

export {ApiError};