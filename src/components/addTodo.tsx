import { Button, Grid, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Moment from "moment"

const url = "/.netlify/functions/";

const AddTodo = ({task, setTask, setFetchData}) => {
 
  
  const addTodo = async (task) => {
    let date = Moment().format('HH:mm  DD-MM-YYYY')
    console.log(date);
    
    let data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ task, date }),
    }).then((res) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Task has been saved",
      });
      return res;
    });
    console.log(data);

  };
  const formSchema = Yup.object({
    task: Yup.string()
      .required("Add an item")
      .min(4, "Must be greater than or equals to 4 characters")
      .max(18, "Not More than 18 characters"),
  });
  return (
    <Formik
      initialValues={{ task: task }}
      validationSchema={formSchema}
      onSubmit={(value, { resetForm }) => {
        console.log("todo", value);
        setTask("");
        resetForm();
        addTodo(value.task);
        setFetchData(true);

      }}
    >
      {(formik: any) => (
        <Form onSubmit={formik.handleSubmit}>
          <Grid  justify="center">
            <Grid >
              <div>
                <Field
                  type="task"
                  as={TextField}
                  variant="outlined"
                  label="New task"
                  name="task"
                  id="task"
                  autoComplete="off"
                  fullWidth
                />
                
                <br />
                <ErrorMessage
                  name="task"
                  render={(msg: string) => (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {msg}
                    </span>
                  )}
                />
              </div>
              <br />
              <div>
                <Button variant="contained" color="primary" type="submit" fullWidth style={{marginBottom:"15px"}}>
                  Add Task
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodo;
