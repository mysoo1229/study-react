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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
};

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{display: "flex", flexDirection: "column"}}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only Naver emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>

        <input
          {...register("firstName", {
            required: "First Name is required",
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", {
            required: "Last Name is required",
          })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register("userName", { 
            required: "User Name is required",
            minLength: 5,
          })}
          placeholder="User Name"
        />
        <span>{errors?.userName?.message}</span>

        <input
          {...register("password", {
            required: "Password is required",
            minLength: 8,
          })}
        placeholder="Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            minLength: {
              value: 5,
              message: "Your password should be at least 8 characters",
            },
          })}
          placeholder="Password Confirm"
        />
        <span>{errors?.passwordConfirm?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
