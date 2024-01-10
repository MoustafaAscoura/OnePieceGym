import {Dialog, DialogContent, DialogContentText, DialogTitle,
    InputLabel, MenuItem, FormControl, Select} from '@mui/material';
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
            <DialogTitle>Add Session</DialogTitle>
            <DialogContent>
                <DialogContentText>
                <div className="min-h-full px-6 pb-10 lg:px-8">
                    <div className="mt-3 sm:mx-auto sm:w-full lg:w-full">
                        <form className="space-y-6" onSubmit={e => onSubmit(e)} method="POST">
                            <div>
                                <label for="description" className="block text-md font-medium leading-6 text-gray-900">Description</label>
                                <textarea id="description" placeholder='How was your session? What execises did you do? (optional)' name="description" type="text" rows={5} className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label for="createdAt" className="block text-md font-medium leading-6 text-gray-900">Day</label>
                                    <input id="createdAt" name="createdAt" type="date" defaultValue={today_date} required className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>

                                <div className="sm:col-span-3">
                                    <label for="hour" className="block text-md font-medium leading-6 text-gray-900">Start Hour</label>

                                    <FormControl sx={{ my: 1, minWidth: 120 }} size="small" fullWidth={true}>
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
                                </div>
                            </div>
                            <div>
                                <label for="duration" className="block text-md font-medium leading-6 text-gray-900">Duration (in hours)</label>
                                <input id="duration" name="duration" type="number" min={0} step={0.5} max={5} defaultValue={1} required className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            <div className='flex flex-wrap'>
                                <label for="rating" className="md:me-10 block text-md font-medium leading-6 text-gray-900">Feedback</label>
                                <StarRating name="rating" id="rating" />
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add Session</button>
                            </div>
                        </form>
                    </div>
                </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}