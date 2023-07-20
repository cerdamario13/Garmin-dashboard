'use client'
import { Dispatch, SetStateAction } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  LinearProgressProps,
  Typography 
} from "@mui/material"


export interface DistanceDialogProps  {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  distance: number,
}

const DistanceDialog: React.FunctionComponent<DistanceDialogProps> = (props) => {
  
  const handleClose = () => {
    props.setOpen(false);
  };
  
  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  
  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
      >
        <DialogTitle>Running Milestones</DialogTitle>
        <DialogContent>
          <LinearProgressWithLabel value={(props.distance / milestones['London to Paris'] * 100)} />
          {props.distance}
          {" - "}
          {milestones['London to Paris']}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
          
      </Dialog>
    </>
  )
  
}

export default DistanceDialog;

const milestones = {
  'Rome to Florence': 174,
  'Vancouver to Seattle': 140,
  'London to Paris': 214
}