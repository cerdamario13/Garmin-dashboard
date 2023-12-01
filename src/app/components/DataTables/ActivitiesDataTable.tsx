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
import { useIsServerSide } from "../Summaries";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface activitiesDataTableProps {
  tableData: string;
  urlExtension: string;
}

const ActivitiesDataTable: React.FunctionComponent<activitiesDataTableProps> = (props) => {
  
  const [allActivities, setAllActivities] = useState([]);
  //Error handling
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [chartData, setChartData] = useState([
    {
      name: 'Run',
      distance: 0
    }
  ]);
  
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
  
  const barChart = () => {
    const isServerSide = useIsServerSide();
    if (isServerSide) { return null };
    
    return (
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="distance" fill="#8884d8" />  
      </BarChart>
    )
    
  };

    
  
  return (
    <>
      <Stack direction="column">
        
        <Stack direction="row" spacing={3}>
          {
            error ? (<Alert severity="error">{errorMessage}</Alert>)
            :
            (<Typography variant="h4">{props.tableData}</Typography>)
          }
          <Button variant="outlined" onClick={() => {getAllActivities()}}>Get Data</Button>
        </Stack>
        
        <Stack direction="row">
          <>
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
          
          <>
            {barChart()}
          </>
        </Stack>      
        
      </Stack>
      
      
      
    </>
  )

}

export default ActivitiesDataTable;