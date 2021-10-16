import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

//este archivo cambia de nombre respecto al id que se mande en la ruta:
// url/api/task/100 <- [id]

// eslint-disable-next-line import/no-anonymous-default-export

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    console.log(req.query)
    const { method, body, query: { id } } = req

    switch (method) {
        case "GET": //consultar
            try {
                const task = await Task.findById(id)
                if (!task) {
                    return res.status(404).json({ "msg": "Task not found" })
                }
                else {
                    return res.status(200).json(task)
                }
            } catch (error) {
                return res.status(404).json({ "msg": error.message })
            }
            break;
        
        case "PUT": //actualizar
            try {
                const task = await Task.findByIdAndUpdate(id, body,{
                    new: true
                })
                if(!task){
                    return res.status(404).json({ "msg": "Task not found" })
                }
                else{
                    return res.status(200).json(task)
                }
            } catch (error) {
                return res.status(404).json({ "msg": error.message })
            }

        case "DELETE": //eliminar
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if(!deletedTask){
                    return res.status(404).json({ "msg": "Task not found" })
                }
                else{
                    return res.status(204).json(deletedTask)
                }
            } catch (error) {
                return res.status(404).json({ "msg": error.message })
            }
          
        default:
            return res.status(400).json({ "msg": "this method is not supported" })
    }
}