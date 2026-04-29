import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../../layout'; 

const DataLembur = () => {
    const [overtimes, setOvertimes] = useState([]);

    useEffect(() => {
        const getOvertimes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/overtime');
                setOvertimes(response.data);
            } catch (error) {
                console.error("Error fetching overtime data:", error);
            }
        };
        getOvertimes();
    }, []);

    return (
        <Layout>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Employee Overtime Data
                    </h4>
                    <Link
                        to="/add-overtime"
                        className="inline-flex items-center justify-center rounded bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
                        style={{ backgroundColor: '#3c50e0' }}
                    >
                        Add Overtime
                    </Link>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">No.</th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Employee ID</th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Hours</th>
                                <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {overtimes.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{index + 1}</td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark font-medium">
                                        {item.userId}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {/* Formats the date to a readable English standard */}
                                        {new Date(item.date).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{item.hours} Hrs</td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{item.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {overtimes.length === 0 && (
                        <div className="text-center py-5 text-gray-500">No overtime data available.</div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DataLembur;