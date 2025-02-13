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
import EditTask from './features/tasks/EditTask'
import Prefetch from './features/auth/Prefetch'
import NewTaskForm from './features/tasks/NewTaskForm'
import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from "./hooks/useTitle"

function App() {
  useTitle("Company Management System")

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />

          {/* Protected Route */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
              <Route element={<Prefetch />}>
                <Route path='dash' element={<DashboardLayout />}>
                  <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>
                    <Route path='users'>
                      <Route index element={<UsersList />} />
                      <Route path='create' element={<NewUserForm />} />
                      <Route path=':id' element={<EditUser />} />
                    </Route>
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
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
