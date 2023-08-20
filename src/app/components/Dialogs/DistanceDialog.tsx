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
  Typography,
  Stack
} from "@mui/material"
import Milestone from "../ProgressIndicators/LinearProgress"


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
        fullWidth={true}
      >
        <DialogTitle>Running Milestones</DialogTitle>
        <DialogContent>
          <LinearProgressWithLabel value={(props.distance / milestones['London to Paris'] * 100)} />
          
          <Stack direction="row" spacing ={1}>
            
            <Typography variant="body1" >London to Paris</Typography>
            <Typography variant="body1">{`${props.distance} - ${milestones['London to Paris']}`}</Typography>
            
          </Stack>
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