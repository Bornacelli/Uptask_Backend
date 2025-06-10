import { transport } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
         await transport.sendMail({
                from: 'UpTask <admin@uptask.com>',
                to: user.email,
                subject: 'Uptask- Confirma tu cuenta',
                text: 'Uptask- Confirma tu cuenta' ,
                html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UpTask - Verificación de Cuenta</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(30, 41, 56, 0.1);
        }
        
        .header {
            background-color: #1E2938;
            color: #ffffff;
            padding: 30px 40px;
            text-align: center;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        
        .tagline {
            font-size: 14px;
            opacity: 0.9;
            color: #E5E7EB;
        }
        
        .content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1E2938;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #4B5563;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .button {
            display: inline-block;
            background-color: #1E2938;
            color: #ffffff;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s ease;
            margin: 20px 0;
        }
        
        .button:hover {
            background-color: #374151;
        }
        
        .info-box {
            background-color: #F3F4F6;
            border-left: 4px solid #1E2938;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .info-box h3 {
            color: #1E2938;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .info-box p {
            color: #6B7280;
            font-size: 14px;
        }
        
        .footer {
            background-color: #F9FAFB;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
        }
        
        .footer-text {
            font-size: 14px;
            color: #6B7280;
            margin-bottom: 10px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #1E2938;
            text-decoration: none;
            font-size: 14px;
        }
        
        .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 30px 0;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .logo {
                font-size: 24px;
            }
            
            .greeting {
                font-size: 16px;
            }
            
            .message {
                font-size: 15px;
            }
            
            .button {
                display: block;
                text-align: center;
                padding: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">UpTask</div>
            <div class="tagline">Confirma tu registro con el código de verificación</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">¡Bienvenido a UpTask!</div>
            
            <div class="message">
                Gracias por registrarte en UpTask. Para completar tu registro y activar tu cuenta, 
                necesitamos verificar tu dirección de correo electrónico.
            </div>
            
            <div class="info-box">
                <h3>Código de Verificación</h3>
                <p style="text-align: center; font-size: 32px; font-weight: bold; color: #1E2938; letter-spacing: 8px; margin: 20px 0;">
                    ${user.token}
                </p>
                <p style="text-align: center; color: #6B7280; font-size: 14px;">
                    Ingresa este código en la página de verificación
                </p>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account" class="button">Verificar Cuenta</a>
            </div>
            
            <div class="divider"></div>
            
            <div class="message">
                <strong>Instrucciones:</strong><br>
                1. Regresa a la página de registro<br>
                2. Ingresa el código de 6 dígitos mostrado arriba<br>
                3. Haz clic en "Verificar" para activar tu cuenta
            </div>
            
            <div class="message" style="font-size: 14px; color: #9CA3AF;">
                Este código expirará en <strong>10 minutos</strong>. Si no recibiste este correo o el código ha expirado, 
                puedes solicitar uno nuevo desde la página de registro.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                <strong>UpTask</strong> - Tu plataforma de gestión de proyectos
            </div>
            <div class="footer-text">
                Para completar tu registro, ingresa el código de verificación en la página web.
            </div>
        </div>
    </div>
</body>
</html>`

            })
    }

    static sendPasswordResetToken = async (user: IEmail) => {
         await transport.sendMail({
                from: 'UpTask <admin@uptask.com>',
                to: user.email,
                subject: 'Uptask- Confirma tu cuenta',
                text: 'Uptask- Confirma tu cuenta' ,
                html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UpTask - Restablecimiento de Contraseña</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(30, 41, 56, 0.1);
        }
        
        .header {
            background-color: #1E2938;
            color: #ffffff;
            padding: 30px 40px;
            text-align: center;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        
        .tagline {
            font-size: 14px;
            opacity: 0.9;
            color: #FEE2E2;
        }
        
        .content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1E2938;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #4B5563;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .button {
            display: inline-block;
            background-color: #1E2938;
            color: #ffffff;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s ease;
            margin: 20px 0;
        }
        
        .button:hover {
            background-color: #B91C1C;
        }
        
        .info-box {
            background-color: #FEF2F2;
            border-left: 4px solid #7F1D1D;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .info-box h3 {
            color: #7F1D1D;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .info-box p {
            color: #7F1D1D;
            font-size: 14px;
        }
        
        .warning-box {
            background-color: #FFFBEB;
            border-left: 4px solid #F59E0B;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .warning-box h3 {
            color: #D97706;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .warning-box p {
            color: #92400E;
            font-size: 14px;
        }
        
        .footer {
            background-color: #F9FAFB;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
        }
        
        .footer-text {
            font-size: 14px;
            color: #6B7280;
            margin-bottom: 10px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #1E2938;
            text-decoration: none;
            font-size: 14px;
        }
        
        .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 30px 0;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .logo {
                font-size: 24px;
            }
            
            .greeting {
                font-size: 16px;
            }
            
            .message {
                font-size: 15px;
            }
            
            .button {
                display: block;
                text-align: center;
                padding: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">UpTask</div>
            <div class="tagline">Solicitud de restablecimiento de contraseña</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hola ${user.name},</div>
            
            <div class="message">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta de UpTask. 
                Si fuiste tú quien solicitó este cambio, puedes proceder con el restablecimiento usando 
                el código de seguridad que aparece a continuación.
            </div>
            
            <div class="info-box">
                <h3>Código de Restablecimiento</h3>
                <p style="text-align: center; font-size: 32px; font-weight: bold; color: #DC2626; letter-spacing: 8px; margin: 20px 0;">
                    ${user.token}
                </p>
                <p style="text-align: center; color: #7F1D1D; font-size: 14px;">
                    Ingresa este código en la página de restablecimiento
                </p>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/new-password" class="button">Restablecer Contraseña</a>
            </div>
            
            <div class="divider"></div>
            
            <div class="message">
                <strong>Instrucciones:</strong><br>
                1. Ve a la página de restablecimiento de contraseña<br>
                2. Ingresa el código de 6 dígitos mostrado arriba<br>
                3. Crea tu nueva contraseña segura<br>
                4. Confirma los cambios para actualizar tu cuenta
            </div>
            
            <div class="warning-box">
                <h3>⚠️ Importante</h3>
                <p>
                    Si no solicitaste este restablecimiento, puedes ignorar este correo de forma segura. 
                    Tu contraseña actual seguirá siendo válida y tu cuenta permanecerá protegida.
                </p>
            </div>
            
            <div class="message" style="font-size: 14px; color: #9CA3AF;">
                Este código expirará en <strong>10 minutos</strong> por razones de seguridad. 
                Si el código ha expirado, puedes solicitar uno nuevo desde la página de restablecimiento de contraseña.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                <strong>UpTask</strong> - Tu plataforma de gestión de proyectos
            </div>
            <div class="footer-text">
                Si tienes alguna duda sobre la seguridad de tu cuenta, contáctanos inmediatamente.
            </div>
        </div>
    </div>
</body>
</html>`

            })
    }
}