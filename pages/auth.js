import FirebaseAuth from '../components/auth/FirebaseAuth'

const Auth = () => {
    return (
        <div className="auth-wrapper">
            <div>
                <FirebaseAuth />
                <p><a href="/">Go Home</a></p>
            </div>
        </div>
    )
}

export default Auth
