import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const config = () => {
    return {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
}

export const  transport = nodemailer.createTransport(config())