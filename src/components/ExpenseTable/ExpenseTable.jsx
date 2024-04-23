import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { getUserAttendance } from '../../actions/attendanceAction';
import { FaSearch } from "react-icons/fa";
import { getExpenseList } from '../../actions/financeController';
import { useSnackbar } from 'notistack';

const ExpenseTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, expenseList, loading } = useSelector((state) => state.expenseList);


    useEffect(() => {
        if (error) {
            console.error("Error:", error);
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getExpenseList());
    }, [error, dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Expense Table" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className='flex md:justify-between  md:flex-row flex-col'>
                        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Current Month Expenses List
                        </h4>
                        <h4 className="md:text-xl text-lg mb-5 md:mb-0  flex justify-start md:pb-5 font-semibold text-black dark:text-white">
                            <Link
                                to={"/searchexpense"}
                                className="inline-flex items-center justify-center gap-3  md:px-10 text-center font-medium text-black hover:underline lg:px-8 xl:px-10 dark:text-white"
                            >
                                <FaSearch />   Search Expense
                            </Link>
                        </h4>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Title</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Reference</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Amount</th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenseList && Array.isArray(expenseList.expenseList) && expenseList.expenseList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <p className="text-black dark:text-white">{item.title}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{item.ref}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{formatDate(item.date)}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{item.amount}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{item.description}</p>
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

export default ExpenseTable;