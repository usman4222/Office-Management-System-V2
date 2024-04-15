import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchAttendance } from '../../actions/attendanceAction';
import { getUserDetails } from '../../actions/updateUser';
import FilterAttendanceChart from '../../Charts/FilterAttendanceChart';
import { useSnackbar } from 'notistack';
import FilteredTable from './FilteredTable';

const AttendanceSearchTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, userAttendance } = useSelector((state) => state.filterAttendance);
    const { loading, user } = useSelector((state) => state.getUser);
    const { id } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);

    const handleSearch = () => {
        const storedUserId = localStorage.getItem('selectedUserId');
        if (startDate && endDate) {
            dispatch(getSearchAttendance(user._id, startDate, endDate));
        } else {
            enqueueSnackbar('Please Enter Both Start and End Dates for the Search.', { variant: 'warning' });
        }
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
    }, [error, dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Employees Attendance Table" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full  overflow-x-auto lg:overflow-x-hidden">
                        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                            Search Attendance
                        </h4>
                        <div className=" flex justify-center items-center pb-10">
                            <div className="flex flex-col ">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            From-To
                                        </h3>
                                    </div>

                                    <div className="flex flex-col gap-5.5 p-6.5">
                                        <div className='flex gap-5 md:flex-row flex-col'>
                                            <div className="relative">
                                                <input
                                                    type='date'
                                                    placeholder="Start Date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    className={`relative z-20 w-full appearance-none rounded border hover:cursor-pointer border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                        }`}
                                                />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type='date'
                                                    placeholder="End Date"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                    className={`relative z-20 w-full appearance-none rounded border hover:cursor-pointer border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <button type='submit' value='Search' onClick={handleSearch} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white pt-5">
                            Search Result
                        </h4>
                        {userAttendance.length > 0 ? (
                            <div className="max-w-full overflow-x-auto pb-10">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
                                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userAttendance.map((detail, index) => (
                                            <tr key={index}>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <p className="text-black dark:text-white"> {formatDate(detail.date)}</p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">{detail.status}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9 ">
                                <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                                    <svg
                                        width="19"
                                        height="16"
                                        viewBox="0 0 19 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                                            fill="#FBBF24"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="w-full">
                                    <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                                        There is no attendance data available at the moment.
                                    </h5>
                                    <p className="leading-relaxed text-[#D0915C]">
                                        Please provide both the start and end dates to search for attendance data.
                                    </p>
                                </div>
                            </div>
                        )}
                        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white pt-5">
                            Graph Analytics
                        </h4>
                        <FilteredTable />
                        <FilterAttendanceChart />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AttendanceSearchTable;