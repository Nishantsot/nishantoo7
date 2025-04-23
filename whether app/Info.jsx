import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./info.css"
export default function info({ info }) {
    const INTI_URL = "https://g4.img-dpreview.com/C583B30B6CB9494FACB7C64B2EDBA751.jpg"

    return (
        <div className='jojo'>


            <div className='Info'>
                <Card sx={{ maxWidth: 345 }}><CardMedia sx={{ height: 140 }} image={INTI_URL} title="green iguana" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.city}
                        </Typography>
                        <Typography variant="body2" color= "text.secondary" component= {"span"} >

                        <p> Temprature ={info.temp}&deg;C</p>
                        <p>Humidity= {info.humidity}&deg;C</p>
                        <p>tempMin= {info.tempMin}&deg;C</p>
                        <p>tempMax= {info.tempMax}&deg;C</p>
                        <p>is feellike <i>{info.feelLike}</i>&deg;C</p>
                    </Typography>
                </CardContent>
            </Card>

        </div>
        </div >
    );
};