import { Router } from "express";
import {body, param} from 'express-validator'
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router()

router.post('/create-account',
    body('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
    .isLength({min: 8}).withMessage('La contraseña es muy corta. minimo 8 caracteres'),
     body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('La contraseña no es igual')
        } 
        return true
     }),
    body('email')
    .isEmail().withMessage('El email no puede ir vacio'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.createAccount(req, res);
        } catch (err) {
            next(err);
        }
    }


)


router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('Debes escribir el código'),
        handleInputErrors,
        async (req, res, next) => {
            try {
                await AuthController.confirmAccount(req, res);
            } catch (err) {
                next(err);
            }
        }
)

router.post('/login',
    body('email')
    .isEmail().withMessage('El email no puede ir vacio'),
    body('password')
    .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.login(req, res);
        } catch (err) {
            next(err);
        }
    }

)

router.post('/request-code',
    body('email')
    .isEmail().withMessage('El email no puede ir vacio'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.requestConfirmationCode(req, res);
        } catch (err) {
            next(err);
        }
    }

)

router.post('/forgot-password',
    body('email')
    .isEmail().withMessage('El email no puede ir vacio'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.forgotPassword(req, res);
        } catch (err) {
            next(err);
        }
    }

)

router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('Debes escribir el código'),
        handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.validateToken(req, res);
        } catch (err) {
            next(err);
        }
    }

)

router.post('/update-password/:token',
    param('token')
    .isNumeric().withMessage('token no válido'),
    body('password')
    .isLength({min: 8}).withMessage('La contraseña es muy corta. minimo 8 caracteres'),
     body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('La contraseña no es igual')
        } 
        return true
     }),
        handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.updatePasswordWithToken(req, res);
        } catch (err) {
            next(err);
        }
    }

)

router.get('/user',
    authenticate,
    async (req, res, next) => {
        try {
            await AuthController.user(req, res);
        } catch (err) {
            next(err);
        }
    }
)

// profile 
router.put('/profile',
    authenticate,
   body('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
    .isEmail().withMessage('El email no puede ir vacio'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.updateProfile(req, res);
        } catch (err) {
            next(err);
        }
    }
)

router.post('/update-password',
    authenticate,
    body('current_password')
    .notEmpty().withMessage('La contraseña no puede ir vacia'),
    body('password')
    .isLength({min: 8}).withMessage('La contraseña es muy corta. minimo 8 caracteres'),
     body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('La contraseña no es igual')
        } 
        return true
     }),
     handleInputErrors,
     async (req, res, next) => {
        try {
            await AuthController.updateCurrentUserPassword(req, res);
        } catch (err) {
            next(err);
        }
    }
)

router.post('/check-password',
    authenticate,
    body('password')
    .notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await AuthController.checkPassword(req, res);
        } catch (err) {
            next(err);
        }
    }
)



export default router