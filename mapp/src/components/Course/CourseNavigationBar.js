import React, { useContext, useState } from "react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader, } from "@material-tailwind/react";
import { ActiveTabContext } from "../../contexts/ActiveTabContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteCourse } from "../../firebase/firestore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function CourseNavigationBar({ data, toggleAddStudentModal, toggleAddSessionModal, selectedCourse, isDarkMode }) {

    const [activeTab, setActiveTab] = useState("Students");
    const activeTabContext = useContext(ActiveTabContext);

    const handleDeleteCourse = async () => {
        try {
            if (selectedCourse) { // Do nothing if no course selected
                const confirmDelete = window.confirm("Are you sure you want to delete this course?");

                if (confirmDelete) {
                    // Assume you'll have 'deleteCourse' in 'firestore.js'
                    await deleteCourse(selectedCourse.id);

                    // Handle UI updates: 
                    //  (1)  Reload courses or refresh (simplest, potentially harsh reload)
                    //  (2)  Remove element related to that 'selectedCourse' using state + DOM manipulation, but state may hold stale data for the brief period until your next fetch cycle from Firestore potentially! 
                }
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            // Display a user-friendly error message...
        }
    };

    return (
        <Tabs value={activeTab}>
            <div className={`flex flex-row gap-8 ${isDarkMode ? 'text-white' : ''}`}>
                <div className='grow'>
                    <TabsHeader className={`flex gap-8 font-light border-b rounded-none w-full ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={activeTab === value ? (isDarkMode ? "w-fit text-green-600 font-medium -mb-4 hover:cursor-pointer border-b-2 border-green-400" : "w-fit text-gray-800 -mb-4 font-medium hover:cursor-pointer border-b-2 border-green-400") : "w-fit hover:cursor-pointer"}>
                                <div className=''>{label}</div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </div>

                <div className='flex flex-row space-x-2 items-center'>
                    <button
                        disabled={!selectedCourse}
                        className={activeTab === 'Students' ? 'flex flex-row gap-2 items-center block bg-stone-800 h-fit hover:bg-green-800 text-white text-center px-4 py-2 text-sm rounded' : 'hidden'}
                        onClick={toggleAddStudentModal}>
                        <div> New Student</div>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>

                    <button
                        disabled={!selectedCourse}
                        className={activeTab === 'Sessions' ? 'flex flex-row gap-2 items-center block bg-stone-800 text-white hover:bg-green-800 text-center px-4 py-2 h-fit rounded text-sm' : 'hidden'}
                        onClick={toggleAddSessionModal}>
                        <div> New Session</div>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>

                    {/* Add the Export Data button 
                     <button
                        disabled={!selectedCourse}
                        className='flex flex-row gap-2 block bg-stone-800 text-white hover:bg-green-800 text-center px-4 py-2 rounded text-sm'
                        onClick={() => handleExportAllData()} 
                       >
                        <div>Export Data</div>
                        
                    </button>
                    */}

                    <button
                        disabled={!selectedCourse} // Disable if no course is selected 
                        className='flex flex-row gap-2 items-center block bg-red-600  hover:bg-red-700 t  text-white text-center px-4 py-2 h-fit rounded text-sm'
                        onClick={handleDeleteCourse} // We'll create this function next
                    >
                        <div> Delete Course</div>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>

                </div>
            </div>

            <TabsBody>
                {data.map(({ value, table }) => (
                    <TabPanel
                        className='p-0'
                        key={value} value={value}>
                        {table}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default CourseNavigationBar;