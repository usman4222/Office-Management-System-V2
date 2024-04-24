import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseList } from '../actions/financeController';
import { getRevenueList } from '../actions/revenue';

const options = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo = () => {
  const { expenseList } = useSelector((state) => state.expenseList);
  const { revenueList } = useSelector((state) => state.revenueList);
  const dispatch = useDispatch();
  const [state, setState] = useState(null);

  useEffect(() => {
    dispatch(getExpenseList());
    dispatch(getRevenueList());
  }, [dispatch]);

  useEffect(() => {
    if (!expenseList || !revenueList) return;

    const getCurrentWeekData = (dataList) => {
      if (!dataList || !Array.isArray(dataList)) {
        return [];
      }
    
      const currentDate = new Date();
      const currentWeekStart = new Date(currentDate);
      currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const currentWeekEnd = new Date(currentDate);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    
      return dataList.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= currentWeekStart && itemDate <= currentWeekEnd;
      });
    };
    

    const currentWeekExpense = getCurrentWeekData(expenseList.expenseList);
    const currentWeekRevenue = getCurrentWeekData(revenueList.revenueList);

    const dailyExpense = Array.from({ length: 7 }, (_, dayIndex) => {
      const dayExpenses = currentWeekExpense.filter(expense => new Date(expense.date).getDay() === dayIndex);
      return dayExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    });

    const dailyRevenue = Array.from({ length: 7 }, (_, dayIndex) => {
      const dayRevenues = currentWeekRevenue.filter(revenue => new Date(revenue.date).getDay() === dayIndex);
      return dayRevenues.reduce((total, revenue) => total + parseFloat(revenue.amount), 0);
    });


    setState({
      series: [
        {
          name: 'Revenue',
          data: dailyRevenue,
        },
        {
          name: 'Expense',
          data: dailyExpense,
        },
      ],
      options: {
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      },
    });
  }, [expenseList, revenueList]);

  if (!state) {
    return null;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Profit this week
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
