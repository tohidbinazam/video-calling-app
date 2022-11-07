import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    const token = req.cookies.access_token
    const username = req.params.username
    const id = req.params.id
    
    try {
        if (token) {
            const user = jwt.verify(token, process.env.SECRET_KEY)

            if (user.isAdmin) {
                req.user = user
                next()
            } else {
                if (user.username == username || user.id == id) {
                    req.user = user
                    next()
                } else {
                    res.status(401).json('You don\'t allow to access this feature')
                }
            }
        } else {
            res.status(401).json('Token missing')
        }
    } catch (error) {
        next(error)
    }
}

export default authMiddleware;