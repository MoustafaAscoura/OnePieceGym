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
  Button,
  TextField,
  Divider,
  Select,
  MenuItem
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToProgramsList, editProgram, removeFromProgramsList } from "@/app/lib/store/slices/programsSlice";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProgramDetails({
  detailProgram,
  setDetailProgram,
}) {
  const descriptionElementRef = useRef(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("show"); //show, edit, or create
  const dispatch = useDispatch()

  useEffect(()=>{
    if (Object.keys(detailProgram).length === 0) {
      setMode("create")
    } else {
      setMode("show")
    }
  },[detailProgram])

  const toggleEdit = (event) => {
    if (mode === "show") {
      setMode("edit");
    } else {
      setLoading(true);
      const formData = new FormData(document.querySelector('form#programForm'));
      if (mode === "edit") {
        formData.set("id", detailProgram.id);
      }
      handleSubmit(formData);
    }
  };

  async function handleSubmit(formData) {

    fetch("/api/programs", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse)
        const new_program = { ...detailProgram, ...jsonResponse }
        new_program.trainees_count = new_program._count.trainees || 0
        setDetailProgram( new_program );
        if (!formData.get('id')){
          dispatch(addToProgramsList(new_program))
        } else {
          dispatch(editProgram(new_program))
        }
        setMode("show");
      })
      .catch((err) => {
        console.log(err)
        if (err.name === "PrismaClientKnownRequestError") {
          setError("Invalid Relative Field - Program or Program incorrect");
        } else {
          setError("Fields missing");
        }
      })
      .finally(() => setLoading(false));
  }

  const deleteProgram = () => {
    setLoading(true);
    fetch("/api/programs", {
      method: "DELETE",
      body: JSON.stringify({ id: detailProgram.id }),
    })
      .then((response) => {
        setOpenDelete(false);
        dispatch(removeFromProgramsList(detailProgram.id))
        setDetailProgram(false);
      })
      .catch((err) => {
        setError("Error Happened! Try Again");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (detailProgram) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [detailProgram]);


  return (
    <Dialog
      open={detailProgram}
      onClose={() => setDetailProgram(false)}
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
          {detailProgram?
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1, backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',}}>

              <Grid item xs container direction="column" id="programForm" spacing={2} className='ps-3' component='form' onSubmit={e => handleSubmit(e)}>
                <Grid item container direction="row" spacing={2} alignItems="center">
                      {mode === "create"?<></>:<><Grid item xs={2}>
                          <Typography gutterBottom variant="subtitle1" color="text.secondary">
                              ID
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                          {detailProgram.id}
                          </Typography>
                      </Grid></>}
                      <Grid item xs={10}  >
                          <Typography variant="subtitle1" color="text.secondary">
                          Name </Typography>
                          {mode == "show"?<>
                          <Typography variant="h5" gutterBottom>
                          {detailProgram.name}
                          </Typography></>:
                          <div>
                              <TextField fullWidth required name="name" label="Program Name"
                                  defaultValue={detailProgram?.name} variant="standard"/>
                          </div>}
                      </Grid>
                </Grid>
                <Divider sx={{mt:2, ms:4}}/>
                <Grid item container direction="row" spacing={2} alignItems="center">
                  <Grid item xs={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                        Cost </Typography>
                        {mode == "show"?<>
                        <Typography variant="h5" gutterBottom>
                        {detailProgram.cost}
                        </Typography></>:
                        <div>
                            <TextField required name="cost" type="number"
                                defaultValue={detailProgram?.cost} variant="standard"/>
                        </div>}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                        Duration </Typography>
                        {mode == "show"?<>
                        <Typography variant="h5" gutterBottom>
                        {detailProgram.duration}
                        </Typography></>:
                        <div>
                            <TextField required name="duration" type="number"
                                defaultValue={detailProgram?.duration || 1} variant="standard"/>
                        </div>}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                        Period </Typography>
                        {mode == "show"?<>
                        <Typography variant="h5" gutterBottom>
                        {detailProgram.period}
                        </Typography></>:
                        <div>
                          <Select
                            defaultValue={detailProgram.period || "month"}
                            name="period"
                            fullWidth
                            size="small"
                          >
                            <MenuItem value="week">Week</MenuItem>
                            <MenuItem value="month">Month</MenuItem>
                            <MenuItem value="year">Year</MenuItem>
                          </Select>
                        </div>}
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider/>
                    {mode==="show"? detailProgram.description?<>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        Description    
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {detailProgram.description}
                    </Typography>
                    <Divider/>
                    </>:<></>:<>
                    <Typography variant="subtitle1" color="text.secondary">
                        Description    
                    </Typography>
                    <TextField sx={{mb:2, mt:0}} multiline rows={2} name="description" fullWidth
                    defaultValue={detailProgram.description} variant="standard" margin="normal"/><Divider/></>}

                    {mode==="show"? <>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                        Features    
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {detailProgram.features.map(f => <p key={f}>{f}</p>)}
                    </Typography>
                    <Divider/>
                    </>:<>
                    <Typography gutterBottom variant="subtitle1" color="text.secondary">
                      Features    
                    </Typography>
                    <TextField sx={{mb:2, mt:0}} name="features" fullWidth required multiline minRows={2} maxRows={5}
                    variant="standard" margin="normal" defaultValue={detailProgram?.features?.join("\n")} helperText="Input each feature on new line"/><Divider/>
                    </>}
                </Grid>
                <Grid item container direction="row" spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                        Badge </Typography>
                        {mode == "show"?<>
                        <Typography variant="h5" gutterBottom>
                        {detailProgram.badge}
                        </Typography></>:
                        <div>
                          <Select
                            defaultValue={detailProgram.badge || ""}
                            name="badge"
                            fullWidth
                            size="small"
                          >
                            <MenuItem value="">No Badge</MenuItem>
                            <MenuItem value="Top-seller">Top Seller</MenuItem>
                            <MenuItem value="Best-value">Best Value</MenuItem>
                          </Select>
                        </div>}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                        Program Type </Typography>
                        {mode == "show"?<>
                        <Typography variant="h5" gutterBottom>
                        {detailProgram.basic ? "Basic Program" : "Special Program"}
                        </Typography></>:
                        <div>
                          <Select
                            defaultValue={detailProgram.basic}
                            name="basic"
                            fullWidth
                            size="small"
                          >
                            <MenuItem value={true}>Basic</MenuItem>
                            <MenuItem value={false}>Special</MenuItem>
                          </Select>
                        </div>}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                        Show on Website </Typography>
                        {mode == "show"?<>
                        <Typography variant="h5" gutterBottom>
                        {detailProgram.show ? "Shown" : "Hidden"}
                        </Typography></>:
                        <div>
                          <Select
                            defaultValue={detailProgram.show}
                            name="show"
                            fullWidth
                            size="small"
                          >
                            <MenuItem value={true}>Show</MenuItem>
                            <MenuItem value={false}>Hide</MenuItem>
                          </Select>
                        </div>}
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
                  <Button onClick={deleteProgram} variant="outlined" color="error">
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
        <div className='flex items-center'>
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
        </div>
        <Button color="success" onClick={() => setDetailProgram(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
