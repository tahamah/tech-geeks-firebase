import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogo from '../../Assets/Image/google.svg'
import FacebookLogo from '../../Assets/Image/facebook.svg'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../Firebase/Firebase.init'
import toast from 'react-hot-toast'
const provider = new GoogleAuthProvider()

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        error: '',
    })

    const handleEmail = (email) => {
        if (/^\S+@\S+\.\S+$/.test(email)) {
            setEmail({ value: email, error: '' })
        } else {
            setEmail({ value: '', error: 'Invalid email !!' })
        }
    }
    const handlePassword = (password) => {
        if (password.length > 7) {
            setPassword({ value: password, error: '' })
        } else {
            setPassword({ value: '', error: 'Password too short !!' })
        }
    }
    const handleConfirmPassword = (cPassword) => {
        if (password.value === cPassword) {
            setConfirmPassword({ value: cPassword, error: '' })
        } else {
            setConfirmPassword({
                value: '',
                error: 'Those passwords didn’t match. Try again.',
            })
        }
    }
    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                console.log(user)
                navigate('/')
            })
            .catch((error) => {
                const errorMessage = error.message
                console.log(errorMessage)
            })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (email.value === '') {
            setEmail({ value: '', error: 'Email is required!!' })
        }
        if (password.value === '') {
            setPassword({ value: '', error: 'Password is required!!' })
        }

        if (email.value && password.value && confirmPassword.value) {
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user
                    toast.success('User Successfully Created', {
                        id: 'success',
                    })
                    navigate('/login')
                })
                .catch((error) => {
                    const errorMessage = error.message
                    if (errorMessage.includes('email-already-in-use')) {
                        toast.error('Already Exist', { id: 'error' })
                    } else {
                        toast.error(errorMessage)
                    }
                })
        }
    }

    return (
        <div className="auth-form-container ">
            <div className="auth-form">
                <h1>Sign Up</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <input
                                onBlur={(e) => handleEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        {email?.error && <p className="error">{email.error}</p>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input
                                onBlur={(e) => handlePassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                        {password?.error && (
                            <p className="error">{password.error}</p>
                        )}
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <div className="input-wrapper">
                            <input
                                onBlur={(e) =>
                                    handleConfirmPassword(e.target.value)
                                }
                                type="password"
                                name="confirmPassword"
                                id="confirm-password"
                            />
                        </div>
                        {confirmPassword?.error && (
                            <p className="error">{confirmPassword.error}</p>
                        )}
                    </div>
                    <button type="submit" className="auth-form-submit">
                        Sign Up
                    </button>
                </form>
                <p className="redirect">
                    Already have an account?{' '}
                    <span onClick={() => navigate('/login')}>Login</span>
                </p>
                <div className="horizontal-divider">
                    <div className="line-left" />
                    <p>or</p>
                    <div className="line-right" />
                </div>
                <div className="input-wrapper">
                    <button onClick={handleGoogleAuth} className="google-auth">
                        <img src={GoogleLogo} alt="" />
                        <p> Continue with Google </p>
                    </button>
                </div>
                <div className="input-wrapper">
                    <button className="google-auth">
                        <img src={FacebookLogo} alt="" />
                        <p> Continue with Facebook </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup
