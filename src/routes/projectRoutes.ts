import {Router} from 'express';
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { ProjectExists } from '../middleware/project';
import { hasAuthorization, taskBelongsToProject, taskExists } from '../middleware/task';
import { authenticate } from '../middleware/auth';
import { TeamMemberController } from '../controllers/TeamController';
import { NoteController } from '../controllers/NoteController';

const router = Router()

router.use(authenticate)

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
router.get('/', 
        ProjectController.getAllProjects)

router.get('/:id', 
        param('id').isMongoId().withMessage('El id no es válido'),
        handleInputErrors,
        ProjectController.getProjectByID)

// Router (Tasks)
router.param('projectId', ProjectExists)

router.put('/:projectId', 
        param('projectId').isMongoId().withMessage('El id no es válido'),
        body('projectName')
            .notEmpty().withMessage('El nombre del proyecto es obligatorio'),

        body('clientName')
            .notEmpty().withMessage('El nombre del cliente es obligatorio'),

        body('description')
            .notEmpty().withMessage('La descripción del proyecto es obligatorio'),
        handleInputErrors,
        hasAuthorization,
        ProjectController.updateProject)

router.delete('/:projectId',
        param('projectId').isMongoId().withMessage('El id no es válido'),
        handleInputErrors,
        hasAuthorization,
        ProjectController.deleteProject)

router.post('/:projectId/tasks',
        hasAuthorization, 
        body('name')
            .notEmpty().withMessage('El nombre de la tarea es obligatoria'),

        body('description')
            .notEmpty().withMessage('la descripción de la tarea es obligatoria'),
            handleInputErrors,
        TaskController.createTask
)

router.get('/:projectId/tasks',
        TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
        param('taskId').isMongoId().withMessage('El id no es válido'),
        handleInputErrors,
        TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
        hasAuthorization, 
        param('taskId').isMongoId().withMessage('El id no es válido'),
        body('name')
            .notEmpty().withMessage('El nombre de la tarea es obligatoria'),

        body('description')
            .notEmpty().withMessage('la descripción de la tarea es obligatoria'),
        handleInputErrors,
        TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
        hasAuthorization, 
        param('taskId').isMongoId().withMessage('El id no es válido'),
        handleInputErrors,
        TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
        param('taskId').isMongoId().withMessage('El id no es válido'),
        body('status')
            .notEmpty().withMessage('El estado de la tarea es obligatorio'),
        handleInputErrors,
        TaskController.updateStatus
)

// Teams
router.post('/:projectId/team/find',
        body('email')
    .isEmail().toLowerCase().withMessage('El email no puede ir vacio'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.get('/:projectId/team',
        TeamMemberController.getProjectTeam
)

router.post('/:projectId/team',
        body('id')
        .isMongoId().withMessage('ID no válido'),
        handleInputErrors,
        TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
        param('userId')
        .isMongoId().withMessage('ID no válido'),
        handleInputErrors,
        TeamMemberController.removeMemberById
)

// Notes
router.post('/:projectId/tasks/:taskId/notes',
        body('content')
    .notEmpty().withMessage('El contenido de la nota es obligatorio'),
    handleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
        NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
        param('noteId')
        .isMongoId().withMessage('ID no válido'),
        handleInputErrors,
        NoteController.deleteNote
)

export default router
