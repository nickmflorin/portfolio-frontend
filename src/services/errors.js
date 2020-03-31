class ApiError extends Error {
    constructor(code="API_ERROR", status=500, message="There was an error with the API.") {
        super(message)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError)
        }
        this.code = code
        this.status = status
    }
}

export { ApiError }
