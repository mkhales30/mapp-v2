import React, {useEffect, useState} from 'react'
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable'
import ScannerModal from './ScannerModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import { deleteSession } from '../../firebase/firestore';


function SessionProfile({session, course}) {
    const [scannerModal, setScannerModal] = useState(false)

    const toggleScannerModal = () => {
        setScannerModal(!scannerModal)
    }
    const sessionId = session.id;
    const courseId = session.courseId;
    console.log(sessionId);
    console.log(courseId);

    let noticeMessage

    if (session.sessionStart) {
        noticeMessage =
            <div className="bg-blue-50  text-blue-900 flex p-4 rounded gap-4 mb-4 items-center border-2 border-blue-500/20">
                <FontAwesomeIcon icon={faCircleExclamation}/>
                {/*Start time in future*/}
                {Date.now() < new Date(session.sessionStart) &&
                    <p className="text-sm">
                        This class is scheduled to start at <span className="font-bold">
                            {new Date(session.sessionStart).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} on {new Date(session.sessionStart).toDateString()}
                        </span>
                    </p>
                }
                {/*Within grace period*/}
                {session.gracePeriod != null && Date.now() > new Date(session.sessionStart) && Date.now() < new Date(session.gracePeriod) &&
                    <p className="text-sm">
                        Class has started, Not scanned students will be marked as absent at <span className="font-bold">{new Date(session.gracePeriod).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} on {new Date(session.sessionStart).toDateString()} </span>
                    </p>
                }
                {/*After grace period*/}
                {session.gracePeriod !== null && Date.now() > new Date(session.gracePeriod) &&
                    <p className="text-sm">Class has ended, please see the attendance report below</p>
                }
                {/*Start time in past (and no grace period)*/}
                { session.gracePeriod == null && Date.now() > new Date(session.sessionStart) &&
                    <p className="text-sm">Class has ended, please see the attendance report below</p>
                }

            </div>
    } else {
        noticeMessage =
            <div className="bg-blue-50  text-blue-900 flex p-4 rounded gap-4 mb-4 items-center border-2 border-blue-500/20">
                <FontAwesomeIcon icon={faCircleExclamation}/>
                <p className="text-sm">Start Scanning when you are ready to begin class</p>
            </div>
    }

    const data = [
        {
            id: 1,
            lastName: 'Khawaja',
            firstName: 'Duaa',
            status: 'Not Scanned',
            in: '3:00pm',
            note: 'Left early for event'
        },
        {
            id: 2,
            lastName: 'Moore',
            firstName: 'Amber',
            status: 'Not Scanned',
            in: '3:01pm',
            note: 'Arrived late'
        },
        {
            id: 3,
            lastName: 'Rahman',
            firstName: 'Khales',
            status: 'Not Scanned',
            in: '2:59pm',
            note: ''
        },

    ]

    const handleDeleteSession = async () => {
        try {
            await deleteSession(courseId, sessionId);
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    return (
        <div className="mx-12 py-4">
            {noticeMessage}
            <div className="flex justify-between">
                <div className="text-2xl font-medium"> Attendance Report</div>
                <button className="bg-black text-sm text-white rounded py-2 px-4" onClick={toggleScannerModal}>Start Scanning</button>
                <div className="delete-session-area">
    <button onClick={handleDeleteSession} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
        Delete Session
    </button>
</div>
            </div>
            <SessionsAttendanceTable data={data}/>
            {scannerModal &&
                <ScannerModal toggleModal={toggleScannerModal}/>
            }
        </div>
    )
}

export default SessionProfile
