import react from "react";
import {  useNavigate } from "react-router-dom";

function Home (){
const navigate=useNavigate();

    return (
        <div>
            <button onClick={()=>(navigate('/signup'))}>Sign UP</button>
            <button onClick={()=>(navigate('/login'))}>sign In</button>
        </div>
    );
}

export default Home;