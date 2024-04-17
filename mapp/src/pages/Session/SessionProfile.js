import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Html5QrcodeScanner } from "html5-qrcode";
import {faCircleExclamation, faQrcode, faUserGroup, faUserXmark} from "@fortawesome/free-solid-svg-icons";
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable';
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../../firebase/firestore';
import QRScannerModal from "./QRScannerModal";

function SessionProfile({ session, isDarkMode, course }) {
    const [scannerModal, setScannerModal] = useState(false)
    const [manualSerialNumber, setManualSerialNumber] = useState('');
    const sessionId = session.id;
    const courseId = session.courseId;

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

    console.log(sessionId);
    console.log(courseId);

    const toggleScannerModal = () => {
        setScannerModal(!scannerModal)
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
                <div class="flex gap-1">
                    <button className="bg-black text-sm text-white rounded py-2 px-4" onClick={toggleScannerModal}>Start
                        Scanning
                    </button>


                    <div className="delete-session-area">
                        <button onClick={handleDeleteSession}
                                className="bg-red-500  text-sm hover:bg-red-600 text-white px-4 py-2 rounded">
                            Delete Session
                        </button>
                    </div>
                </div>


            </div>
            <SessionsAttendanceTable data={data} isDarkMode={isDarkMode}/>
            {scannerModal &&
                <QRScannerModal sessionId={session.id} courseId={course.id} toggleModal={toggleScannerModal}/>
            }
        </div>
    );
}

export default SessionProfile;