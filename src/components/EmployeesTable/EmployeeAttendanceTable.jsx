import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getAllUsers, clearErrors } from '../../actions/addUserAction';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const EmployeeAttendanceTable = () => {


    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, users } = useSelector((state) => state.allUser);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getAllUsers(keyword));
    }, [error, dispatch, enqueueSnackbar, keyword]);


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Employees Attendance Table" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Attendance List
                    </h4>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Name</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Desigination</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Role</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Attendance</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <p className="text-black dark:text-white">{item.name}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{item.designation}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{item.role}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <Link
                                                to={`/attendance/${item._id}`}
                                                className="inline-flex items-center justify-center bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                            >
                                                Mark Attendance
                                            </Link>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <Link
                                                to={`/attendance/view/${item._id}`}
                                                className="inline-flex items-center justify-center bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                            >
                                                Attendance Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EmployeeAttendanceTable;
