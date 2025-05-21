import {Router} from 'express';
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExists } from '../middleware/project';

const router = Router()

router.post('/', 
    body('projectName')
            .notEmpty().withMessage('El nombre del proyecto es obligatorio'),

    body('clientName')
            .notEmpty().withMessage('El nombre del cliente es obligatorio'),

    body('description')
            .notEmpty().withMessage('La descripción del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id', 
        param('id').isMongoId().withMessage('El id no es válido'),
        handleInputErrors,
        ProjectController.getProjectByID)

router.put('/:id', 
        param('id').isMongoId().withMessage('El id no es válido'),
        body('projectName')
            .notEmpty().withMessage('El nombre del proyecto es obligatorio'),

        body('clientName')
            .notEmpty().withMessage('El nombre del cliente es obligatorio'),

        body('description')
            .notEmpty().withMessage('La descripción del proyecto es obligatorio'),
        handleInputErrors,
        ProjectController.updateProject)

router.delete('/:id',
        param('id').isMongoId().withMessage('El id no es válido'),
        handleInputErrors,
        ProjectController.deleteProject)


// Router (Tasks)
router.post('/:projectId/tasks',
        validateProjectExists,
        body('name')
            .notEmpty().withMessage('El nombre de la tarea es obligatoria'),

        body('description')
            .notEmpty().withMessage('la descripción de la tarea es obligatoria'),
        TaskController.createTask
)

router.get('/:projectId/tasks',
        validateProjectExists,
        TaskController.getProjectTask
)

router.get('/:projectId/tasks/:taskId',
        validateProjectExists,
        TaskController.getTaskById
)

export default router
