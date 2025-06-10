
import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://up-task-frontend-nine-chi.vercel.app',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:4173',
            undefined // Para requests sin origin
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Para testing - permite cualquier origen
export const corsConfigOpen: CorsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};