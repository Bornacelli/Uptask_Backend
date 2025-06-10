// import jwt from 'jsonwebtoken'
// import Types from 'mongoose'

// type UserPayload = {
//     id: Types.ObjectId
// }

// export const generateJWT = (payload: UserPayload) => {
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: '180d   '
//     })
//     return token 
// }

import jwt from 'jsonwebtoken'

// Fixed JWT generation function
export const generateJWT = (userId: string) => {
    const payload = {
        id: userId
    }
    
    // Make sure you have JWT_SECRET in your environment variables
    const secret = process.env.JWT_SECRET
    
    const token = jwt.sign(payload, secret, {
        expiresIn: '7d' // 7 days
    })
    
    return token
}


