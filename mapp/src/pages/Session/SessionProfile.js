import React, {useEffect, useState} from 'react'
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable'
import QRScannerModal from './QRScannerModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {getAttendanceData} from '../../firebase/firestore'
import {deleteSession} from '../../firebase/firestore';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'


function SessionProfile({session, course, updateSelectedStudent}) {
    const [scannerModal, setScannerModal] = useState(false)
    const [attendanceData, setAttendanceData] = useState([])

    const fetchAttendanceData = async (sessionID, courseId) => {
        console.log("fetching attendance data")
        try {
            const response = await getAttendanceData(sessionID, courseId);
            setAttendanceData(response);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const toggleScannerModal = () => {
        setScannerModal(!scannerModal)
    }

    const [scanResult, setScanResult] = useState(null);
    const [manualSerialNumber, setManualSerialNumber] = useState('');
    const sessionId = session.id;
    const courseId = session.courseId;

    useEffect(() => {
        fetchAttendanceData(session.id, course.id)
    }, [scannerModal]);

    let noticeMessage

    if (session.sessionStart) {
        noticeMessage =
            <div
                className="bg-blue-50  text-blue-900 flex p-4 rounded gap-4 mb-4 items-center border-2 border-blue-500/20">
                <FontAwesomeIcon icon={faCircleExclamation}/>
                {/*If the Start time in future*/}
                {Date.now() < new Date(session.sessionStart) &&
                    <p className="text-sm">
                        This class is scheduled to start at <span className="font-bold">
                            {new Date(session.sessionStart).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })} on {new Date(session.sessionStart).toDateString()}
                        </span>
                    </p>
                }
                {/*If the current time is still within the grace period*/}
                {session.gracePeriod != null && Date.now() > new Date(session.sessionStart) && Date.now() < new Date(session.gracePeriod) &&
                    <p className="text-sm">
                        Class has started, Not scanned students will be marked as absent at <span
                        className="font-bold">{new Date(session.gracePeriod).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} on {new Date(session.sessionStart).toDateString()} </span>
                    </p>
                }
                {/*Message to display after grace period has passed*/}
                {session.gracePeriod !== null && Date.now() > new Date(session.gracePeriod) &&
                    <p className="text-sm">Class has ended, please see the attendance report below</p>
                }
                {/*Message to display once the start time has passed (and no grace period was specified)*/}
                {session.gracePeriod == null && Date.now() > new Date(session.sessionStart) &&
                    <p className="text-sm">Class has ended, please see the attendance report below</p>
                }

            </div>
    } else {
        noticeMessage =
            <div
                className="bg-blue-50  text-blue-900 flex p-4 rounded gap-4 mb-4 items-center border-2 border-blue-500/20">
                <FontAwesomeIcon icon={faCircleExclamation}/>
                <p className="text-sm">Start Scanning when you are ready to begin class</p>
            </div>
    }

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
                <button className="bg-black text-sm text-white rounded py-2 px-4" onClick={toggleScannerModal}>Start
                    Scanning
                </button>


                {/*<div className="delete-session-area">*/}
                {/*    <button onClick={handleDeleteSession}*/}
                {/*            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">*/}
                {/*        Delete Session*/}
                {/*    </button>*/}
                {/*</div>*/}

            </div>
            <SessionsAttendanceTable data={attendanceData} updateSelectedStudent={updateSelectedStudent}/>
            {scannerModal &&
                <QRScannerModal sessionId={session.id} courseId={course.id} toggleModal={toggleScannerModal}/>
            }
        </div>
    )
}

export default SessionProfile
