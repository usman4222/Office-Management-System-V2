import { Link, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { addNewUser, clearErrors } from '../../actions/addUserAction';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_RESET } from '../../constants/addUserContant';
import { useSnackbar } from 'notistack';

const AddEmployee = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [role, setRole] = useState("");
    const [designation, setDesignation] = useState("");
    const { loading, error, success } = useSelector((state) => state.newUser)

    const roleCategories = [
        "Employee",
        "Intern"
    ]

    const skillCategories = [
        "Web Deveploper",
        "Mobile App Developer",
        "WorldPress Developer",
        "SEO",
        "HR Manager",
        "Project Manager",
        "Video Editor",
        "Content Writer",
        "Digital Marketer"
    ]

    const addUserHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("fatherName", fatherName);
        myForm.set("address", address);
        myForm.set("phone", phone);
        myForm.set("role", role);
        myForm.set("designation", designation);
        dispatch(addNewUser(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error)
            enqueueSnackbar(error, { variant: 'success' });
            dispatch(clearErrors())
        }
        if (success) {
            enqueueSnackbar('User created Successfully', { variant: 'success' });
            dispatch({ type: ADD_USER_RESET })
        }
    }, [dispatch, error, success])

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };



    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add New Employee" />

            <div className=" flex justify-center items-center ">
                <div className="flex flex-col ">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Contact Form
                            </h3>
                        </div>
                        <form
                            encType='multipart/form-data'
                            onSubmit={addUserHandler}
                        >
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your Name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Father Name
                                        </label>
                                        <input
                                            type='text'
                                            required
                                            value={fatherName}
                                            onChange={(e) => setFatherName(e.target.value)}
                                            placeholder="Enter your Father Name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Address
                                    </label>
                                    <input
                                        type='text'
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your Address"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Phone No.
                                    </label>
                                    <input
                                        type='text'
                                        pattern='[0-9]*'
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your Phone No."
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Role</label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select
                                            onChange={(e) => {
                                                setSelectedOption(e.target.value);
                                                changeTextColor();
                                                setRole(e.target.value)
                                            }}
                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                }`}
                                        >
                                            <option value="">Choose Role</option>
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
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Desigination</label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select
                                            onChange={(e) => {
                                                setSelectedOption(e.target.value);
                                                changeTextColor();
                                                setDesignation(e.target.value)
                                            }}
                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                }`}
                                        >
                                            <option value="">Choose Desigination</option>
                                            {skillCategories.map((cate) => (
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

export default AddEmployee;
