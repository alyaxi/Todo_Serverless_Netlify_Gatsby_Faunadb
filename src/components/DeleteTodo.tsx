import { IconButton } from '@material-ui/core';
import React from 'react'
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";

const url = "/.netlify/functions/todocrud/";

export default function DeleteTodo({task, setFetchData}) {
    const deleteTodo = async (id) => {
        return await fetch(`${url}/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
      
            return data;
          });
      };
    return (
        <IconButton
        style={{ cursor: "pointer" }}
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteTodo(task.ref["@ref"].id);
              setFetchData(true);
            }
          });
        }}
      >
        <DeleteIcon style={{color:"#ED4C67"}}/>
      </IconButton>
    )
}
