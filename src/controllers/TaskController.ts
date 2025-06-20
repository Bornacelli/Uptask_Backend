import type {Request, Response} from 'express';
import Task from '../models/Task';



export class TaskController {
    // createTask
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

    // getAllTasks
    static getProjectTask= async (req: Request, res: Response): Promise<void> => {   
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Error al encontrar las tareas' })
        }
    }

    // getTaskById
    static getTaskById = async (req: Request, res: Response): Promise<void> => {   
        try {
            const task = await Task.findById(req.task.id)
                .populate({path: 'completedBy.user', select: 'id name email'})
                .populate({path: 'notes', populate: {path: 'createdBy', select: 'id name email'}})
            res.json(task)

        } catch (error) {
             res.status(500).json({ error: 'Error al encontrar la tarea' })
        }
    }

    // updateTask
    static updateTask = async (req: Request, res: Response): Promise<void> => {   
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
        
            res.send('Tarea actualizada')

        } catch (error) {
             res.status(500).json({ error: 'Error al actualizar la tarea' })
        }    
    }

    // deleteTask
    static deleteTask = async (req: Request, res: Response): Promise<void> => {   
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send('Tarea eliminada')

        } catch (error) {
             res.status(500).json({ error: 'Error al crear el proyecto' })
        }
    }
    // updateStatus 
    static updateStatus = async (req: Request, res: Response): Promise<void> => { 
        try {
            const {status} = req.body
            req.task.status = status 
            
            const data = {
                user: req.user.id,
                status
            }
            req.task.completedBy.push(data)
            await req.task.save()
            res.send('Estado de la tarea actualizado')
            
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el estado de la tarea' })
        }
    }
}