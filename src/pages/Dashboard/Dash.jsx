import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardDataStats from './CardDataStats';
import ChartThree from '../../Charts/ChartThree';
import ChartTwo from '../../Charts/ChartTwo';
import ChartOne from '../../Charts/ChartOne';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/addUserAction';
import { getCurrentMonthExpenses, getExpenseList } from '../../actions/financeController';
import { getCurrentMonthRevenue, getRevenueList } from '../../actions/revenue';
import CountUp from 'react-countup';
import ChatCard from '../../components/Cards/ChatCard';
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";

function Dash() {

    const [count, setCount] = useState(0);
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { loading, users } = useSelector((state) => state.allUser);
    const { totalCurrentMonthExpenses } = useSelector((state) => state.currentMonthTotal);
    const { totalCurrentMonthRevenue } = useSelector((state) => state.currentMonthRevenue);
    const { expenseList } = useSelector((state) => state.expenseList);
    const { error, revenueList } = useSelector((state) => state.revenueList);;


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getExpenseList());
        dispatch(getRevenueList());
        dispatch(getCurrentMonthExpenses())
        dispatch(getCurrentMonthRevenue())
    }, [dispatch]);


    const calculateTotalExpenses = () => {
        if (!expenseList || !Array.isArray(expenseList.expenseList)) {
            return 0;
        }

        return expenseList.expenseList.reduce((accumulator, expense) => {
            return accumulator + parseFloat(expense.amount);
        }, 0);
    };

    const calculateTotalRevenue = () => {
        if (!revenueList || !Array.isArray(revenueList.revenueList)) {
            return 0;
        }

        return revenueList.revenueList.reduce((accumulator, revenue) => {
            return accumulator + parseFloat(revenue.amount);
        }, 0);
    };


    useEffect(() => {
        const startCount = 0;
        const endCount = 123;
        const duration = 4000;
        const intervalTime = 50;
        const steps = Math.ceil(duration / intervalTime);
        const increment = Math.ceil((endCount - startCount) / steps);

        let currentCount = startCount;
        const interval = setInterval(() => {
            if (currentCount < endCount) {
                currentCount += increment;
                setCount(currentCount > endCount ? endCount : currentCount);
            } else {
                clearInterval(interval);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);


    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Total Expense" total={<CountUp end={calculateTotalExpenses()} duration={2} />}>
                    <RiMoneyPoundCircleLine className="fill-primary dark:fill-white text-xl" />
                </CardDataStats>
                <CardDataStats title="Current Month Expense" total={<CountUp end={totalCurrentMonthExpenses} duration={2} />} >
                    <RiMoneyDollarCircleLine className="fill-primary dark:fill-white text-xl" />
                </CardDataStats>
                <CardDataStats title="Total Revenue" total={<CountUp end={calculateTotalRevenue()} duration={2} />} >
                    <BiMoneyWithdraw className="fill-primary dark:fill-white text-xl" />
                </CardDataStats>
                <CardDataStats title="Current Month Revenue" total={<CountUp end={totalCurrentMonthRevenue} duration={2} />} >
                    <TbMoneybag className="text-primary dark:text-white text-xl" />
                </CardDataStats>
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne />
                <ChartTwo />
                <ChartThree />
                <ChatCard />

                {/* <div className="col-span-12 xl:col-span-8">
                <TableOne />
              </div>
              <ChatCard /> */}
            </div>
        </DefaultLayout>
    );
}

export default Dash;