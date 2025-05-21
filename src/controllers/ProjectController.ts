import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
    static createProject = async (req: Request, res: Response): Promise<void> => {
        const project = new Project(req.body);
        try {
            await project.save();
            res.send('Proyecto creado');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el proyecto' });
        }
    }

    static getAllProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const projects = await Project.find();
            res.json(projects);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
    }

    static getProjectByID = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        console.log(id);
        try {
            const project = await Project.findById(id).populate('tasks');
            if (!project) {
                const error = new Error('El proyecto no existe');
                res.status(404).json({ error: error.message });
                return;
            }
            res.json(project);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    }

    static updateProject= async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        console.log(id);
        try {
           const project = await Project.findByIdAndUpdate(id, req.body)

           if (!project) {
                const error = new Error('El proyecto no existe');
                res.status(404).json({ error: error.message });
                return;
            }

           await project.save()
           res.send('Proyecto actualizado')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    }

    static deleteProject= async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        console.log(id);
        try {
           const project = await Project.findById(id)
           if (!project) {
                const error = new Error('El proyecto no existe');
                res.status(404).json({ error: error.message });
                return;
            }
           await project.deleteOne()
           res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    }
}