'use client';
import { Typography, Button, ListItem, ListItemText, TableCell, TableRow, TableContainer, Table, TableHead, TableBody } from "@mui/material";
import { useState } from "react";

const AllRunsList = () => {
  
  const [allRuns, setAllRuns] = useState([]);
  
  //getting data from localHost Python flask
  const getAllRuns = async () => {
    const url = new URL("http://127.0.0.1:5000/allRuns");
    
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data['data']);
    setAllRuns(data['data'])
  }
  
  //mapping all runs
  const runList = allRuns.map((item, idx) => {
    return(
      <TableRow
        key={item['Date']}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {item['Distance']}
        </TableCell>
      </TableRow>
    )

  })
  
  return (
    <>
      <Typography variant="h4">All Runs</Typography>
      <Button variant="contained" onClick={() => {getAllRuns()}}>GET DATA</Button>
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="All Runs Table" >
          <TableHead>
            <TableRow>
              <TableCell>Distance</TableCell>
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