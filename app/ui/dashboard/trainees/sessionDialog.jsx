import {Dialog, DialogContent, DialogContentText, DialogTitle,
    MenuItem, FormControl, Select, FormControlLabel, Checkbox} from '@mui/material';
import StarRating from './startRating';

export default function SessionDialog({open, setOpen, addSession}) {
    const today = new Date()
    const today_date = today.toISOString().split('T')[0]

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        addSession(formData)
    }

    return (
        <Dialog open={open} onClose={e => setOpen(false)} fullWidth={true}>
            <DialogTitle>{addSession? "Add Session" : "Session Details"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                <div className="min-h-full px-6 pb-10 lg:px-8">
                    <div className="mt-3 sm:mx-auto sm:w-full lg:w-full">
                        <form className="space-y-6" onSubmit={e => onSubmit(e)} method="POST">

                            {addSession ? <></>:<><div className='flex wrap items-center'>
                                <p className="text-md font-medium leading-6 text-gray-900 w-44">Trainee</p>
                                <p>{open.trainee?.fname + " " + open.trainee?.lname}</p>
                            </div>

                            <div className='flex wrap items-center'>
                                <p className="text-md font-medium leading-6 text-gray-900 w-44">Coach</p>
                                <p>{open.coach?.fname + " " + open.coach?.lname}</p>
                            </div></>}

                            <div className='flex wrap items-center'>
                                <label for="description" className="text-md font-medium leading-6 text-gray-900 w-44">Description</label>
                                {addSession ? <textarea id="description" placeholder='How was your session? What execises did you do? (optional)' name="description" type="text" rows={5} className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                                : <p>{open.description}</p>}
                            </div>

                            <div className="flex wrap items-center">
                                <label for="createdAt" className="inline-block text-md font-medium leading-6 text-gray-900 w-44">Day</label>
                                {addSession ? <input id="createdAt" name="createdAt" type="date" defaultValue={today_date} required className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                
                                :<p>{open.startDay}</p>}
                            </div>

                            <div className="flex wrap items-center">
                                <label for="hour" className="inline-block text-md font-medium leading-6 text-gray-900 w-44">Start Hour</label>
                                {addSession ? <FormControl sx={{ my: 1, minWidth: 120 }} size="small" fullWidth={true}>
                                    <Select
                                        id="demo-select-small"
                                        defaultValue="5"
                                        name="hour"
                                        fullWidth={true}
                                    >
                                        {[...Array(28).keys()].map(number => {
                                            const hr = (10 + number / 2).toFixed(1)
                                            return <MenuItem key={hr} value={hr}>{hr > 13 ? hr - 12 : hr} {hr >= 12 ? "PM":"AM"}</MenuItem>
                                        })}
                                        
                                    </Select>
                                </FormControl>
                                :<p>{open.startHour}</p>}
                            </div>

                            <div className="flex wrap items-center">
                                <label for="duration" className="inline-block w-44 text-md font-medium leading-6 text-gray-900">Duration (in hours)</label>
                                {addSession ? <input id="duration" name="duration" type="number" min={0} step={0.5} max={5} defaultValue={1} required className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                :<p>{open.duration}</p>}
                            </div>

                            <div className='flex flex-wrap'>
                                <label for="rating" className="w-44 text-md font-medium leading-6 text-gray-900">Feedback</label>
                                <StarRating name="rating" id="rating" showvalue={open.rating}/>
                            </div>

                            <div className="flex justify-center">
                                <FormControlLabel disabled={!addSession} control={<Checkbox name="private" defaultChecked={open?.private} />} label="The session is private" />
                            </div>
                            { addSession ? <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add Session</button>
                            </div> : <></>}
                        </form>
                    </div>
                </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}