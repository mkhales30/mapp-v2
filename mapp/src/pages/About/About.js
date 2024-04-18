import React from 'react'
import AddStudentModal from "../../modals/AddStudentModal";
import { Features } from './Features';
import Team from './Team';

function About({}){
    return (
        <div className="rounded-lg">
            <div className="text-2xl font-bold mb-6">Key Features</div>
            <p className="mb-6">
                MAPP is an attempt to capture student attendance and reduce the possibilities of errors while doing so.
            </p>

            <Features />

            <div className="mb-6">
                <div className="text-2xl font-bold mb-6 mt-14">Why MAPP?</div>
                <p>Student attendance data can often be misleading due to students leaving early or being disengaged, 
                    combined with challenges in accessing and managing this data across multiple classes. These issues hinder 
                    educational institutions, especially when attendance influences decisions like scholarship awards. Mapp 
                    suggests implementing a more effective method for recording and assessing attendance to solve these problems.
                </p>
            </div>

            <div className="mb-6">
                <div className="text-2xl font-bold mb-6 mt-14">How is MAPP Different?</div>
                <p>The MAPP (Mentally and Physically Present) app transforms classroom attendance by enabling mentors and
                    instructors to track both the physical and cognitive engagement of students. Beyond mere attendance, it facilitates 
                    detailed note-taking on individual and collective student dynamics for enhanced course management. A standout feature 
                    includes the generation of unique QR codes for each student, ensuring authenticity in attendance records and significantly 
                    reducing fraudulent presences. This pioneering student-led app development initiative promises national acclaim, potential 
                    revenue streams for colleges and IT departments, and valuable recognition for student developers through credits and 
                    letters of recommendation. Embrace MAPP for a smarter, more accountable educational environment.
                </p>

            </div>

            <div className="mb-6">
                <div className="text-2xl font-bold mb-6 mt-14">The Future of MAPP</div>
                <p>The MAPP app enhances classroom management by enabling accurate tracking of student attendance and engagement, offering 
                    features for note-taking on student performance, and generating unique QR codes for secure attendance verification. This 
                    innovative, student-developed tool not only minimizes fraudulent attendance but also stands to gain national recognition, 
                    potentially boosting revenue and prestige for colleges and IT departments. Participating students are rewarded with credits 
                    and commendations, acknowledging their contribution to educational technology. 
                </p>
            </div>
 
            <Team />

            <div className="mb-6 mt-14">
                
                {/* This is a blank line */}
                <div>{'\u00a0'}</div>
                <div>{'\u00a0'}</div>

                <div className="mt-2">
                    <p className="italic text-gray-500">
                        The Mapp idea was proposed by Dr.Tawanna K. Morgan, Esq. who is currently serving as faculty for
                        the Criminal Justice Department at GGC.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;
