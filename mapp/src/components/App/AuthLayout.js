import Background from '../../assets/sign_in_background.jpg'
import "../../styles/index.css"
import { Link } from "react-router-dom";

function AuthLayout({ page, children }) {
    return (
        <div className='grid grid-cols-3 max-w-screen-2xl h-screen'>

            < div className='col-span-2 mx-8'>

                <div className='flex flex-row w-full justify-end items-center gap-4 py-4 mb-28'>
                    <p>{(page === 'about' || page === 'signIn') ? "Don't" : 'Already'} have an account? </p>
                    {page !== 'signIn' && (
                        <Link to={page === 'signUp' ? '/signIn' : '/signUp'}>
                            <button className='px-4 py-2 border border-black rounded-full'>
                                Sign {page === 'signUp' ? 'In' : 'Up'}
                            </button>
                        </Link>
                    )}
                    {page === 'signIn' && (
                        <>
                            <Link to='/signUp'>
                                <button className='px-4 py-2 border border-black rounded-full'>
                                    Sign Up
                                </button>
                            </Link>
                            <Link to='/about'>
                                <button className='px-4 py-2 border border-black rounded-full'>
                                    About
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                <div className="mx-12">
                    {children}
                </div>

            </div>

            {/*Image*/}
            <div>
                <img className='h-full object-cover' src={Background} alt='empty classroom' />
            </div>
        </div>
    );
}

export default AuthLayout;