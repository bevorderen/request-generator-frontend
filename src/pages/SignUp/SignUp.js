import {reduxForm} from "redux-form"
import {isEmail, required} from "../../utils/validators"
import {createField, Input} from "../../common/FormControl"
import classes from "./SugnUp.module.css";
import {api} from "../../utils/api";
import {useHistory} from "react-router-dom";

const SignUpForm = ({handleSubmit, error, message}) => {
    return <form onSubmit={handleSubmit}>
        <h2>{message}</h2>
        {createField('email', 'Email', [required, isEmail], Input)}
        {createField('last_name', 'Last name', [required], Input)}
        {createField('first_name', 'First name', [required], Input)}
        {createField('middle_name', 'Middle name', [], Input)}
        {createField('snils', 'Snils', [required], Input)}
        {createField('inn', 'Inn', [], Input)}
        {createField('password', 'Password', [required], Input, undefined, {type: 'password'})}

        {error && <div className="error">{error}</div>}

        <div>
            <button>SignUp</button>
        </div>
    </form>
}

const SignUpReduxForm = reduxForm({form: 'SignUp'})(SignUpForm)

export const SignUp = () => {
    const history = useHistory();

    const handleSubmit = async (formData) => {
        try {
            const response = await api.signUp(formData)
            history.push("/login");
        } catch (error) {
            console.log(error)
        }

    }

    return <main className={classes.auth}>
        <section><h1>SignUp</h1>
            <SignUpReduxForm message="Join!" onSubmit={handleSubmit}/></section>
    </main>
}