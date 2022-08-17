import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3000/api/v1/purchases",
    headers: {
        'Content-Type': 'application/json'
    }
});