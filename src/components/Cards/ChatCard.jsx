import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { MdDeleteForever } from 'react-icons/md';
import { ImEye } from 'react-icons/im';
import { clearErrors, deleteUser } from '../../actions/userAction';
import { getAllUsers } from '../../actions/addUserAction';

const ChatCard = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, users } = useSelector((state) => state.allUser);
    const { error: deleteError, isDeleted } = useSelector((state) => state.delUser);
    const [keyword, setKeyword] = useState('');
    const [showViewMore, setShowViewMore] = useState(false);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar('User deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers(keyword, 5));
    }, [enqueueSnackbar, error, dispatch, deleteError, isDeleted, keyword]);;


    const handleViewMore = () => {
        setShowViewMore(true);
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Name</th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Designation</th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Role</th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice(0, showViewMore ? users.length : 5).map((item, key) => (
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
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary">
                                            <ImEye />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!showViewMore && users.length > 5 && (
                <div className="flex justify-center mt-4">
                    <Link to="/allemployees">
                        <button className="text-primary font-medium" onClick={handleViewMore}>View More</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ChatCard;
