'use client';
import { Typography,
  Button,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Stack, 
} from "@mui/material";
import { useState } from "react";

const AllRunsList = () => {
  
  const [allRuns, setAllRuns] = useState([]);
  
  //getting data from localHost Python flask
  const getAllRuns = async () => {
    const url = new URL("http://127.0.0.1:5000/allRuns");
    
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    setAllRuns(data['data'])
  }
  
  //mapping all runs
  const runList = allRuns.map((item, _) => {
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

  })
  
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Typography variant="h4">All Runs</Typography>
        <Button variant="outlined" onClick={() => {getAllRuns()}}>GET DATA</Button>        
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
            {runList}
          </TableBody>
          
        </Table>
      </TableContainer>
      
    </>
  );
  
}

export default AllRunsList;

