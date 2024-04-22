import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addNewRevenue } from '../../actions/revenue'

const AddRevenueForm = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [ref, setRef] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const isValidAmount = (amount) => {
        return !isNaN(parseFloat(amount)) && isFinite(amount);
    };

    const addRevenueHandler = async (e) => {
        e.preventDefault();

        if (!isValidAmount(amount)) {
            enqueueSnackbar('Please enter a valid amount', { variant: 'error' });
            return;
        }

        try {
            const revenueData = {
                ref: ref,
                amount: amount,
                description: description,
                date: date,
            };

            await dispatch(addNewRevenue(revenueData));
            enqueueSnackbar('Revenue added Successfully', { variant: 'success' });
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add New Revenue" />

            <div className=" flex justify-center items-center ">
                <div className="flex flex-col ">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Revenue Form
                            </h3>
                        </div>
                        <form
                            encType='multipart/form-data'
                            onSubmit={addRevenueHandler}
                        >
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Reference
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Enter your Reference'
                                            required
                                            value={ref}
                                            onChange={(e) => setRef(e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Amount
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Enter your Amount'
                                            required
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Date picker
                                    </label>
                                    <div className="relative">
                                        <input
                                            type='date'
                                            placeholder='mm/dd/yyyy'
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className={`relative z-20 w-full appearance-none rounded border hover:cursor-pointer border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                                        />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        rows={6}
                                        type='text'
                                        placeholder='Enter your Description'
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                                </div>
                                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddRevenueForm;

