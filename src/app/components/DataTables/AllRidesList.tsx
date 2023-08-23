'use client';
import { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";

const AllRidesList = () => {
  
  const [allRides, setAllRides] = useState([]);
  
  //get data from python flask
  const getAllRides = async () => {
    const url = new URL("http://127.0.0.1:5000/allRides");
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    setAllRides(data['data']);
  }
  
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Typography variant="h4">All Rides</Typography>
        <Button variant="outlined" onClick={() => {getAllRides()}}>Get Data</Button>
      </Stack>  
    </>
  )
  
}

export default AllRidesList;