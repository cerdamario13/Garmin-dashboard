'use client'

import React, { useState } from "react";
import { Button,
  Stack,
  TableContainer,
  Typography,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Alert,
} from "@mui/material";

interface activitiesDataTableProps {
  tableData: string;
  urlExtension: string;
}

const ActivitiesDataTable: React.FunctionComponent<activitiesDataTableProps> = (props) => {
  
  const [allActivities, setAllActivities] = useState([]);
  //Error handling
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  //get the data from api
  const getAllActivities =async () => {
    
    //clear error
    setError(false);
    setErrorMessage("");
    
    const url = new URL(`http://127.0.0.1:5000/${props.urlExtension}`);
    
    try {
        const response = await fetch(url.toString());
        
        if (!response.ok) {
            setError(true);
            setErrorMessage(`Failed to get ${props.tableData}`);
            return;
        }
        
        const data = await response.json();
        console.log(data);
        setAllActivities(data['data']);
    } catch (e) {
        setError(true);
        setErrorMessage(`Failed to get ${props.tableData}`);   
    }
  };
  
    //mapping all rides
    const activitiesList = allActivities.map((item, _) => {
      return(
        <TableRow
          key={item['Date']}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {item['Distance']}
          </TableCell>
          <TableCell>{item['Elapsed Time']}</TableCell>
          <TableCell>{item['Date']}</TableCell>
        </TableRow>
      )
    });
  
  return (
    <>
      <Stack direction="row" spacing={3}>
        {
          error ? (<Alert severity="error">{errorMessage}</Alert>)
          :
          (<Typography variant="h4">{props.tableData}</Typography>)
        }
        <Button variant="outlined" onClick={() => {getAllActivities()}}>Get Data</Button>
      </Stack> 
      
      <TableContainer style={{ maxHeight: 350 }}>
        <Table  size="small" aria-label="All Runs Table" style={{ width: '100%' }} >
          <TableHead>
            <TableRow>
              <TableCell>Distance</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {activitiesList}
          </TableBody>
          
        </Table>
      </TableContainer>
    </>
  )

}

export default ActivitiesDataTable;