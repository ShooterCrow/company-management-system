import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './features/auth/Login'
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import Welcome from './features/auth/Welcome'
import TaskList from './features/tasks/TasksList'
import UsersList from './features/users/UsersList'
import NewUserForm from './features/users/NewuserForm'
import EditUser from './features/users/EditUser'
import NewTask from './features/tasks/NewTask'
import EditTask from './features/tasks/EditTask'
import Prefetch from './features/auth/Prefetch'
import NewTaskForm from './features/tasks/NewTaskForm'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route element={<Prefetch />}>
            <Route path='dash' element={<DashboardLayout />}>
              <Route index element={<Welcome />} />
              <Route path='users'>
                <Route index element={<UsersList />} />
                <Route path='create' element={<NewUserForm />} />
                <Route path=':id' element={<EditUser />} />
              </Route>
              <Route path='tasks'>
                <Route index element={<TaskList />} />
                <Route path='create' element={<NewTaskForm />} />
                <Route path=':id' element={<EditTask />} />
              </Route>

              {/* Dashboad End */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
