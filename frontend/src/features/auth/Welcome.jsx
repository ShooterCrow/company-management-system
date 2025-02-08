import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <>
            <section className="flex flex-col items-center">
                <h1 className='text-3xl my-5 font-bold'>Welcome</h1>
                <Link to={"/dash/tasks"}>View Tasks</Link>
                <Link to={"/dash/users"}>User Settings</Link>
                <div className="xl:flex gap-4 md:block">
                    <Link to={"/dash/tasks/create"}>
                        <button className='outline-none cursor-pointer bg-blue-300 px-4 py-1 my-2 shadow rounded'>Create New Task</button>
                    </Link>
                    <Link to={"/dash/users/create"}>
                        <button className='outline-none cursor-pointer bg-green-300 px-4 py-1 my-2 shadow rounded'>Create New User</button>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Welcome
