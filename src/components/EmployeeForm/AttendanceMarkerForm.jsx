
import { useDispatch, useSelector } from 'react-redux';
import TableOne from '../../Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { getUserDetails } from '../../actions/updateUser';
import { clearErrors } from '../../actions/userAction';
import { UPDATE_USER_RESET } from '../../constants/updateUser';
import { updateUserCon } from '../../actions/attendanceAction';
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

const AttendanceMarkerForm = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { error: updateError, isUpdated } = useSelector((state) => state.editUser)
    const { user, loading } = useSelector((state) => state.getUser)
    const [date, setDate] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const [status, setStatus] = useState("");

    const [selectedOption, setSelectedOption] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const roleCategories = [
        "Present",
        "Absent",
        "Leave",
    ]


    const userId = id;

    useEffect(() => {
        if (user && user._id === userId) {
            setDate(user.date)
            setStatus(user.status)
        } else {
            dispatch(getUserDetails(userId))
        }

        if (updateError) {
            enqueueSnackbar(updateError, { variant: 'error' });
            dispatch(clearErrors())
        }
        if (isUpdated) {
            enqueueSnackbar("Attendance Mark Successfully", { variant: 'success' });
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, enqueueSnackbar, navigate, updateError, isUpdated, userId, user])


    // useEffect(() => {
    //     flatpickr('.form-datepicker', {
    //         mode: 'single',
    //         static: true,
    //         monthSelectorType: 'static',
    //         dateFormat: 'M j, Y',
    //         prevArrow:
    //             '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    //         nextArrow:
    //             '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    //     });


    // }, []);


    const updateUserHandler = (e, id) => {
        e.preventDefault();
        if (!status || status.trim() === '') {
            console.log('Status is empty or missing.');
            return;
        }
        dispatch(updateUserCon(id, { status, date }));
    }


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Employee Attendance" />
            <div className=" flex justify-center items-center ">
                <div className="flex flex-col ">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-20 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Date and Status
                            </h3>
                        </div>
                        <form
                            encType='multipart/form-data'
                            onSubmit={(e) => updateUserHandler(e, userId)}
                        >
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
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
                                            className={`relative z-20 w-full appearance-none rounded border hover:cursor-pointer border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Status</label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input ">
                                        <select
                                            onChange={(e) => {
                                                setSelectedOption(e.target.value);
                                                changeTextColor();
                                                setStatus(e.target.value)
                                            }}
                                            className={`relative z-20 w-full appearance-none rounded border hover:cursor-pointer border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                }`}
                                        >
                                            <option value="">Choose Status</option>
                                            {roleCategories.map((cate) => (
                                                <option key={cate} value={cate}>
                                                    {cate}
                                                </option>
                                            ))}
                                        </select>

                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <svg
                                                className="fill-current"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill=""
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Mark
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AttendanceMarkerForm;