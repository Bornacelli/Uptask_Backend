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
                subject: 'UpTask - Confirma tu cuenta y comienza a organizar',
                text: 'UpTask - Confirma tu cuenta para comenzar a organizar tus tareas' ,
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px 0;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 
                0 25px 60px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .header {
            background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
            color: #ffffff;
            padding: 48px 40px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }
        
        .logo {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: -1px;
            margin-bottom: 12px;
            background: linear-gradient(135deg, #60A5FA, #A78BFA);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            z-index: 1;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            color: #CBD5E1;
            font-weight: 500;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 48px 40px;
            background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
        }
        
        .welcome-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .greeting {
            font-size: 28px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 16px;
            line-height: 1.2;
        }
        
        .message {
            font-size: 18px;
            color: #475569;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        .verification-card {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
            border: 2px solid rgba(59, 130, 246, 0.1);
            border-radius: 20px;
            padding: 32px;
            margin: 32px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .verification-card::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4);
            border-radius: 20px;
            z-index: -2;
        }
        
        .verification-card::after {
            content: '';
            position: absolute;
            inset: 2px;
            background: inherit;
            border-radius: 18px;
            z-index: -1;
        }
        
        .verification-title {
            font-size: 20px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .token-display {
            font-size: 44px;
            font-weight: 900;
            color: #1E293B;
            letter-spacing: 12px;
            margin: 24px 0;
            font-family: 'SF Mono', Consolas, 'Monaco', monospace;
            background: linear-gradient(135deg, #1E293B 0%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .token-subtitle {
            color: #64748B;
            font-size: 16px;
            font-weight: 500;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            color: #ffffff;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 16px;
            font-weight: 700;
            font-size: 18px;
            transition: all 0.3s ease;
            margin: 24px 0;
            box-shadow: 
                0 8px 25px rgba(59, 130, 246, 0.3),
                0 3px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .button:hover::before {
            left: 100%;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 12px 40px rgba(59, 130, 246, 0.4),
                0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .steps-section {
            background: rgba(255, 255, 255, 0.7);
            border-radius: 16px;
            padding: 24px;
            margin: 32px 0;
        }
        
        .steps-title {
            font-size: 20px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            margin: 12px 0;
            padding: 8px 0;
        }
        
        .step-number {
            background: linear-gradient(135deg, #3B82F6, #8B5CF6);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .step-text {
            color: #475569;
            font-size: 16px;
            line-height: 1.5;
        }
        
        .expiry-notice {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .expiry-icon {
            color: #F59E0B;
            font-size: 20px;
            margin-top: 2px;
        }
        
        .expiry-text {
            color: #92400E;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .footer {
            background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
            padding: 40px;
            text-align: center;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #1E293B, #3B82F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .social-section {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px 0;
            }
            
            .email-container {
                margin: 20px auto;
                border-radius: 16px;
            }
            
            .header, .content, .footer {
                padding: 32px 24px;
            }
            
            .logo {
                font-size: 28px;
            }
            
            .greeting {
                font-size: 24px;
            }
            
            .message {
                font-size: 16px;
            }
            
            .token-display {
                font-size: 36px;
                letter-spacing: 8px;
            }
            
            .button {
                display: block;
                text-align: center;
                padding: 18px;
                font-size: 16px;
            }
            
            .verification-card {
                padding: 24px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">UpTask</div>
            <div class="tagline">Tu espacio de trabajo inteligente</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="welcome-section">
                <div class="greeting">¡Bienvenido a UpTask! 🎉</div>
                <div class="message">
                    Estás a un paso de comenzar a organizar tus proyectos de manera más inteligente. 
                    Confirma tu cuenta para desbloquear todas las funcionalidades.
                </div>
            </div>
            
            <div class="verification-card">
                <div class="verification-title">
                    🔐 Tu código de verificación
                </div>
                <div class="token-display">${user.token}</div>
                <div class="token-subtitle">
                    Ingresa este código para activar tu cuenta
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account" class="button">
                    Verificar mi cuenta
                </a>
            </div>
            
            <div class="steps-section">
                <div class="steps-title">
                    📋 Cómo verificar tu cuenta
                </div>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-text">Haz clic en el botón "Verificar mi cuenta" o ve a la página de confirmación</div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-text">Ingresa el código de 6 dígitos en el campo correspondiente</div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-text">¡Listo! Podrás acceder a todas las funcionalidades de UpTask</div>
                </div>
            </div>
            
            <div class="expiry-notice">
                <div class="expiry-icon">⏰</div>
                <div class="expiry-text">
                    <strong>Importante:</strong> Este código expirará en <strong>10 minutos</strong>. 
                    Si no lo usas a tiempo, podrás solicitar uno nuevo desde la página de registro.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">UpTask</div>
            <div class="footer-text">
                La plataforma que transforma cómo organizas tu trabajo
            </div>
            <div class="footer-text">
                ¿Necesitas ayuda? Responde a este email y te ayudaremos
            </div>
            
            <div class="social-section">
                <div style="color: #64748B; font-size: 13px;">
                    © 2025 UpTask. Diseñado para equipos que quieren lograr más.
                </div>
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
                subject: 'UpTask - Restablece tu contraseña de forma segura',
                text: 'UpTask - Código para restablecer tu contraseña' ,
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            background: #fff;
            padding: 20px 0;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 
                0 25px 60px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .header {
            background: linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%);
            color: #ffffff;
            padding: 48px 40px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }
        
        .logo {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: -1px;
            margin-bottom: 12px;
            background: linear-gradient(135deg, #FCA5A5, #F87171);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            z-index: 1;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            color: #FECACA;
            font-weight: 500;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 48px 40px;
            background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
        }
        
        .security-alert {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
            border: 2px solid rgba(239, 68, 68, 0.2);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            display: flex;
            align-items: flex-start;
            gap: 16px;
        }
        
        .alert-icon {
            color: #DC2626;
            font-size: 24px;
            margin-top: 2px;
        }
        
        .alert-content {
            flex: 1;
        }
        
        .alert-title {
            font-size: 18px;
            font-weight: 700;
            color: #7F1D1D;
            margin-bottom: 8px;
        }
        
        .alert-text {
            color: #991B1B;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 16px;
        }
        
        .message {
            font-size: 17px;
            color: #475569;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        .reset-card {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(127, 29, 29, 0.05) 100%);
            border: 2px solid rgba(239, 68, 68, 0.1);
            border-radius: 20px;
            padding: 32px;
            margin: 32px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .reset-card::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #EF4444, #DC2626, #7F1D1D);
            border-radius: 20px;
            z-index: -2;
        }
        
        .reset-card::after {
            content: '';
            position: absolute;
            inset: 2px;
            background: inherit;
            border-radius: 18px;
            z-index: -1;
        }
        
        .reset-title {
            font-size: 20px;
            font-weight: 700;
            color: #7F1D1D;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .token-display {
            font-size: 44px;
            font-weight: 900;
            color: #7F1D1D;
            letter-spacing: 12px;
            margin: 24px 0;
            font-family: 'SF Mono', Consolas, 'Monaco', monospace;
            background: linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .token-subtitle {
            color: #991B1B;
            font-size: 16px;
            font-weight: 500;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%);
            color: #ffffff;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 16px;
            font-weight: 700;
            font-size: 18px;
            transition: all 0.3s ease;
            margin: 24px 0;
            box-shadow: 
                0 8px 25px rgba(220, 38, 38, 0.3),
                0 3px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .button:hover::before {
            left: 100%;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 12px 40px rgba(220, 38, 38, 0.4),
                0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .steps-section {
            background: rgba(255, 255, 255, 0.7);
            border-radius: 16px;
            padding: 24px;
            margin: 32px 0;
        }
        
        .steps-title {
            font-size: 20px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            margin: 12px 0;
            padding: 8px 0;
        }
        
        .step-number {
            background: linear-gradient(135deg, #DC2626, #7F1D1D);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .step-text {
            color: #475569;
            font-size: 16px;
            line-height: 1.5;
        }
        
        .warning-notice {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .warning-icon {
            color: #F59E0B;
            font-size: 20px;
            margin-top: 2px;
        }
        
        .warning-text {
            color: #92400E;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .not-you-section {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .safe-icon {
            color: #059669;
            font-size: 20px;
            margin-top: 2px;
        }
        
        .safe-text {
            color: #065F46;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .footer {
            background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
            padding: 40px;
            text-align: center;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #1E293B, #DC2626);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .security-footer {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(127, 29, 29, 0.05) 100%);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px 0;
            }
            
            .email-container {
                margin: 20px auto;
                border-radius: 16px;
            }
            
            .header, .content, .footer {
                padding: 32px 24px;
            }
            
            .logo {
                font-size: 28px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .message {
                font-size: 16px;
            }
            
            .token-display {
                font-size: 36px;
                letter-spacing: 8px;
            }
            
            .button {
                display: block;
                text-align: center;
                padding: 18px;
                font-size: 16px;
            }
            
            .reset-card {
                padding: 24px 16px;
            }
            
            .security-alert {
                padding: 20px 16px;
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
            <div class="security-alert">
                <div class="alert-icon">🔒</div>
                <div class="alert-content">
                    <div class="alert-title">Solicitud de seguridad</div>
                    <div class="alert-text">
                        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. 
                        Si fuiste tú, continúa con el proceso. Si no, ignora este email.
                    </div>
                </div>
            </div>
            
            <div class="greeting">Hola ${user.name} 👋</div>
            
            <div class="message">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en UpTask. 
                Para garantizar la seguridad de tu información, usa el código de verificación que aparece a continuación.
            </div>
            
            <div class="reset-card">
                <div class="reset-title">
                    🔑 Código de restablecimiento
                </div>
                <div class="token-display">${user.token}</div>
                <div class="token-subtitle">
                    Usa este código para crear una nueva contraseña
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/new-password" class="button">
                    Restablecer contraseña
                </a>
            </div>
            
            <div class="steps-section">
                <div class="steps-title">
                    🔧 Pasos para restablecer
                </div>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-text">Haz clic en "Restablecer contraseña" o ve a la página de restablecimiento</div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-text">Ingresa el código de 6 dígitos en el campo de verificación</div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-text">Crea una nueva contraseña segura (mínimo 8 caracteres)</div>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-text">Confirma los cambios y accede con tu nueva contraseña</div>
                </div>
            </div>
            
            <div class="not-you-section">
                <div class="safe-icon">✅</div>
                <div class="safe-text">
                    <strong>¿No fuiste tú?</strong><br>
                    Si no solicitaste este restablecimiento, puedes ignorar este email de forma segura. 
                    Tu contraseña actual no se verá afectada y tu cuenta permanece protegida.
                </div>
            </div>
            
            <div class="warning-notice">
                <div class="warning-icon">⏰</div>
                <div class="warning-text">
                    <strong>Tiempo límite:</strong> Este código expirará en <strong>10 minutos</strong> por seguridad. 
                    Si expira, podrás solicitar uno nuevo desde la página de restablecimiento.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">UpTask</div>
            <div class="footer-text">
                Protegiendo tu información y proyectos
            </div>
            
            <div class="security-footer">
                <div style="color: #7F1D1D; font-size: 14px; font-weight: 600; margin-bottom: 4px;">
                    🛡️ Consejos de seguridad
                </div>
                <div style="color: #991B1B; font-size: 13px;">
                    • Nunca compartas tu código de verificación<br>
                    • UpTask nunca te pedirá tu contraseña por email<br>
                    • Si tienes dudas sobre la seguridad, contáctanos
                </div>
            </div>
        </div>
    </div>
</body>
</html>`

            })
    }
}