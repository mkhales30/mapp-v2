import React, { useEffect, useState } from 'react';
import course_background from "../../assets/course_background.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { auth } from '../../firebase/firebase';
import { getUserData } from '../../firebase/firestore';


function SettingsProfile({ isDarkMode, setIsDarkMode, setSelectedCourse, setSelectedStudent }) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          if (auth.currentUser) {
            try {
              const data = await getUserData(auth.currentUser.uid);
              setUserData(data);
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }
        };
      
        fetchUserData();
      }, []);


    // Set selectedCourse to null when component mounts
    useEffect(() => {
        setSelectedCourse(null);
        setSelectedStudent(null);
    }, [setSelectedCourse]);

    // Apply styles directly based on the current mode
    const appStyles = {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
    };

    // Apply styles directly for border on the current mode
    const sectionBorderStyle = {
        borderColor: isDarkMode ? 'gray' : 'black'
    };

    return (
        <div style={appStyles} className="h-full">
            <div className='flex flex-col w-full'>
                <div className='h-52'>
                    <img className='w-full h-full object-cover' src={course_background} alt="" />
                    <div className={'block flex flex-col text-white -mt-20 pl-8'}>
                        <h1 className='text-3xl text-white mb-1'>{'Account Settings'}</h1>
                        <div className='text-sm'>Change your profile and account settings</div>
                    </div>
                </div>
            </div>
            {/* First row */}
            <div className="flex justify-between p-4">
                {/* First section */}
                <div className="w-1/2 border border-black rounded bg-transparent p-4 m-2" style={sectionBorderStyle}>
                    <div className='text-18px black-text font-bold'>{'Profile Information'}</div> <br />
                    {/* Content for Account */}
                    <p className='black-text'>
                        User's Name: {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'} <br /> <br />
                        Email: {auth.currentUser ? auth.currentUser.email : 'N/A'}
                    </p>
                </div>
                {/* Second section */}
                <div className="w-1/2 border border-black rounded bg-transparent p-4 m-2" style={sectionBorderStyle}>
                    <div className='text-18px black-text font-bold'>{'Theme and Appearance'}</div> <br />
                    {/* Content for Appearance */}
                    <div className="mt-2">
                        {/* Toggle switchs for Appearance */}
                        <label className="flex items-center">
                            <FontAwesomeIcon icon={faSun} size="lg" className="mr-2" />
                            <span className="mr-2">Light Mode</span>
                            <input
                                type="checkbox"
                                checked={!isDarkMode}
                                onChange={() => setIsDarkMode(!isDarkMode)}
                                className="toggle-checkbox"
                            />
                            <span></span>
                            <div style={{ marginRight: '60px' }}></div>
                            <FontAwesomeIcon icon={faMoon} size="lg" className="mr-2" />
                            <span className="mr-2">Dark Mode</span>
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={() => setIsDarkMode(!isDarkMode)}
                                className="toggle-checkbox"
                            />
                            <span></span>
                        </label>
                    </div>
                </div>
            </div>
            {/* Second row */}
            <div className="flex justify-between p-4">
                {/* Third section */}
                <div className="w-1/2 border border-black rounded bg-transparent p-4 m-2" style={sectionBorderStyle}>
                    <div className='text-18px black-text font-bold'>{'Terms of Service and Privacy Policy'}</div>
                    {/* Content for Updates */}
                </div>
                {/* Fourth section */}
                <div className="w-1/2 border border-black rounded bg-transparent p-4 m-2" style={sectionBorderStyle}>
                    <div className='text-18px black-text font-bold'>{'Help and Support'}</div>
                    {/* Content for Help */}
                </div>
            </div>
        </div>
    );
}

export default SettingsProfile;