import React from 'react'
import AddStudentModal from "../../modals/AddStudentModal";

function About({}){
    return (
        <div className="p-6 border rounded-lg">
            <div className="text-2xl font-bold mb-4">About MAPP</div>
            <p className="mb-4">
                MAPP is an attempt to capture student attendance and reduce the possibilities of errors while doing so.
            </p>

            <div className="mb-4">
                <strong className="font-bold">Why regular attendance apps don't work?</strong>
                <p>In a lot of the cases student attendance data can be misleading, as Students may attend class for the
                    first five minutes
                    and then leave for the remainder of the session, or be physically present but not mentally involved
                    in the class session.
                    Situations where the recorded attendance data has been inaccessible to instructors when required,
                    and other issues like difficulty managing the atendance for multiple classes, pose serious problems
                    for both the class
                    admins and the educational institutions.
                    In educational institutions where attendance has been regarded as an important factor in taking
                    cordial decisions
                    such as awarding scholarships, there needs to exist a better method for recording attendance and
                    quantifying the
                    effects of class presence. To address such problems, mapp proposes to fill the gap.
                </p>
            </div>

            <div className="mb-4">
                <strong className="font-bold">How is Mapp different?</strong>
                <p>MAPP (Mentally and physically present) app allows mentors and instructors to not only capture the
                    physical
                    presence of students in a class, but also allows them leave notes about each student, and each class
                    session, to capture important details about the individual and collective student population of a
                    course.
                    The course admin is also able to generate QR codes for each student added to a course.

                    The QR Code feature allows students to record their presence by scanning a system generated QR,
                    which is unique
                    for each student and helps in minimizing the amount of fake presence in a class, as only the
                    specific student
                    has an access to their QR Code.
                    This student-led application development program will be nationally
                    recognized for its abilities and potential revenue for the entire college and IT department. Student
                    app developers
                    will receive individual credits, class credits, and letters of recommendation as recognition for
                    their expertise..
                </p>

            </div>


            <div className="mb-4">
                <strong className="font-bold">In future iterations:</strong>
                <p>In future iterations the MAPP strives to add features such as push notifications and survey tickets
                    to
                    track student attention and interaction throughout a class session, hence fulfilling its purpose of
                    capturinf mental
                    presence in the class.
                    Furthermore,students added in a class will be able to track their own attendance, receive
                    communication from their teachers,
                    and view feedback constantly. </p>
            </div>


            <div className="mb-4">
                <strong className="font-bold">APP CONTRIBUTORS:</strong> The initial app contributors are listed as
                follows:
                <p>Holly Boaz</p>
                <p>Khales Rahman</p>
                <p>Duaa Fatima Khawaja</p>
                <p>ReAnn Hollins</p>
                <p>Ti Nguyen</p>

                {/* This is a blank line */}
                <div>{'\u00a0'}</div>

                <div className="mt-2">
                    <p className="italic text-gray-500">
                        The Mapp idea was proposed by Dr.Tawanna K. Morgan, Esq. who is currently serving as faculty for
                        the Criminal Justice Department at GGC.</p>

                </div>


            </div>
        </div>
    );
}

export default About;
