export const formControls = [
    {
        name: 'username',
        label: 'Username',
        componentType: 'text',
        placeholder: 'Enter your username',
        required: true
    },
    {
        name: 'email',
        label: 'Email',
        componentType: 'email',
        placeholder: 'Enter your email',
        required: true
    },
    {
        name: 'password',
        label: 'Password',
        componentType: 'password',
        placeholder: 'Enter your password',
        required: true,
        minLength: 6
    },
    {
        name: 'age',
        label: 'Age',
        componentType: 'number',
        placeholder: 'Enter your age',
        required: true,
        min: 1,
        max: 100
    },
    {
        name: 'dob',
        label: 'Date of Birth',
        componentType: 'date',
        required: true
    },
    {
        name: 'profilePic',
        label: 'Profile Picture',
        componentType: 'file',
        required: true,
        fileTypes: ['image/png', 'image/jpeg']
    },
    {
        name: 'gender',
        label: 'Gender',
        componentType: 'radio',
        options: [
            { id: 'male', label: 'Male' },
            { id: 'female', label: 'Female' }
        ],
        required: true
    },
    {
        name: 'hobbies',
        label: 'Hobbies',
        componentType: 'checkbox',
        options: [
            { id: 'Dance', label: 'Dance' },
            { id: 'Movie', label: 'Movie' }
        ],
        required: true
    },
    {
        name: 'country',
        label: 'Country',
        componentType: 'select',
        options: [
            { id: 'india', label: 'India' },
            { id: 'usa', label: 'USA' }
        ],
        required: true
    },
    {
        name: 'bio',
        label: 'Bio',
        componentType: 'textarea',
        placeholder: 'Tell us about yourself',
        required: true
    }
];