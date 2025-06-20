import type { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";
import { populate } from "dotenv";

export class TeamMemberController {

    static findMemberByEmail = async (req: Request, res: Response) => {
        const {email} = req.body

        const user = await User.findOne({email}).select('id name email')
        if(!user) {
            res.status(500).json({ error: 'Usuario no encontrado' })
        }
        res.json(user)

    }

    static addMemberById = async (req: Request, res: Response) => {
        const {id} = req.body

        const user = await User.findById(id).select('id')
        if(!user) {
            res.status(404).json({ error: 'Usuario no encontrado' })
        }

        if(req.project.team.some(team => team.toString() === user.id.toString())) {
            res.status(409).json({ error: 'El usuario ya fue agregado al proyecto' })
        }

        req.project.team.push(user.id)
        await req.project.save()
        res.send('Usuario agregado correctamente')
    }

    static removeMemberById = async (req: Request, res: Response) => {
        const {userId} = req.params

        if(!req.project.team.some(team => team.toString() === userId)) {
            res.status(409).json({ error: 'El usuario no pertenece al proyecto' })
        }

        req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== userId)

        await req.project.save()

        res.send('Usuario eliminado correctamente')
    }

    static getProjectTeam = async (req: Request, res: Response) => {
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select: 'id email name'
        })
        res.json(project.team)
    }

}