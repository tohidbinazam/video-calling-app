

const errorHandler = (error, req, res, next) => {

    const status = error.status || 500
    const message = error.message || 'Unknown error'

    res.status(status).json({ status, message })
}

export default errorHandler;