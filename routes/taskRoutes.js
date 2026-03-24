import express from 'express';
import Task from '../models/Task.js';
import { authMiddleware } from '../utils/auth.js';
import Project from '../models/Project.js';

const router = express.Router();
router.use(authMiddleware);


// POST /api/projects/:projectId/tasks: Create a new task for a specific project.
router.post('/:projectId/tasks', async(req,res)=>{
try{
 const project = await Project.findOne({_id: req.params.projectId});
 if(!project){
   return res.status(404).json({message: `project with ${req.params.projectId} is not found`});
}
if(project.user.toString() !== req.user._id){
    return res.status(403).json({message: 'Not authorized to create a task for this project!'});
}
const newTask = await Task.create({...req.body, project: req.params.projectId});
res.status(201).json(newTask);

}catch(error){
    res.status(400).json({ message: error.message });
}
});


// GET /api/projects/:projectId/tasks: Get all tasks for a specific project.
router.get('/:projectId/tasks', async(req,res)=>{

try{
// console.log("Project ID:", req.params.projectId);
// console.log("User ID:", req.user._id);    
const tasks = await Task.find({project: req.params.projectId}).populate('project');
res.status(200).json(tasks);
}catch(error){

    res.status(500).json({ message: error.message });

}
});


//PUT /api/tasks/:taskId: Update a single task.
router.put('/:taskId', async(req,res)=>{

try{
const task = await Task.findOne({_id: req.params.taskId}).populate('project');
if(!task){
    return res.status(404).json({messge: `Task not found!`});
}
if(task.project.user.toString() !== req.user._id ){
    return res.status(403).json({message: 'User is not authorized to update the task!'});
}

const updatedTask = await Task.findByIdAndUpdate(req.params.taskId,req.body, {new: true});
res.status(201).json(updatedTask);
}catch(error){
    res.status(500).json({ message: error.message });

}
});


//DELETE /api/tasks/:taskId: Delete a single task.
router.delete('/:taskId', async(req,res)=>{

try{
const task = await Task.findOne({_id: req.params.taskId}).populate('project');
if(!task){
    return res.status(404).json({messge: `Task not found!`});
}
if(task.project.user.toString() !== req.user._id ){
    return res.status(403).json({message: 'User is not authorized to delete the task!'});
}

const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
res.status(200).json(deletedTask);
}catch(error){
    res.status(500).json({ message: error.message });

}
});

export default router;