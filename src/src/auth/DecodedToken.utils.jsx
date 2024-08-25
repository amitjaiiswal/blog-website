import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const getToken = Cookies.get('token');

const decodedToken = jwtDecode(getToken, process.env.REACT_APP_JWT_SECRET_KEY);
console.log("decodedToken",decodedToken);
export default decodedToken;
