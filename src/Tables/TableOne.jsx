import React, { useEffect, useState } from 'react';
import { clearErrors } from '../actions/userAction';
import { getAllUsers } from '../actions/addUserAction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ImEye } from "react-icons/im";
import { deleteUser } from '../actions/deleteUser';
import { DELETE_USER_RESET } from '../constants/deleteUserConstant';

const TableOne = () => {


    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, users } = useSelector((state) => state.allUser)
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.delUser)
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar('User deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers(keyword));
    }, [enqueueSnackbar, error, dispatch, deleteError, isDeleted, message, keyword]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            setKeyword(`/allemployees/${keyword}`);
        }
    };


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <div className='flex flex-col justify-between md:flex-row'>
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        All Employees
                    </h4>
                    <div className="mb-10 mt-5 md:mt-0 md:mb-0">
                        <form action="https://formbold.com/s/unique_form_id" method="POST">
                            <div className="relative">
                                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                    <svg
                                        className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                            fill=""
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                            fill=""
                                        />
                                    </svg>
                                </button>

                                <input
                                    type="text"
                                    placeholder='Search by Name...'
                                    onChange={(e) => setKeyword(e.target.value)}
                                    required
                                    onSubmit={searchSubmitHandler}
                                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white md:w-50 "
                                />
                            </div>
                        </form>
                    </div>
                </div>
                {users.length === 0 ? (
                    <div className='border-t border-[#eee] py-5 px-4 pl-9 dark:border-strokedark'>
                        <h4 className="mb-6 text-md font-semibold text-center text-black dark:text-white">
                            No Data Available
                        </h4>
                    </div>
                ) : (
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Name</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Father Name</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Phone</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Address</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Desigination</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Role</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{item.name}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{item.fatherName}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{item.phone}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{item.address}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{item.designation}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{item.role}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            {/* <button className="hover:text-primary">
                                            <ImEye />
                                        </button> */}
                                            <button className="hover:text-primary" onClick={() => deleteUserHandler(item._id)}>
                                                <MdDeleteForever />
                                            </button>
                                            <Link to={`/update-employee/${item._id}`}>
                                                <button className="hover:text-primary">
                                                    <MdEdit />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TableOne;
