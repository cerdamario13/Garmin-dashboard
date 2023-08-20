'use client'
import {
  LinearProgress,
  LinearProgressProps,
  Box,
  Typography,
  Stack
} from '@mui/material'

interface MilestoneProps {
  distance: number,
  cities: string,
  distanceCities: number,
}

const Milestone: React.FunctionComponent<MilestoneProps> = (props) => {
  
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
      <LinearProgressWithLabel value={(props.distance / props.distanceCities * 100)}  />
      <Stack direction="row" spacing={1}>
        
      <Typography variant="body1" >{props.cities}</Typography>
      <Typography variant="body1">{`${props.distance} - ${props.distanceCities}`}</Typography>
        
      </Stack>
    </>
  );
  
}

export default Milestone;