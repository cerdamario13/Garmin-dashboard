'use client'
import { Dispatch, SetStateAction } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  
  
  const milestoneList = milestoneData.map((item, idx) => (
    <>
      <Milestone
        key={idx}
        distance={props.distance}
        cities={Object.keys(item)[0]}
        distanceCities={Object.values(item)[0]}
      />
    </>
  ))
  
  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
      >
        <DialogTitle>Running Milestones</DialogTitle>
        
        <DialogContent>
          
          {milestoneList}
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
          
      </Dialog>
    </>
  )
  
}

export default DistanceDialog;

const milestoneData = [
  {'Rome to Florence': 174},
  {'Vancouver to Seattle': 140},
  {'London to Paris': 214}
]