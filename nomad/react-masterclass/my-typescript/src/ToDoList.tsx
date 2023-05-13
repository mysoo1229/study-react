import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
} */

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{display: "flex", flexDirection: "column"}}
      >
        <input {...register("email", { required: true })} placeholder="Email" />
        <input {...register("firstName", { required: true })} placeholder="First Name" />
        <input {...register("lastName", { required: true })} placeholder="Last Name" />
        <input {...register("userName", { required: true, minLength: 5 })} placeholder="User Name" />
        <input {...register("password", { required: true, minLength: 8 })} placeholder="Password" />
        <input {...register("passwordConfirm", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password should be at least 8 characters",
            },
          })}
          placeholder="Password Confirm"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
