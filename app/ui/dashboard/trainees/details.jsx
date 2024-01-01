import {useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Profile from './profile';

export default function TraineeDetails({detailTrainee, setDetailTrainee}) {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (detailTrainee) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [detailTrainee]);

  return (
      <Dialog
        open={detailTrainee}
        onClose={e => setDetailTrainee(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle id="scroll-dialog-title">Details</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Profile trainee={detailTrainee}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' onClick={e => setDetailTrainee(false)}>Close</Button>
        </DialogActions>
      </Dialog>
  );
}
