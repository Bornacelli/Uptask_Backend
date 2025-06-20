import type {Request, Response} from 'express'
import User from '../models/User'
import Token from '../models/Token'
import { hashPassword, checkPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'
import { generateJWT } from '../utils/jwt'

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const {password, email} = req.body

            const userExists = await User.findOne({email})
            if(userExists) {
                const error = new Error('El usuario ya está registrado')
                return res.status(401).json({error: error.message})
            }

            const user = new User(req.body)

        // Hash password
            user.password = await hashPassword(password)

            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

        // enviar email
           AuthEmail.sendConfirmationEmail({
            email: String(user.email),
            name: String(user.name),
            token: String(token.token)
           })

            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const {token} = req.body

            const tokenExist = await Token.findOne({token})
            if(!tokenExist) {
                const error = new Error('Token no válido')
                return res.status(404).json({error: error.message})
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Cuenta confirmada correctamente')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                const error = Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }
            if(!user.confirmed) {
                const token = new Token()
                token.user = user.id
                token.token = generateToken()  
                await token.save()

                // enviar email
                AuthEmail.sendConfirmationEmail({
                    email: String(user.email),
                    name: String(user.name),
                    token: String(token.token)
                })

                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un email de confirmación nuevamente')
                return res.status(401).json({error: error.message})
            }

            // Revisar Contraseña
                const isPasswordCorrect = await checkPassword(password, user.password)
                if(!isPasswordCorrect) {
                    const error = new Error('La contraseña es incorrecta')
                return res.status(401).json({error: error.message})
                }
                const token = generateJWT(user.id)

                res.send(token)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const {email} = req.body

            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('El usuario no está registrado')
                return res.status(401).json({error: error.message})
            }

            if(user.confirmed) {
                const error = new Error('El usuario ya está confirmado')
                return res.status(409).json({error: error.message})
            }
           
            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

        // enviar email
           AuthEmail.sendConfirmationEmail({
            email: String(user.email),
            name: String(user.name),
            token: String(token.token)
           })

            await Promise.allSettled([user.save(), token.save()])
            res.send('Se envió un nuevo token a tu e-mail')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const {email} = req.body

            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('El usuario no está registrado')
                return res.status(401).json({error: error.message})
            }

            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()

        // enviar email
           AuthEmail.sendPasswordResetToken({
            email: String(user.email),
            name: String(user.name),
            token: String(token.token)
           })

            res.send('Revisa tu email para instrucciones')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            const {token} = req.body

            const tokenExist = await Token.findOne({token})
            if(!tokenExist) {
                const error = new Error('Token no válido')
                return res.status(404).json({error: error.message})
            }
            res.send('Token válido, define tu nuevo password')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const {token} = req.params
            const {password} = req.body

            const tokenExist = await Token.findOne({token})
            if(!tokenExist) {
                const error = new Error('Token no válido')
                return res.status(404).json({error: error.message})
            }

            const user = await User.findById(tokenExist.user)
            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])

            res.send('el password se modificó correctamente')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static user = async (req: Request, res: Response) => {
        return res.json(req.user)

    }

    static updateProfile = async (req: Request, res: Response) => {
        const {name, email} = req.body 

        const userExists = await User.findOne({email})
            if(userExists && userExists.id.toString() !== req.user.id.toString()) {
                const error = new Error('Ese email ya está registrado')
                return res.status(401).json({error: error.message})
            }

        req.user.name = name
        req.user.email = email

        try {
            await req.user.save()
            res.send('Perfil Actualizado Correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
            
        }
    }

    static updateCurrentUserPassword = async (req: Request, res: Response) => {
        const {current_password, password} = req.body

        const user = await User.findById(req.user.id)

        const isPasswordCorrect = await checkPassword(current_password, user.password)
        if(!isPasswordCorrect) {
            const error = new Error('La contraseña actual es incorrecta')
            return res.status(401).json({error: error.message})
        }

        try {
            user.password = await hashPassword(password)
            await user.save()
            res.send('La contraseña se modificó correctamente ')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})

            
        }
    }

    static checkPassword = async (req: Request, res: Response) => {
         const {password} = req.body

        const user = await User.findById(req.user.id)

        const isPasswordCorrect = await checkPassword(password, user.password)
        if(!isPasswordCorrect) {
            const error = new Error('El Password es Incorrecto')
            return res.status(401).json({error: error.message})
        }

        res.send('Password Correcto')
    }


    
}