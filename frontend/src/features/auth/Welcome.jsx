import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth()
    return (
        <>
            <section className="flex flex-col items-center">
                <h1 className='text-3xl my-5 font-bold'>
                    Welcome back {username.charAt(0).toUpperCase() + username.slice(1)}
                </h1>
                <Link to={"/dash/tasks"}>View Tasks</Link>
                {isManager || isAdmin ?
                    <Link to={"/dash/users"}>User Settings</Link>
                    : null
                }
                <div className="xl:flex gap-4 md:block">
                    <Link to={"/dash/tasks/create"}>
                        <button className='outline-none cursor-pointer bg-blue-300 px-4 py-1 my-2 shadow rounded'>Create New Task</button>
                    </Link>
                    {isManager || isAdmin ?
                        <Link to={"/dash/users/create"}>
                            <button className='outline-none cursor-pointer bg-green-300 px-4 py-1 my-2 shadow rounded'>Create New User</button>
                        </Link>
                        : null
                    }
                </div>
            </section>
        </>
    )
}

export default Welcome
