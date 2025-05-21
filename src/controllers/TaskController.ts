import type {Request, Response} from 'express';
import Task from '../models/Task';



export class TaskController {
    static createTask= async (req: Request, res: Response): Promise<void> => {   
        try {

            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])

            res.send('Tarea creada')
            
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el proyecto' });
            
        }
    }

    static getProjectTask= async (req: Request, res: Response): Promise<void> => {   
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el proyecto' })
        }
    }

    static getTaskById = async (req: Request, res: Response): Promise<void> => {   
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if(!task) {
                const error = new Error('El proyecto no existe');
                res.status(404).json({ error: error.message });
                return;
            }

            console.log(task.project)
            console.log(req.project.id)
            if(!task.project !== req.project.id) {
                const error = new Error('Acción no válida');
                res.status(404).json({ error: error.message });
                return;
            }

        } catch (error) {
             res.status(500).json({ error: 'Error al crear el proyecto' })
        }
    }
}