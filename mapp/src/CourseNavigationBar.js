import React, {useState} from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import StudentTable from "./tables/StudentTable";

export function CourseNavigationBar({data}) {
    const [activeTab, setActiveTab] = useState("Students");

    return (
        <Tabs value={activeTab}>
            <TabsHeader className='flex flex-row justify-normal gap-8 font-light text-gray-500 border-b  rounded-none'>
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "w-fit text-gray-800 font-medium hover:cursor-pointer border-b-2 border-green-400" : "w-fit hover:cursor-pointer"}
                    >
                        <div className='mb-2'>{label}</div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, table }) => (
                    <TabPanel key={value} value={value}>
                        {table}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default CourseNavigationBar;