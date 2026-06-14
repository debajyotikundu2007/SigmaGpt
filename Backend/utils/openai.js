import "dotenv/config";
import axios from 'axios';
const openAiUrl="https://api.openai.com/v1/responses"
async function getApiResponse(message) {
    const data ={
            model:"gpt-5-mini",
            input:[{
                role:"user",
                content:message,
            }]
    }
    const config={
        headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${process.env.MY_Gpt_Key}`
        }
    }
    let response=await axios.post(openAiUrl,data,config);
    return response.data.output[1].content[0].text;
    
}

export default getApiResponse;