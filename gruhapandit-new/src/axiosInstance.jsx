import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL:'https://tution-application.onrender.com/tuition-application'
  baseURL:'https://tution-application-testenv.onrender.com/tuition-application'
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('Token');


  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      console.error('API endpoint not found: ', error.response.config.url);
      // alert('Requested resource not found. Please check the API endpoint or contact support.');
    } else if (error.response && error.response.status === 401) {
      
      localStorage.clear();
      window.location.href = '/LoginPage';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;



//....18
// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: 'https://hrms-repository-gruhabase.onrender.com/tuition-application',
// });

// // Set up an interceptor to add the token to each request
// axiosInstance.interceptors.request.use((config) => {
//   const jwtToken = localStorage.getItem('jwtToken');
//   if (jwtToken) {
//     config.headers.Authorization = `Bearer ${jwtToken}`;
//   }
//   return config;
// });

// // Set up an interceptor to handle unauthorized responses
// axiosInstance.interceptors.response.use(
//   (response) => response, // If the response is successful, just return it
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('jwtToken');
//       window.location.href = '/login'; // Use window.location.href to navigate
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
