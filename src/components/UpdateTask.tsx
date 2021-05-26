import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const url = "/.netlify/functions/todocrud/";

export default function UpdateTask({ setTask, setFetchData, task }) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
   
    
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    })
  );

  const [update, setUpdated] = React.useState("");
  const [currentID, setCurrentId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = async (id, task) => {
    return await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ task }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Good job!", "Your task has been updated!", "success");
        return data;
      });
  };

  const updateSchema = Yup.object({
    update: Yup.string()
      .required("Add an item")
      .min(4, "Must be greater than or equals to 4 characters"),
  });
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Formik
              initialValues={{ update: update }}
              validationSchema={updateSchema}
              onSubmit={(value, { resetForm }) => {
                console.log("todo", value.update);
                setTask("");
                setUpdated("");
                updateTodo(currentID, value.update);
                setFetchData(true);
                resetForm();
                handleClose();
              }}
            >
              {(formik: any) => (
                <Form onSubmit={formik.handleSubmit}>
                  <div>
                    <Field
                      type="update"
                      as={TextField}
                      variant="outlined"
                      label="Update task"
                      name="update"
                      id="update"
                      autoComplete="off"
                      fullWidth
                    />
                    <br />
                    <ErrorMessage
                      name="update"
                      render={(msg: string) => (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {msg}
                        </span>
                      )}
                    />
                  </div>
                  <br />
                  <div>
                    <Button variant="contained" color="primary" type="submit">
                      Update Task
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
      <IconButton
        onClick={() => {
          console.log(task.data.task, "id" + task.ref["@ref"].id);
          setCurrentId(task.ref["@ref"].id);
          setOpen(true);
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
}

