import logo from '../images/logo.png';
import cover from '../images/image.png';
import Form from '../components/Form';
import './Register.css';


function Register() {
    return (
        <div className="Register">
            <div className="container1">
                <img className="logo" src={logo} alt="logo" />
                <img className="cover" src={cover} alt="cover-image" />
            </div>
            <div className="container2">
                <Form />
            </div>
        </div>
    );


}
export default Register;