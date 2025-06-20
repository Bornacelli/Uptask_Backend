import Project, { IProject } from '../models/Project';
import type {Request, Response, NextFunction} from 'express';

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function ProjectExists(req: Request, res: Response, next: NextFunction) {
    try {
        const {projectId} = req.params
        const project = await Project.findById(projectId)
        if (!project) {
                const error = new Error('El proyecto no existe')
                res.status(404).json({ error: error.message });
                
            }
            req.project = project
            next()
        
    } catch (error) {
        res.status(500).json({ error: 'Error al validar el ID del proyecto' });
        
    }
}