import React, { useState,useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSpring, animated } from 'react-spring'; 
import SchoolImage from './../../src/assets/5.png';
import CollegeImage from './../../src/assets/6.png';
import Technical from './../../src/assets/7.png';
import Global from './../../src/assets/8.png';
import Competitive from './../../src/assets/9.png';
import Soft from './../../src/assets/10.png';
import Government from './../../src/assets/11.png';
import Entrance from './../../src/assets/12.png';
import MainLayout from '../Layout/Mainlayout';
// import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(true);
    const userId=localStorage.getItem('UserId') 

    const animatedCount = (count) => {
        const { number } = useSpring({
            from: { number: 0 },
            to: { number: parseInt(count.replace('+', '')) },
            config: { tension: 100, friction: 15 },
        });
        return number.to((n) => Math.floor(n).toString() + '+');
    };

    const data = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                data: [40, 60], // Adjusted progress
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
                console.log(data);
                setFullname(data.fullName); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <MainLayout>
            <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-200">
                <main className="flex-1 p-6 ml-10">
                   
                    <div className="grid grid-cols-1   lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold">   {loading ? 'Loading...' : `Welcome ${fullname}`}</h2>
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
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                        Profile
                                    </button>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                        KYC
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'School Education', count: '50+', icon: SchoolImage },
                            { title: 'Under/Post Graduate', count: '100+', icon: CollegeImage },
                            { title: 'Technical Skills', count: '30+', icon: Technical },
                            { title: 'Global Language', count: '10+', icon: Global },
                            { title: 'Competitive Exam', count: '210+', icon: Competitive },
                            { title: 'Soft Skills', count: '25+', icon: Soft },
                            { title: 'Government Exam', count: '150+', icon: Government },
                            { title: 'Entrance Exam', count: '250+', icon: Entrance },
                        ].map((card, index) => (
                            <div
                                className="option-card border rounded-3xl bg-white p-6 shadow-2xl shadow-zinc-500 hover:shadow-current transition"
                                key={index}
                            >
                                <div className="text-center">
                                    <img src={card.icon} alt={`${card.title} Icon`} className="w-16 h-16 mx-auto" />
                                </div>
                                <h3 className="text-lg text-center font-semibold mb-4">{card.title}</h3>
                                <animated.p className="text-3xl text-center font-extrabold">
                                    {animatedCount(card.count)}
                                </animated.p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
