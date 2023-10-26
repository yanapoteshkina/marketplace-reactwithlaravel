import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState } from "react"
import { loginUser } from "../store/actions/authActions"
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

function Login (props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const login = (e) => {
        let userData = {
            email: email,
            password: password
        }
    props.loginUser(userData, history)
    e.preventDefault();
    }

    return (
        <div>
            <Header/>
            <main className="form-signin mt-5 d-flex justify-content-center">
                <form className="col-md-6">
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                        <label for="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e) => login(e)}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        <Footer/>
        </div>
    )
}

const mapStateToProps = (state) => ({ 
    auth:state.auth
})

export default connect(mapStateToProps, {loginUser})(Login)