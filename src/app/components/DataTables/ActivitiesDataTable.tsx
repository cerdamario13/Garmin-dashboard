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
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

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
        
        const tempChartData = data['data'].map((x: any) => {
          return {
            Distance: Number(x['Distance']),
            Date: x['Date']
          }
        }); 
        setChartData(tempChartData);
              
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
  
  const formatCustomDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };
  
  interface TickProps {
    x: number;
    y: number;
    payload: any;
  }
  
  const CustomXAxisTick = ({ x, y, payload }: TickProps) => {
    const formattedDate = formatCustomDate(new Date(payload.value));
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">
          {formattedDate}
        </text>
      </g>
    );
  };
  
  const barChart = () => {
    const isServerSide = useIsServerSide();
    if (isServerSide) { return null };
    
    return (
    
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="Date" tick={<CustomXAxisTick />}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Distance" stroke="#8884d8" activeDot={{ r: 8 }}/>
      </LineChart>
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