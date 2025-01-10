import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSpring, animated } from 'react-spring'; 
import SchoolImage from './../../src/assets/5.png';
import CollegeImage from './../../src/assets/6.png';
import Technical from './../../src/assets/7.png';
import Global from './../../src/assets/8.png';
import Competitive from './../../src/assets/9.png';
import Soft from './../../src/assets/10.png';
import Government from './../../src/assets/31.png';
import Entrance from './../../src/assets/12.png';
import MainLayout from '../Layout/Mainlayout';
import axiosInstance from '../axiosInstance';
import christmas from '../assets/pongal.png'
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(true);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = localStorage.getItem('UserId');
    const  userRole =localStorage.getItem('UserRole')

    const navigate=useNavigate();

    const animatedCount = (count) => {
        const { number } = useSpring({
            from: { number: 0 },
            to: { number: count },
            config: { tension: 100, friction: 15 },
        });
        return number.to((n) => Math.floor(n).toString() + '+');
        // return number.to((n) => Math.floor(n).toString().padStart(2, '0') + '+');
    };

    const data = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                data: [40, 60], 
                backgroundColor: ["#10b981", "#e5e7eb"],
                hoverBackgroundColor: ["#059669", "#d1d5db"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: { display: false },
        },
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${userId}`);
                const data = response.data;
                setFullname(data.fullName); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            try {
                const response = await axiosInstance.get(`/users/categoryCount?userId=${userId}`);
                console.log('API Response:', response.data);

                const transformedData = response.data.reduce((acc, { category, count }) => {
                    acc[category] = count;
                    return acc;
                }, {});
                setCategoryCounts(transformedData);
            } catch (error) {
                console.error('Error fetching category counts:', error);
            }
        };

        fetchCategoryCounts();
    }, []);

    const handlePaymentNavigation = () => {
        navigate('/Payment');
    };

    return (
        <>
        <MainLayout>
            <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-200">
                <main className="flex-1 p-6 ml-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold">
                                {loading ? 'Loading...' : `Welcome ${fullname}`}
                            </h2>
                            <p className="text-lg text-gray-600">
                                Every step you take today shapes your future tomorrow. Let's make it count!
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                            <div className="flex items-center space-x-16">
                                <div className="relative w-40 h-40">
                                    <Doughnut data={data} options={options} />
                                    <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold text-lg">
                                        40%
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-6">
                                    <h3 className="text-md font-bold text-gray-700">Complete Your Profile</h3>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>navigate(`/Profile/${userId}`)}>
                                        Profile
                                    </button>
                                    {localStorage.getItem("role") === "TUTOR" && (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        KYC
                      </button>
                    )} 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg shadow mb-6">
              <img
                src={christmas}
                alt="Ad Section"
                className="w-full max-h-[400px] object-cover rounded-lg"
              />
            </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            {  title: 'School Education', name: 'SCHOOL_EDUCATION', icon: SchoolImage},
                            { title: 'Under/Post Graduate',name:'UG_PG_EDUCATION', icon: CollegeImage },
                            { title: 'Technical Skills',name:'TECHNICAL_SKILLS', icon: Technical },
                            { title: 'Competitive Exams',name:'COMPETITIVE_EXAMS', icon: Competitive },
                            { title: 'Entrance Exams', name:'ENTRANCE_EXAMS',icon: Entrance },
                            { title: 'Global Language',name:'GLOBAL_LANGUAGES', icon: Global },
                            { title: 'Soft Skills', name:'SOFT_SKILLS',icon: Soft },
                            { title: 'HOBBIES',name:'HOBBIES', icon: Government },
                            
                        ].map((card, index) => {
                            const count = categoryCounts[card.name] 
                            
                            return (
                                <div
                                    className="option-card border rounded-3xl bg-white p-6 shadow-2xl shadow-zinc-500 hover:shadow-current transition"
                                    key={index}
                                    onClick={() => {
                                        if (userRole === "ROLE_PREMIUM_USER") {
                                            navigate(`/subject/${userId}`, { state: { category: card.name } })
                                           
                                        } else {
                                            setIsModalOpen(true);
                                            
                                        }
                                    }}
                                >
                                    <div className="text-center">
                                        <img src={card.icon} alt={`${card.title} Icon`} className="w-16 h-16 mx-auto" />
                                    </div>
                                    <h3 className="text-lg text-center font-semibold mb-4">{card.title}</h3>
                                    <animated.p className="text-3xl text-center font-extrabold">
                                        {animatedCount(count)}
                                    </animated.p>
                                </div>
                            );
                        })}
                    </div>
                </main>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
                         
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <IoClose size={24} />
                            </button>
                            <h2 className="text-4xl font-bold mb-4 text-blue-600">Complete Your Payment</h2>
                            <p className="mb-6">To proceed, kindly make a payment to continue exploring additional options.</p>
                            <button
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg"
                                onClick={handlePaymentNavigation}
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
        </>
    );
};

export default Dashboard;