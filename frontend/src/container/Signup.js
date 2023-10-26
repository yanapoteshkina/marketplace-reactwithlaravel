import {useState} from 'react'
import Header from "../component/Header"
import Footer from "../component/Footer"
import {registerUser} from '../store/actions/authActions'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

function Signup (props){
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const register = (e) => {
        let userData = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
        props.registerUser(userData, history)
        e.preventDefault()
    }

    return (
        <div>
            <Header/>
            <main className="form-signin mt-5 d-flex justify-content-center">
                <form className="col-md-6">
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                        <label>Name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                        <label for="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Repeat Password" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                        <label for="floatingPassword">Repeat Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e) => register(e)}>Sign up</button>
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

export default connect(mapStateToProps, {registerUser})(Signup)