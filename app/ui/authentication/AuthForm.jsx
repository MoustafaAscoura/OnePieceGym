import {useState} from 'react';
import { setCookie } from 'cookies-next';
import Button from '@mui/material/Button';
import { ToggleButton, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

export default function AuthForm({open, setOpen, setUser}) {
    const [coach, setCoach] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit(formData) {
        formData.set('coach', coach)
        fetch("/api/login", {
        method: "POST",
        body: formData,
        })
        .then((response) => {
            return response.json();
        })
        .then((userData) => {
            if (userData && (userData.phone == formData.get('phone'))){
                const _user = {
                    'name' : userData.fname + " " + userData.lname,
                    'phone' : userData.phone,
                    'coach' : coach
                }
                setCookie('user_name', userData.fname + " " + userData.lname )
                setCookie('user_phone', userData.phone )
                setCookie('user_coach', coach )
                
                setUser(_user)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => setOpen(false));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
                style:{
                    width: '60vw',
                    minHeight: '100px'
                },
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                handleSubmit(formData)
            },
            }}
        >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
            <DialogContentText textAlign='end '>
                <ToggleButton
                    value="check"
                    color = "success"
                    selected={coach}
                    onChange={() => {
                        setCoach(!coach);
                    }}
                    >
                    Login as a coach
                </ToggleButton>
            </DialogContentText>
                <div className='mb-8'>
                    <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900">
                        Your Membership Id
                    </label>
                    <div className="mt-2">
                        <input
                        id="id"
                        name="id"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                    </label>
                    <div className="mt-2">
                        <input
                        id="phone"
                        name="phone"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions className='text-green-500'>
            <Button onClick={handleClose}>Cancel</Button>
            <Button  color="success" type="submit">Login</Button>
            </DialogActions>
        </Dialog>
    );
}
