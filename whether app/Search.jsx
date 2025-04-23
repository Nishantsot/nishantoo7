import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';
import "./Whether.css"; 

import { useState } from 'react';
 export default function Search({updateInfo}){
    let[ city,setCity] = useState("");
    const API_URL =" https://api.openweathermap.org/data/2.5/weather";
    const API_KEY ="604e3021a76e03070a920a3c9f27dc66";


    let whetherInfo = async() =>{
       let response = await fetch (`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jsonResponse = await response.json();
       console.log(jsonResponse);
            let result = {
                city : city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feelsLike,
                weather : jsonResponse.weather[0].description
            };
            console.log(result)
             return result;
        
    };
    let handleChange = (eve) =>{
        setCity(eve.target.value);
    };

    let handleSubmit=async(eve)=>{
        eve.preventDefault();
        console.log(city);
        setCity("");
     let newinfo = await whetherInfo();
        updateInfo(newinfo); 
    };
    return(
        <div className='Whether'>
     
            <form  onSubmit={handleSubmit}>
            <TextField id="City" label="City Name" variant="outlined" 
            required value={city}
            onChange={handleChange}/>
            <br /> <br />
            <Button variant="text" type="Submit" >search</Button>


            </form>
        </div>
    )
 }

 
    
 

