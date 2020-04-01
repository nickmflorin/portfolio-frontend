class ApiError extends Error {
    constructor(status=500, body={}) {
        super("There was an error with the API.")
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError)
        }
        this.status = status
        this.body = body
    }
}

export { ApiError }
