import {useState} from 'react';
import { styled } from '@mui/material/styles';
import {Grid, Chip, Paper, Typography, Stack, Avatar, Button, Dialog,DialogTitle, DialogContent, DialogContentText, DialogActions, Divider} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimerIcon from '@mui/icons-material/Timer';
import Link from 'next/link';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Profile({trainee}) {
    const [openDelete, setOpenDelete] = useState(false)
    const deleteUser = () => {
        console.log(trainee.id)
    }

  return ( trainee &&
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} spacing={2} className='flex flex-col items-center py-5'>
            <Avatar
            alt="Remy Sharp"
            src={trainee.img||"/assets/images/trainee_annon.jpg"}
            sx={{ width: 160, height: 160, marginBottom:4}}
            />

            <Chip sx={{marginBottom:5}} color={trainee.status == "Valid Membership"?"success":"warning"} size="small" label={trainee.status}/>

            <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center"  alignItems="center" direction="row" useFlexGap flexWrap="wrap" className='w-full max-w-96'>
                <Button variant="outlined" component={Link} href={`${trainee.id}/id/edit`} startIcon={<EditIcon />} sx={{ flexGrow: 1 }}>
                    Edit
                </Button>
                <Button variant="outlined" color="error" onClick={e => {setOpenDelete(true)}} startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Stack>
            <Button variant="outlined" component='div' color="success" startIcon={<AttachMoneyIcon />} className='w-full max-w-96 my-6'>
                Add Payment
            </Button>
            <Button variant="outlined" component='div' color="success" startIcon={<TimerIcon />} className='w-full max-w-96'>
                Add Session
            </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Grid item xs container direction="column" spacing={2} className='ps-3'>
            <Grid item container direction="row" >
                <div className='me-20'>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        ID
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    {trainee.id}
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Name
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    {trainee.fname + ' ' + (trainee.mname?trainee.mname + " ":"") + trainee.lname}
                    </Typography>
                </div>
            </Grid>
            <Grid item>
                <Divider/>
                {trainee.email?<><Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Email    
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {trainee.email}
                </Typography><Divider/></>:<></>}
                {trainee.phone?<><Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Phone    
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {trainee.phone}
                </Typography><Divider/></>:<></>}
                {trainee.coachID?<><Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Coach    
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {trainee.coach.fname + " " + trainee.coach.lname}
                </Typography><Divider/></>:<></>}
            </Grid>
            {trainee.programID?<><Grid item container direction="row" sx={{pl:0}} >
                <div className='me-20'>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        Program
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    {trainee.program.name}
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Expiry Date
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    {trainee.membership_expiry}
                    </Typography>
                </div>
            </Grid><Divider/></>:<></>}
            <Grid item container direction="row" sx={{pl:0}} >
                <div className='me-20'>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        Member Since    
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {trainee.createdAt.toLocaleDateString('en-GB')}
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        Sessions    
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {trainee.sessions_count}
                    </Typography>
                </div>
            </Grid>
            <Divider/>
            <Grid item>
                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Due Payment    
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Paid {trainee.payment_total} out of {trainee.program.cost}
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={openDelete}
        onClose={e => setOpenDelete(false)}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
            {"Are you sure you want to delete this Person?"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
            Careful! You can not undo this. This will also delete all related data.
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={e => setOpenDelete(false)} variant="outlined">
            Cancel
        </Button>
        <Button onClick={deleteUser} variant="outlined" color="error">
            Confirm
        </Button>
        </DialogActions>
    </Dialog>
    </Paper>
  );
}