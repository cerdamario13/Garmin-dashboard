'use client';
import { useState } from "react";
import { Button,
  Stack,
  TableContainer,
  Typography,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";

const AllSwimsList = ()=> {

  const [allSwims, setAllSwims] = useState([]);
  
  //get data from python flask
  const getAllRides = async () => {
    const url = new URL("http://127.0.0.1:5000/allSwims");
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    setAllSwims(data['data']);
  };
  
  //mapping all rides
  const rideList = allSwims.map((item, _) => {
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
        <Typography variant="h4">All Swims</Typography>
        <Button variant="outlined" onClick={() => {getAllRides()}}>Get Data</Button>
      </Stack> 
      
      <TableContainer style={{ maxHeight: 350 }}>
        <Table  size="small" aria-label="All Runs Table" style={{ width: '100%' }} >
          <TableHead>
            <TableRow>
              <TableCell>Distance(m)</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rideList}
          </TableBody>
          
        </Table>
      </TableContainer> 
    </>
  )
  
}

export default AllSwimsList