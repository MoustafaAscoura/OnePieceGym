import { useEffect, useRef, useState, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  TextField,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerIcon from "@mui/icons-material/Timer";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PaymentDialog from "@/app/ui/dashboard/trainees/paymentDialog";
import SessionDialog from "@/app/ui/dashboard/trainees/sessionDialog";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function TraineeDetails({
  detailTrainee,
  setDetailTrainee,
  serialize_trainee,
  traineesData,
  setTraineesData
}) {
  const descriptionElementRef = useRef(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [sessionOpen, setSessionOpen] = useState(false)
  const [mode, setMode] = useState("show"); //show, edit, or create

  useEffect(()=>{
    if (Object.keys(detailTrainee).length === 0) {
      setMode("create")
    } else {
      setMode("show")
    }
  },[detailTrainee])

  const handleChange = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    let formErrors_ = { ...formErrors };

    switch (name) {
      case "fname":
      case "lname":
      case "mname":
        if (/^[a-z]{3,}$/i.test(val)) {
          delete formErrors_[name];
        } else {
          if ((name === "mname") & (val === "")) {
            delete formErrors_[name];
          } else {
            formErrors_[name] = "Please enter valid names";
          }
        }
        break;
      case "email":
        if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val)) {
          delete formErrors_["email"];
        } else {
          formErrors_["email"] = "Please enter valid email";
        }
        break;
      case "phone":
        if (/^01[0125]{1}[0-9]{8}$/i.test(val) || val == "") {
          delete formErrors_["phone"];
        } else {
          formErrors_["phone"] = "Phone must be in Egyptian format";
        }
        break;
      default:
        break;
    }
    setFormErrors(formErrors_);
  };

  const toggleEdit = (event) => {
    if (mode === "show") {
      setMode("edit");
    } else {
      setLoading(true);
      const formData = new FormData(event.target.form);
      if (mode === "edit") {
        formData.set("id", detailTrainee.id);
        if (formData.get("programID") != detailTrainee.programID) {
          const today = new Date();
          formData.set("subscription_start", today.toISOString());
        } else {
          formData.set("subscription_start", detailTrainee.subscription_start);
        }
      }
      handleSubmit(formData);
    }
  };

  async function handleSubmit(formData) {

    fetch("/api/trainees", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const serialized_trainee = serialize_trainee({ ...detailTrainee, ...jsonResponse })
        setDetailTrainee( serialized_trainee );
        if (!formData.get('id')){setTraineesData([...traineesData,serialized_trainee])}
        setMode("show");
      })
      .catch((err) => {
        if (err.name === "PrismaClientKnownRequestError") {
          setError("Invalid Relative Field - Coach or Program incorrect");
        } else {
          setError("Fields missing");
        }
      })
      .finally(() => setLoading(false));
  }

  const deleteUser = () => {
    setLoading(true);
    fetch("/api/trainees", {
      method: "DELETE",
      body: JSON.stringify({ id: detailTrainee.id }),
    })
      .then((response) => {
        setOpenDelete(false);
        setTraineesData(traineesData.filter(trainee => trainee.id != detailTrainee.id))
        setDetailTrainee(false);
      })
      .catch((err) => {
        setError("Error Happened! Try Again");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (detailTrainee) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [detailTrainee]);

  const addPayment = (formData) => {
    let createdAt = new Date()
    formData.set("createdAt", createdAt.toISOString());
    formData.set("amount", parseInt(formData.get('amount')));
    formData.set('id', detailTrainee.id)

    if ( detailTrainee.status === "Membership Expired") {
        formData.set('renew', detailTrainee.status === "Membership Expired")
    }

    fetch("/api/payments", {
        method: "POST",
        body: formData,
      }).then(response => response.json())
        .then(jsonResponse => {
          const d_ = formData.get('renew') ? { ...detailTrainee, ...jsonResponse }
          : {...detailTrainee, payments: [...detailTrainee.payments, jsonResponse]}

          setDetailTrainee(serialize_trainee(d_))
          setPaymentOpen(false);
        })
        .catch((err) => {setError("Something went wrong!");});
    }
  
  const addSession = (formData) => {
    let createdAt = new Date(formData.get('createdAt'))
    formData.set("createdAt", createdAt.toISOString());
    formData.set('id', detailTrainee.id)
    formData.set('coachID', detailTrainee.coachID)

    fetch("/api/sessions", {
        method: "POST",
        body: formData,
      }).then(response => response.json())
        .then(jsonResponse => {
          setDetailTrainee(serialize_trainee({...detailTrainee, sessions: [...detailTrainee.sessions, jsonResponse]}))
          setSessionOpen(false);
        })
        .catch((err) => {setError("Something went wrong!");});
    }

  return (
    <Dialog
      open={detailTrainee}
      onClose={(e) => setDetailTrainee(false)}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">Details</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {detailTrainee?
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1, backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',}}>

              <Grid container spacing={2} component='form' onChange={e => handleChange(e)} onSubmit={e => handleSubmit(e)}>
                <Grid item xs={12} sm={12} md={4} spacing={2} className='flex flex-col items-center py-5'>
                    <Avatar
                    alt="Remy Sharp"
                    src={detailTrainee.img||"/assets/images/trainee_annon.jpg"}
                    sx={{ width: 160, height: 160, marginBottom:4}}
                    />

                    {mode === "create" ? 
                    <Button variant="outlined" onClick={e => toggleEdit(e)} 
                    startIcon={loading?<></>:<EditIcon />}>
                        {loading? <CircularProgress sx={{mr:2}} size={20}/>:<></>}{loading?"Saving...":"Save"}
                    </Button>
                    : <>
                    <Chip sx={{marginBottom:5}} color={detailTrainee.status == "Valid Membership"?"success":"warning"} size="small" label={detailTrainee.status}/>

                    <Stack spacing={1} justifyContent="center"  alignItems="center" direction="row" useFlexGap flexWrap="wrap" className='w-full max-w-80'>
                        <Button variant="outlined" onClick={e => toggleEdit(e)} 
                        startIcon={loading?<></>:<EditIcon />} sx={{ flexGrow: 1 }}>
                            {loading? <CircularProgress sx={{mr:2}} size={20}/>:<></>}{mode=="edit"?loading?"Saving...":"Save":"Edit"}
                        </Button>
                        <Button variant="outlined" color="error" onClick={e => {setOpenDelete(true)}} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Stack>
                    <Button variant="outlined" onClick={e => setPaymentOpen(true)} component='div' color="success" startIcon={<AttachMoneyIcon />} className='w-full max-w-96 my-6'>
                        Add Payment
                    </Button>
                    <Button variant="outlined" onClick={e => setSessionOpen(true)} component='div' color="success" startIcon={<TimerIcon />} className='w-full max-w-96'>
                        Add Session
                    </Button>
                    </>}
                </Grid>

                <Grid item xs={12} sm={12} md={8} >
                  <Grid item xs container direction="column" spacing={2} className='ps-3' >
                    <Grid item container direction="row" spacing={2} alignItems="center">
                        {mode === "create"?<></>:<><Grid item xs={2}>
                            <Typography gutterBottom variant="subtitle1" color="text.secondary">
                                ID
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                            {detailTrainee.id}
                            </Typography>
                        </Grid></>}
                        <Grid item xs={10}  >
                            <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Name </Typography>
                            {mode == "show"?<>
                            <Typography variant="h5" gutterBottom>
                            {detailTrainee.fname + ' ' + (detailTrainee.mname?detailTrainee.mname + " ":"") + detailTrainee.lname}
                            </Typography></>:
                            <div className='inline-flex'>
                                <TextField required error={formErrors.fname} name="fname" label="First Name" 
                                    defaultValue={detailTrainee?.fname} variant="standard" helperText={formErrors.fname || ""}/>
                                <TextField  error={formErrors.mname} name="mname" label="Middle Name" className='mx-3'
                                    defaultValue={detailTrainee?.mname} variant="standard" helperText={formErrors.mname || ""}/>
                                <TextField required error={formErrors.lname} name="lname" label="Last Name"
                                    defaultValue={detailTrainee?.lname} variant="standard" helperText={formErrors.lname || ""}/>
                            </div>}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider/>
                        {mode==="show"? detailTrainee.email?<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Email    
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {detailTrainee.email}
                        </Typography>
                        <Divider/>
                        </>:<></>:<>
                        <Typography variant="subtitle1" color="text.secondary">
                            Email    
                        </Typography>
                        <TextField sx={{mb:2, mt:0}} error={formErrors.email} name="email" fullWidth
                        defaultValue={detailTrainee.email} variant="standard" margin="normal" helperText={formErrors.email || ""}/><Divider/></>}

                        {mode==="show"? detailTrainee.phone?<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Phone    
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {detailTrainee.phone}
                        </Typography>
                        <Divider/>
                        </>:<></>:<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Phone    
                        </Typography>
                        <TextField error={formErrors.phone} sx={{mb:2, mt:0}} name="phone" fullWidth required
                        defaultValue={detailTrainee.phone} variant="standard" margin="normal" helperText={formErrors.phone || ""}/><Divider/></>}

                        {mode==="show"? detailTrainee.coachID?<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Coach Name
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {detailTrainee.coach.fname + " " + detailTrainee.coach.lname}
                        </Typography>
                        <Divider/>
                        </>:<></>:<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Coach ID
                        </Typography>
                        <TextField name="coachID" fullWidth sx={{mb:2, mt:0}} required
                        type="number" defaultValue={detailTrainee.coachID} variant="standard" margin="normal"/><Divider/></>}

                    </Grid>
                    {mode=="show"?<><Grid item container direction="row" >
                        <div className='me-20'>
                            <Typography gutterBottom variant="subtitle1" color="text.secondary">
                                Program
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                            {detailTrainee.program?.name}
                            </Typography>
                        </div>
                        <div>
                            <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Expiry Date
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                            {detailTrainee.membership_expiry}
                            </Typography>
                        </div>
                    </Grid><Divider/></>:
                    <Grid item container direction="column" >
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Program ID
                        </Typography>
                        <TextField name="programID" fullWidth sx={{mb:2, mt:0}} required
                        type="number" defaultValue={detailTrainee.programID} variant="standard" margin="normal"/>
                        <Divider/>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Birthdate
                        </Typography>
                        <input id="birthdate" name="birthdate" type="date" defaultValue={detailTrainee.birthdate?.toISOString().split('T')[0]} required class="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        <Divider/>
                        </Grid>}

                    {mode === "create"?<></>:<>
                      <Grid item container direction="row" sx={{pl:0}} >
                          <div className='me-20'>
                              <Typography gutterBottom variant="subtitle1" color="text.secondary">
                                  Member Since    
                              </Typography>
                              <Typography variant="h5" gutterBottom>
                                  {detailTrainee.createdAt?.toLocaleDateString('en-GB')}
                              </Typography>
                          </div>
                          <div>
                              <Typography gutterBottom variant="subtitle1" color="text.secondary">
                                  Sessions    
                              </Typography>
                              <Typography variant="h5" gutterBottom>
                                  {detailTrainee.sessions_count}
                              </Typography>
                          </div>
                      </Grid>
                      <Divider/>
                      <Grid item>
                          <Typography gutterBottom variant="subtitle1" color="text.secondary">
                              Due Payment    
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                              Paid {detailTrainee.payment_total} out of {detailTrainee.program?.cost}
                          </Typography>
                      </Grid>
                    </>}
                  </Grid>
                </Grid>
              </Grid>

              {mode === "create" ? <></>:<>
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
                <PaymentDialog open={paymentOpen} setOpen={setPaymentOpen} addPayment={addPayment}/>
                <SessionDialog open={sessionOpen} setOpen={setSessionOpen} addSession={addSession}/>
              </>}

              <Snackbar open={error} autoHideDuration={6000} onClose={e=>setError(false)}>
                  <Alert onClose={e=>setError(false)} severity="error" sx={{ width: '100%' }}>
                      {error}
                  </Alert>
              </Snackbar>


          </Paper>
          :<></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={(e) => setDetailTrainee(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}