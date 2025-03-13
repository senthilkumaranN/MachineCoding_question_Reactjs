import React, { useState } from 'react';
import FormComponents from './Form-component';
import { formControls } from './data';

const FormHandling = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Validate a single field
    const validateField = (name, value) => {
        let errorMsg = '';

        const control = formControls.find(item => item.name === name);
        if (!control) return '';

        if (control.required && (!value || value === '')) {
            errorMsg = `${control.label} is required`;
        } else if (control.componentType === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorMsg = 'Invalid email format';
            }
        } else if (control.componentType === 'password' && value.length < control.minLength) {
            errorMsg = `Password must be at least ${control.minLength} characters`;
        } else if (control.componentType === 'number' && (value < control.min || value > control.max)) {
            errorMsg = `Value must be between ${control.min} and ${control.max}`;
        }

        return errorMsg;
    };

    // Validate entire form before submission
    const validateForm = () => {
        let newErrors = {};
        formControls.forEach(control => {
            const value = formData[control.name] || '';
            const errorMsg = validateField(control.name, value);
            if (errorMsg) {
                newErrors[control.name] = errorMsg;
            }
        });

        setErrors(newErrors); // Update state with new errors

        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value instanceof File ? value : value // Store file object properly
        }));

        // Remove error when a valid file is selected
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (value instanceof File) {
                delete updatedErrors[name]; // Remove file error when a valid file is selected
            } else {
                updatedErrors[name] = validateField(name, value);
            }
            return updatedErrors;
        });
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log('Form submitted successfully:', formData);
            setFormData({})
            setErrors({})
        } else {
            console.log('Form has errors, submission blocked.');
        }
    };

    return (
        <div className='bg-slate-50'>
            <h2 className='text-center font-bold text-2xl'>Dynamic Form</h2>
            <FormComponents
                formcontrols={formControls}
                formdata={formData}
                setformdata={handleInputChange}
                onSubmit={handleSubmit}
                buttonText="Submit"
                errors={errors}
            />
        </div>
    );
};

export default FormHandling;
