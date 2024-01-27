import { useEffect, useRef, useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
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
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToCoachesList, editCoach, removeFromCoachesList } from "@/app/lib/store/slices/coachesSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CoachDetails({
  detailCoach,
  setDetailCoach,
  serialize_coach
}) {
  const descriptionElementRef = useRef(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("show"); //show, edit, or create
  const dispatch = useDispatch()

  useEffect(()=>{
    if (Object.keys(detailCoach).length === 0) {
      setMode("create")
    } else {
      setMode("show")
    }
  },[detailCoach])

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
        formData.set("id", detailCoach.id);
      }
      handleSubmit(formData);
    }
  };

  async function handleSubmit(formData) {

    fetch("/api/coaches", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const serialized_coach = serialize_coach({ ...detailCoach, ...jsonResponse })
        setDetailCoach( serialized_coach );
        if (!formData.get('id')){
          dispatch(addToCoachesList(serialized_coach))
        } else {
          dispatch(editCoach(serialized_coach))
        }
        setMode("show");
      })
      .catch((err) => {
        console.log(err)
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
    fetch("/api/coaches", {
      method: "DELETE",
      body: JSON.stringify({ id: detailCoach.id }),
    })
      .then((response) => {
        setOpenDelete(false);
        dispatch(removeFromCoachesList(detailCoach.id))
        setDetailCoach(false);
      })
      .catch((err) => {
        setError("Error Happened! Try Again");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (detailCoach) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [detailCoach]);


  return (
    <Dialog
      open={detailCoach}
      onClose={() => setDetailCoach(false)}
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
          {detailCoach?
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1, backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',}}>

              <Grid container spacing={2} component='form' onChange={e => handleChange(e)} onSubmit={e => handleSubmit(e)}>
                <Grid item xs={12} sm={12} md={4} spacing={2} className='flex flex-col items-center py-5'>
                    <Avatar
                    alt="Remy Sharp"
                    src={detailCoach.img||"/assets/images/coach_annon.jpg"}
                    sx={{ width: 160, height: 160, marginBottom:4}}
                    />

                    {mode === "create" ? 
                    <Button variant="outlined" onClick={e => toggleEdit(e)} 
                    startIcon={loading?<></>:<EditIcon />}>
                        {loading? <CircularProgress sx={{mr:2}} size={20}/>:<></>}{loading?"Saving...":"Save"}
                    </Button>
                    : <>

                    <Stack spacing={1} justifyContent="center"  alignItems="center" direction="row" useFlexGap flexWrap="wrap" className='w-full max-w-80'>
                        <Button variant="outlined" onClick={e => toggleEdit(e)} 
                        startIcon={loading?<></>:<EditIcon />} sx={{ flexGrow: 1 }}>
                            {loading? <CircularProgress sx={{mr:2}} size={20}/>:<></>}{mode=="edit"?loading?"Saving...":"Save":"Edit"}
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => {setOpenDelete(true)}} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Stack>
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
                            {detailCoach.id}
                            </Typography>
                        </Grid></>}
                        <Grid item xs={10}  >
                            <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Name </Typography>
                            {mode == "show"?<>
                            <Typography variant="h5" gutterBottom>
                            {detailCoach.name}
                            </Typography></>:
                            <div className='inline-flex'>
                                <TextField required error={formErrors.fname} name="fname" label="First Name" 
                                    defaultValue={detailCoach?.fname} variant="standard" helperText={formErrors.fname || ""}/>
                                <TextField  error={formErrors.mname} name="mname" label="Middle Name" className='mx-3'
                                    defaultValue={detailCoach?.mname} variant="standard" helperText={formErrors.mname || ""}/>
                                <TextField required error={formErrors.lname} name="lname" label="Last Name"
                                    defaultValue={detailCoach?.lname} variant="standard" helperText={formErrors.lname || ""}/>
                            </div>}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider/>
                        {mode==="show"? detailCoach.email?<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Email    
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {detailCoach.email}
                        </Typography>
                        <Divider/>
                        </>:<></>:<>
                        <Typography variant="subtitle1" color="text.secondary">
                            Email    
                        </Typography>
                        <TextField sx={{mb:2, mt:0}} error={formErrors.email} name="email" fullWidth
                        defaultValue={detailCoach.email} variant="standard" margin="normal" helperText={formErrors.email || ""}/><Divider/></>}

                        {mode==="show"? detailCoach.phone?<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Phone    
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {detailCoach.phone}
                        </Typography>
                        <Divider/>
                        </>:<></>:<>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Phone    
                        </Typography>
                        <TextField error={formErrors.phone} sx={{mb:2, mt:0}} name="phone" fullWidth required
                        defaultValue={detailCoach.phone} variant="standard" margin="normal" helperText={formErrors.phone || ""}/><Divider/>
                        <Typography gutterBottom variant="subtitle1" color="text.secondary">
                            Birthdate
                        </Typography>
                        <input id="birthdate" name="birthdate" type="date" defaultValue={detailCoach.birthdate?.toISOString().split('T')[0]} required className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        <Divider/>
                        </>}

                    </Grid>

                    {mode === "create"?<></>:<>
                      <Grid item container direction="column" sx={{pl:0}} >
                          <div>
                              <Typography gutterBottom variant="subtitle1" color="text.secondary">
                                  Sessions    
                              </Typography>
                              <Typography variant="h5" gutterBottom>
                                  {detailCoach.sessions_count}
                              </Typography>
                          </div>
                          <div>
                              <Typography gutterBottom variant="subtitle1" color="text.secondary">
                                  Trainees    
                              </Typography>
                              <Typography variant="h5" gutterBottom>
                                  {detailCoach.trainees_count}
                              </Typography>
                          </div>
                      </Grid>
                    </>}
                  </Grid>
                </Grid>
              </Grid>

              {mode === "create" ? <></>:<>
                <Dialog open={openDelete}
                  onClose={() => setOpenDelete(false)}
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
              </>}

              <Snackbar open={error} autoHideDuration={6000} onClose={()=>setError(false)}>
                  <Alert onClose={()=>setError(false)} severity="error" sx={{ width: '100%' }}>
                      {error}
                  </Alert>
              </Snackbar>


          </Paper>
          :<></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={() => setDetailCoach(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
