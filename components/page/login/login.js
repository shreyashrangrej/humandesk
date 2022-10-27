import { useState } from "react"
import { supabase } from "../../../util/supabaseClient"


export default function Login() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function login() {
        const { error, data } = await supabase.auth.signInWithOtp({
            email
        })
        if (error) {
            console.log({ error })
        } else {
            setSubmitted(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />

                <div>
                    <h1 className="text-5xl font-bold">HumanDesk</h1>
                    <p className="py-6">Login in To your HumanDesk Account</p>
                    <div className="form-control">
                        <div class="grid grid-rows-4 grid-flow-col gap-4">
                            <label className="input-group">
                                <span>Email</span>
                                <input type="text" placeholder="youremail@site.com" className="input input-bordered" onChange={e => setEmail(e.target.value)} />
                            </label>
                            <button className="btn btn-primary" onClick={() => login()}>Login</button>
                            {
                                submitted === true && (
                                    <div className="alert alert-success shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Please check your Email!</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}