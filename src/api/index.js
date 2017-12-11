import axios from "axios";

axios.defaults.baseURL="http://localhost:8000";

export let getCarousel=()=>axios.get("/home/carousel");


export let getRecommend=(offset)=>axios.get(`/public/recommend?offset=${offset}`);


axios.interceptors.response.use(res=>res.data);