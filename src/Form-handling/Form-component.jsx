import React from 'react';

const FormComponents = ({ formcontrols, formdata, setformdata, onSubmit, buttonText, errors }) => {

    function renderbyComponents(getcontrolItems) {
        let element = null;
        const value = formdata[getcontrolItems.name] || '';

        switch (getcontrolItems.componentType) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
            case 'date':
                element = (
                    <>
                        <input className='p-2 rounded-lg border-2 border-black outline-none'
                            name={getcontrolItems.name}
                            type={getcontrolItems.componentType}
                            id={getcontrolItems.name}
                            placeholder={getcontrolItems.placeholder}
                            value={value}
                            onChange={(event) => setformdata(getcontrolItems.name, event.target.value)}
                        />
                        {errors[getcontrolItems.name] && <p className="text-red-500 text-2xl font-semibold">{errors[getcontrolItems.name]}</p>}
                    </>
                );
                break;

            case 'file':
                element = (
                    <>
                        <input className='font-semibold'
                            name={getcontrolItems.name}
                            type="file"
                            id={getcontrolItems.name}
                            onChange={(event) => {
                                const file = event.target.files[0]; // Get selected file
                                setformdata(getcontrolItems.name, file); // Update formData
                            }}
                        />
                        {formdata[getcontrolItems.name] && (
                            <p>Selected file: {formdata[getcontrolItems.name]?.name}</p>
                        )}
                        {errors[getcontrolItems.name] && <p className="text-red-500 text-2xl font-semibold">{errors[getcontrolItems.name]}</p>}
                    </>
                );
                break;

            case 'select':
                element = (
                    <>
                        <select className='font-semibold p-2 rounded-lg border-2 border-black outline-none '
                            name={getcontrolItems.name}
                            id={getcontrolItems.id}
                            value={value}
                            onChange={(event) => setformdata(getcontrolItems.name, event.target.value)}
                        >
                            <option value="">Select an option</option>
                            {getcontrolItems.options.map((optionitems) => (
                                <option key={optionitems.id} value={optionitems.id}>{optionitems.label}</option>
                            ))}
                        </select>
                        {errors[getcontrolItems.name] && <p className="text-red-500 text-2xl font-semibold">{errors[getcontrolItems.name]}</p>}
                    </>
                );
                break;

            case 'textarea':
                element = (
                    <>
                        <textarea className='font-semibold p-2 rounded-lg border-2 border-black outline-none h-[90px] '
                            name={getcontrolItems.name}
                            placeholder={getcontrolItems.placeholder}
                            id={getcontrolItems.id}
                            value={value}
                            onChange={(event) => setformdata(getcontrolItems.name, event.target.value)}
                        />
                        {errors[getcontrolItems.name] && <p className="text-red-500 text-2xl font-semibold">{errors[getcontrolItems.name]}</p>}
                    </>
                );
                break;

            case 'radio':
                element = getcontrolItems.options.map((option) => (
                    <>
                        <label key={option.id} className='font-semibold text-xl ' >
                            <input
                                type="radio"
                                name={getcontrolItems.name}
                                value={option.id}
                                checked={value === option.id}
                                onChange={(event) => setformdata(getcontrolItems.name, event.target.value)}
                            /> {option.label}
                        </label>
                        {errors[getcontrolItems.name] && <p className="text-red-500 text-2xl font-semibold">{errors[getcontrolItems.name]}</p>}
                    </>
                ));
                break;

            case 'checkbox':
                element = getcontrolItems.options.map((option) => (
                    <>
                        <label key={option.id} className='font-semibold text-xl '>
                            <input
                                type="checkbox"
                                name={getcontrolItems.name}
                                value={option.id}
                                checked={Array.isArray(value) ? value.includes(option.id) : false}
                                onChange={(event) => {
                                    const newValue = event.target.checked
                                        ? [...(value || []), option.id]
                                        : value.filter((val) => val !== option.id);

                                    setformdata(getcontrolItems.name, newValue)
                                }}
                            /> {option.label}
                        </label>
                        {errors[getcontrolItems.name] && <p className="text-red-500 text-2xl font-semibold">{errors[getcontrolItems.name]}</p>}
                    </>
                ));
                break;

            default:
                return null;
        }
        return element;
    }

    return (
        <form className='min-h-screen flex flex-col justify-center items-center gap-2' onSubmit={onSubmit}>
            <div className='min-h-screen w-[900px] bg-green-500 my-5 rounded-3xl px-10 py-7 ' >
                {formcontrols.map((controlItem) => (
                    <div  className='grid w-full gap-1.5 mb-5' key={controlItem?.name} >
                        <label  className='text-xl font-semibold text-white'>{controlItem.label}</label>
                        {renderbyComponents(controlItem)}
                    </div>
                ))}
            </div>
            <button  className='my-3 w-[200px]  bg-green-500 text-white px-4 py-2 rounded-lg' type="submit">{buttonText}</button>
        </form>
    );
};

export default FormComponents;
