import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Html5QrcodeScanner } from "html5-qrcode";
import { faQrcode, faUserGroup, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable';
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../../firebase/firestore';
import QRScannerModal from "./QRScannerModal";

function SessionProfile({ session, isDarkMode, course }) {
    const [scannerModal, setScannerModal] = useState(false)
    const [manualSerialNumber, setManualSerialNumber] = useState('');
    const sessionId = session.id;
    const courseId = session.courseId;
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
            {/*{noticeMessage}*/}

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