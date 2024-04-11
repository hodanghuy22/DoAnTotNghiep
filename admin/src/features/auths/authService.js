import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const loginFacebook = async()=>{
    console.log("vao được");
    const response = await axios.post(`${base_url}Users/signin-facebook`, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      }
    );
    if(response.data){
        console.log(response.data);
        return response.data;
    }
}


const authService = {
    loginFacebook,
};

export default authService;