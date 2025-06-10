import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
    
    // create project
    static createProject = async (req: Request, res: Response): Promise<void> => {
        const project = new Project(req.body)

        project.manager = req.user.id
        console.log(req.user)
        try {
            await project.save();
            res.send('Proyecto creado');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el proyecto' });
        }
    }

    // Get all projects
    static getAllProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const projects = await Project.find({
                $or: [
                    {manager: {$in: req.user.id}},
                    {team: {$in: req.user.id}}
                ]
            });
            res.json(projects);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
    }

    //  get project by id
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
            if (project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
                const error = new Error('Acción no válida')
                res.status(500).json({ error: error.message });
                return;
            }
            res.json(project);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    }

    // Update project
    static updateProject= async (req: Request, res: Response): Promise<void> => {
        try {
            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description

           await req.project.save()
           res.send('Proyecto actualizado')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    }

// detele project
    static deleteProject= async (req: Request, res: Response): Promise<void> => {
        try {
           await req.project.deleteOne()
           res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    }
}

