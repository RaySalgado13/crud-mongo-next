/* eslint-disable @next/next/no-img-element */
/*import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}*/

import router from "next/router";
import { Button, Card, CardContent, CardGroup, CardHeader, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx) => { //esta funcion se ejecuta en el backend, los datos pasan primero por aqui

  console.log("backend")

  const res = await fetch('http://localhost:3000/api/tasks')
  const tasks = await res.json()
  console.log(tasks)

  return{//los datos se pasan por props
    props:{
      tasks,
    }
  }

}

export default function HomePage({ tasks }) {//el frontend recibe los props del backend y los puede usar
  const router = useRouter()
  /*
  LA DEFINICION DE LA FUNCION ES EQUIVALENTE A:
  export default function HomePage(props) {
    tasks = props.tasks;
  }*/

  console.log(tasks)
  console.log("frontend")

  if(tasks.length == 0) return(
      <Grid 
        centered
        verticalAlign="middle"
        columns="1"
        style={{height: "80vh"}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1> There are no tasks yet </h1>
            <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" 
            alt="no tasks yet"/>
            <div>
              <Button 
                primary
                onClick={()=> router.push('tasks/new')}
                >
                  Create a Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

  //Render a list of tasks
  return (
    <Container style={{padding:'20px'}}>
      <Card.Group itemsPerRow={4}>
        {
          tasks.map(task => (
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
              </Card.Content>
              <Card.Content extra>
                <Button 
                  primary 
                  onClick={() => router.push(`/tasks/${task._id}`)}>
                    View
                </Button>
                <Button 
                  secondary
                  onClick={() => router.push(`/tasks/${task._id}/edit`)}>
                    Edit
                    </Button>
              </Card.Content>
            </Card>
          ))
        }

      </Card.Group>
    </Container>
  )
}




