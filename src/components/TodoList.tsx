import * as React from "react";
import { Grid } from "@material-ui/core";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
//Import Components
import AddTodo from "./addTodo";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTask";
import "./asset/TodoList.css";



// crud netlify functions url
const url = ".netlify/functions/todocrud/";

// All todo List Fetched
const fetchTodo = async () => {
  return await fetch(url)
    .then((data) => data.json())
    .then((data) => {
      
      return data
      

    });
};




// Use material Ui UseStyle
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//   })
// );
//Todo Main Compoenent and Fetched all Todos over here
const TodoList = () => {
  const [todos, setTodos]:any = React.useState<boolean[]>([]);
  const [task, setTask] = React.useState("");
  const [fetchData, setFetchData] = React.useState(false);
 

  React.useEffect(() => {
    (async () => {
      let data = await fetchTodo();
      console.log("data", data);
      setTodos(data);
      setFetchData(false);
    })();
  }, [fetchData]);

  
  return (
    <div className="wrapper">
      <header>Todo App</header>
      <AddTodo task={task} setTask={setTask} setFetchData={setFetchData} />
      <Grid >
        <Grid item xs={6} sm={4}>
          <ul className="List" >
          {todos == false ? <div className="list-indv">
            Please add Some task
          </div> : 
             todos.map((task) => (
              <div key={task.ref["@ref"].id} className="list-indv">
             
             <li> 
              {task.data.task}
              <br />
              <span className="newdate">Dated: {task.data.date}</span>
              
              <div className="buttons">
              <UpdateTodo
                task={task}
                setTask={setTask}
                setFetchData={setFetchData}
              />
              <DeleteTodo task={task} setFetchData={setFetchData} />
              </div>
              
              </li>
              
              
              </div>
             
           
              
            
          ))}
         
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};
export default TodoList;
