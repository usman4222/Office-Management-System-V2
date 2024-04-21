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


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    All Employees
                </h4>
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
                                        <button className="hover:text-primary">
                                            <ImEye />
                                        </button>
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
            </div>
        </div>
    );
};

export default TableOne;
