'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

export interface DistanceDialogProps  {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  distance: number,
}

const DistanceDialog: React.FunctionComponent<DistanceDialogProps> = (props) => {
  
  const handleClose = () => {
    props.setOpen(false);
  }
  
  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
      >
        <DialogTitle>Running Milestones</DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
          
      </Dialog>
    </>
  )
  
}

export default DistanceDialog;