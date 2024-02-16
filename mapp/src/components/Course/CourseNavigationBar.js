import React, {useContext, useState} from "react";
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader,} from "@material-tailwind/react";
import {ActiveTabContext} from "../../contexts/ActiveTabContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


export function CourseNavigationBar({data, toggleAddStudentModal, toggleAddSessionModal,selectedCourse}) {
    const [activeTab, setActiveTab] = useState("Students");
    const activeTabContext = useContext(ActiveTabContext)

    return (
        <Tabs value={activeTab}>
            <div className='flex flex-row gap-8'>
                <div className='grow'>
                    <TabsHeader className='flex gap-8 font-light text-gray-500 border-b rounded-none w-full'>
                        {data.map(({label, value}) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={activeTab === value ? "w-fit text-gray-800 font-medium hover:cursor-pointer border-b-2 border-green-400" : "w-fit hover:cursor-pointer"}>
                                <div className='mb-2'>{label}</div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </div>

                <div className='flex flex-row'>
                    <button
                        disabled={!selectedCourse}
                        className={activeTab === 'Students' ? 'flex flex-row gap-2 items-center block bg-stone-800  hover:bg-green-800 t  text-white text-center px-4 py-2 rounded text-sm' : 'hidden'}
                        onClick={toggleAddStudentModal}>
                        <div className='text-xs'> New Student</div>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>

                    <button
                        disabled={!selectedCourse}
                        className={activeTab === 'Sessions' ? 'flex flex-row gap-2 items-center block bg-stone-800 text-white hover:bg-green-800 text-center px-4 py-2 rounded text-sm' : 'hidden'}
                        onClick={toggleAddSessionModal}>
                        <div className='text-xs'> New Session</div>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>

                </div>
            </div>

            <TabsBody>
                {data.map(({value, table}) => (
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