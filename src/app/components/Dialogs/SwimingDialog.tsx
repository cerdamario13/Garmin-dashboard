'use-client'
import { Dispatch, SetStateAction } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material"
  import Milestone from "../ProgressIndicators/LinearProgress"


export interface SwimDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    distance: number, // Distance in meters
        
}

const SwimDialog: React.FunctionComponent<SwimDialogProps> = (props) => {
    
    const handleClose = () => {
        props.setOpen(false);
    };
    
    const milestoneList = milestoneData.map((item, idx) => (
        <DialogContent key={idx}>
            <Milestone
                key={idx}
                distance={props.distance}
                cities={Object.keys(item)[0]}
                distanceCities={Object.values(item)[0]}
            />
        </DialogContent>
    ))
    
    return (
      <>
        <Dialog
          open={props.open}
          onClose={handleClose}
          fullWidth={true}
        >
          <DialogTitle>Running Milestones</DialogTitle>
          
          {milestoneList}
                  
          <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          </DialogActions>
            
        </Dialog>
      </>
    )
}

export default SwimDialog;

const milestoneData = [
    {'One Hundred Meters': '100'},
    {'Two Hundred Meters': '200'},
    {'Four Hundred Meters': '400'},
    {'Eight Hundred Meters': '800'},
    {'One Kilometer': '1000'},
]