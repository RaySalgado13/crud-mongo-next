import Error from "next/error";
import { Button, Grid, Confirm, Loader} from "semantic-ui-react";
import { useState } from "react";
import {  useRouter } from "next/router";


export default function TaskDetail({task, error}) {//frontend
    
    const [confirm, setConfirm] = useState(false)
    const {query, push} = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)

    const deleteTask = async () => {
        const{id} = query
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`,{
                method:"DELETE"
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = () =>{
        setIsDeleting(true)
        deleteTask()
        close()
        //alert('Task deleted successfully')
        push('/')
    }

    if(error && error.statusCode)
        return <Error statusCode={error.statusCode} title={error.statusText}/>

    return (
        <Grid 
            centered 
            verticalAlign="middle"
            columns="1"
            style={{height: "80vh"}}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <div>
                        <Button 
                            color="red" 
                            onClick={open}
                            loading={isDeleting}>
                                Delete
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Confirm
                header="Please confirm"
                content="Estas seguro de eliminar esta tarea?"
                open={confirm}
                onConfirm={handleDelete}
                onCancel={close}/>
        </Grid>
    )
}

export async function getServerSideProps({query: {id}}){ //{query: {id}} = {query} query.id} backend
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`)

    if(res.status === 200){
        const task = await res.json()
        return{
            props:{
                task,
            },
        }
    }

    return{
        props:{
            error:{
                statusCode: res.status,
                statusText: "Invalid id"
            }
        }
    }
}