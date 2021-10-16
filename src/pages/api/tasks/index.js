// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import {dbConnect} from '../../../utils/mongoose';
//import { Task } from "../../../models/Task";
import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async function handler(req, res) {

    const {method,body} = req

    console.log(req.method, req.url);
    switch(method){
        case "GET":
            try {
                const tasks = await Task.find({});
                return res.status(200).json(tasks);
            } catch (error) {
                res.status(500).json({"error":error.message})
            }

        case "POST":
            try {
                const newTask = new Task(body)
                const savedTask = await newTask.save()
                return res.status(201).json(savedTask)
            } catch (error) {
                res.status(400).json({"error":error.message})
            }

        default:
            return res.status(400).json({msg: 'this method is not supported'})
    }

    
    
    
}


  
