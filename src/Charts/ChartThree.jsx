import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const options = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#6577F3', '#8FD0EF'],
  labels: ["Intern's", 'Employees'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = () => {
  const { loading, users } = useSelector((state) => state.allUser);
  const internCount = users.filter(user => user.role === 'Intern').length;
  const employeeCount = users.filter(user => user.role === 'Employee').length;
  const totalMembers = users.length;
  const [state, setState] = useState({
    series: [internCount, employeeCount]
  });

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
  }, [internCount, employeeCount, totalMembers, state.series]);

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [internCount, employeeCount]
    }));
  };


  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Employees Analytics
          </h5>
        </div>
        
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Total Employees </span>
              <span> {employeeCount} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Total Intern's </span>
              <span> {internCount} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Total Members </span>
              <span> {totalMembers} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            {/* <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span> */}
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              {/* <span> Total Members </span>
              <span> {totalMembers} </span> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
