import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAttendance } from '../../actions/attendanceAction';
import { getUserDetails } from '../../actions/updateUser';
import ChartThree from '../../Charts/ChartThree';
import AttendanceGraph from '../../Charts/AttendanceGraph';

const AttendanceDetailsTable = () => {

    const { loading, user } = useSelector((state) => state.getUser);
    const { userAttendance } = useSelector((state) => state.userAttendance);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [attendanceDetails, setAttendanceDetails] = useState([0]);

    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);


    const userId = user ? user._id : '';

    useEffect(() => {
        if (userId) {
            dispatch(getUserAttendance(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
            localStorage.setItem('userAttendance', JSON.stringify(userAttendance.userAttendance));
        }
    }, [userAttendance]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
        }
    }, [userAttendance]);


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Attendance Table" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        {user.name}'s Attendance Details
                    </h4>
                    <div className="max-w-full  overflow-x-auto lg:overflow-x-hidden">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Present</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Absent</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Leave</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Total Days</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Present Percentage</th>
                                    {/* <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">List</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <p className="text-black dark:text-white">{userAttendance.presentCount}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{userAttendance.absentCount}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{userAttendance.leaveCount}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{userAttendance.totalEntries}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{userAttendance.presentPercentage}%</p>
                                        </td>
                                        {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <Link
                                                to={`/searchattendance/${user._id}`}
                                                className="inline-flex items-center justify-center bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                            >
                                                Attendance List
                                            </Link>
                                        </td> */}
                                    </tr>
                            </tbody>
                        </table>
                        <AttendanceGraph />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AttendanceDetailsTable;
