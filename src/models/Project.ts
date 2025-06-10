import mongoose, { Schema, Document, PopulatedDoc, Types, ObjectId } from 'mongoose';
import Task, { ITask } from './Task';
import { red } from 'colors';
import { IUser } from './User';
import Note from './Note';

export interface IProject extends Document  {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[]
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<ITask & Document>[]
}

const ProjectSchema= new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
        
    },

    clientName: {
        type: String,
        required: true,
        trim: true,
        
    },

    description: {
        type: String,
        required: true,
        trim: true,
        
    },

    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],

},{timestamps: true});

// middleware
ProjectSchema.pre('deleteOne', {document: false, query: true}, async function() {
    const projectId = this.getQuery()._id
    if(!projectId) return 

    const tasks = await Task.find({project: projectId})
    for(const task of tasks) {
        await Note.deleteMany({task: task.id})
    }
    await Task.deleteMany({project: projectId})
})

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;