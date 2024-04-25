import React from 'react'
import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    if (isLoading) return
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Fields')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      // errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? "errmsg" : "hidden"

  if (isLoading) return <p>Loading...</p>

  return (
    <main>
      <div className='h-full item-center mt-16'>
        {/* error message */}
        <p ref={errRef} className={`${errClass} text-error`} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-8 my-auto m-auto w-2/4 '>

            <label className="input input-bordered flex items-center gap-2" htmlFor="username" readOnly>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input
                id="username"
                ref={userRef}
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input
                type="password"
                className="grow"
                placeholder="*********"
                id="password"
                value={password}
                onChange={handlePwdInput}
                required
              />
            </label>

            <button
              title="Login"
              className="btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login