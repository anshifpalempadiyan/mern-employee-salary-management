import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout';


const AddOvertime = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ userId: '', date: '', hours: '', reason: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employees to populate the dropdown
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users'); // Ensure this matches your route
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const validate = () => {
        if (!formData.userId || !formData.date || !formData.hours || !formData.reason) return "All fields are required";
        if (formData.hours < 1 || formData.hours > 6) return "Hours must be between 1 and 6";
        if (formData.reason.length < 10) return "Reason must be at least 10 characters";

        const entryDate = new Date(formData.date);
        const today = new Date();
        const diffDays = (today - entryDate) / (1000 * 60 * 60 * 24);

        if (entryDate > today) return "Date cannot be in the future";
        if (diffDays > 7) return "Cannot log entries older than 7 days";

        return null; // Return null if validation passes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        // Perform Frontend Validation
        const validationError = validate();
        if (validationError) {
            setError(validationError); // Show the UI error immediately
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/overtime', formData);
            alert("Overtime saved successfully!");
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.msg || "Error saving overtime");
        }
    };
    return (
        <Layout>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add Overtime Entry
                    </h3>
                </div>

                {/* Error Banner */}
                {error && (
                <div 
                    className="mx-6.5 mt-4 flex items-center justify-between rounded-md px-4 py-3 border"
                    style={{ backgroundColor: '#f8d7da', color: '#842029', borderColor: '#f5c2c7' }}
                >
                    <p className="font-bold">{error}</p>
                </div>
            )}

                <form onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Employee
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            >
                                <option value="" className="text-body dark:text-bodydark">Select an employee...</option>
                                {employees.map(emp => (
                                    <option key={emp.id_pegawai} value={emp.id_pegawai} className="text-body dark:text-bodydark">
                                        {emp.nama_pegawai}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Date
                        </label>
                        <input
                            type="date"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Hours (1-6)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter overtime hours"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Reason
                        </label>
                        <textarea
                            rows={6}
                            placeholder="Why was overtime required?"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        style={{ backgroundColor: '#3c50e0', color: 'white' }}
                    >
                        Submit Overtime
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddOvertime;