import { store } from "../../app/store";
import { tasksApiSlice } from "../tasks/tasksApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subsribing...");
    const tasks = store.dispatch(tasksApiSlice.endpoints.getTasks.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    return () => {
      console.log("Unsubscribing");
      tasks.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
  
};

export default Prefetch;
