import Token from "../models/Token.js";
import { createJWT } from "./createJWT.js";

const createLink = async (userId, reason, jwt_exp ) => {

    // Previous token remove
    const check = await Token.find().and([{ userId }, { reason }])

    if (check.length) {
        check[0].remove()
    }
    // Create token
    const token = createJWT({ userId }, jwt_exp)

    // Sent token
    await Token.create({ userId, reason, token })

    // Send activation email
    return `${process.env.APP_URL}/${reason}/${token}`

}

export default createLink