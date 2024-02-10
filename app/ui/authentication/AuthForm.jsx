import {useEffect, useState} from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


export default function AuthForm({open, setOpen, setUser}) {
    const [status, setStatus] = useState(0)
    const router = useRouter()

    useEffect(()=> setStatus(0),[])
    
    const handleClose = () => setOpen(false)

    async function handleSubmit(formData) {
        setStatus(1)
        fetch("/api/login", {method: "POST",body: formData,})
        .then((response) => response.json())
        .then((userData) => {
            setStatus(2)
            setTimeout(()=>setStatus(0),3000)
            if (userData.coach) {
                setCookie('coach',process.env.ADMIN_PASSWORD, {maxAge: 21600})
                router.push('/dashboard')
            } else {
                setUser(userData)
            }
        })
        .catch((error) => {
            console.log(error)
            setStatus(-1)
            setTimeout(()=>setStatus(0),3000)
        })

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
            <DialogContentText>
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
            </DialogContentText>

            </DialogContent>
            <DialogActions className='text-green-500'>
                <Button onClick={handleClose}>Cancel</Button>
                <Button  color={status==-1?"error":"success"} type="submit" disabled={status==1}>
                    {status==0?"Login"
                    :status==1?"Loading..." 
                    :status==2?"Redirecting..."
                    :"Wrong ID and Phone"}
                </Button>
                
            </DialogActions>
        </Dialog>
    );
}
