import {Dialog, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export default function PaymentDialog({open, setOpen, addPayment}) {
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        addPayment(formData)
    }

    return (
        <Dialog open={open} onClose={e => setOpen(false)} fullWidth={true}>
            <DialogTitle>Add Payment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                <div className="min-h-full px-6 pb-10 lg:px-8">
                    <div className="mt-3 sm:mx-auto sm:w-full">
                        <form className="space-y-6" onSubmit={e => onSubmit(e)} method="POST">
                            <div>
                                <label for="amount" className="block text-md font-medium leading-6 text-gray-900">Amount</label>
                                <input id="amount" name="amount" type="number" min={0} required className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add Payment</button>
                            </div>
                        </form>
                    </div>
                </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}