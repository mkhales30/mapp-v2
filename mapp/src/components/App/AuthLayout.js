import Background from '../../assets/sign_in_background.jpg'
import "../../styles/index.css"
import {Link} from "react-router-dom";

export const AuthLayout = (props) => {
    return (
        <div className='grid grid-cols-3 max-w-screen-2xl h-screen'>

            < div className='col-span-2 mx-8'>

                <div className='flex flex-row w-full justify-end items-center gap-4 py-4 mb-28'>
                    <p>{props.page === 'signUp' ? 'Already' : 'Don\'t'} have an account? </p>
                    <Link to={props.page === 'signIn' ? '/signup' : '/'}>
                        <button
                            className='px-4 py-2 border border-black rounded-full'> Sign {props.page === 'signIn' ? 'Up' : 'In'}  </button>
                    </Link>
                    {props.page === 'signIn' && (
                        <Link to='/about'>
                            <button className='px-4 py-2 border border-black rounded-full'>
                                About
                            </button>
                        </Link>
                    )}
                </div>

                <div className="mx-24">
                    {props.children}
                </div>

            </div>

            {/*Image*/}
            <div>
                <img className='h-full object-cover' src={Background} alt='empty classroom'/>
            </div>
        </div>
    );
}