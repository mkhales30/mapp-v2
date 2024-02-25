import React from 'react';
import course_background from "../../assets/course_background.jpg";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateSelectedCourse} from "../../store/slices/selectedCourseSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";


function CourseBanner({breadCrumb, header}) {
    const course = useSelector((state) => state.selectedCourse.value)
    const dispatch = useDispatch()

    return (
        <div className='flex flex-col w-full'>
            <div className='h-52'>
                <img className='w-full h-full object-cover' src={course_background} alt=""/>

                {/*If there's a custom header then display it (by default it will be the section name) */}
                {
                    header && (
                        <div className='flex flex-col text-white -mt-16 pl-12'>
                            <h1 className='text-3xl text-white '>
                                {header ?? ''}
                            </h1>
                        </div>
                    )
                }

                {/*If there's a breadcrumb then display it*/}
                {
                    breadCrumb && (
                        <div className='text-white -mt-16 pl-12 flex flex-row gap-2 items-center'>
                            <div className='hover:cursor-pointer hover:underline'
                                 onClick={() => dispatch(updateSelectedCourse(course))}>
                                {course?.courseName}
                            </div>
                            <FontAwesomeIcon className='w-2' icon={faChevronRight}/>
                            <div>{breadCrumb}</div>
                        </div>
                    )
                }

                {/*If there's no custom header specified then display the default Header which is the course section above the course name*/}
                {
                    !header && !breadCrumb && (
                        <div className='flex flex-col text-white -mt-16 pl-12'>
                            <div className='text-sm uppercase'>
                                {course ? `Section ${course.courseSection}` : ''}
                            </div>
                            <h1 className='text-3xl text-white '>{course?.courseName} </h1>
                        </div>
                    )
                }


            </div>
        </div>
    );
}

export default CourseBanner;