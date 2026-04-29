import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddOvertime = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ userId: '', date: '', hours: '', reason: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employees to populate the dropdown
        const fetchEmployees = async () => {
            const response = await axios.get('http://localhost:5000/api/users'); // Update endpoint if needed
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);
}