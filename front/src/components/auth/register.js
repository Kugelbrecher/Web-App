import {useState} from "react";
import "./landing.css";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import registerRules from "../../utils/registerRules";
import {login, register} from "../../api/request";


export default function Register() {

    const [userExist, setUserExist] = useState(false);
    const navigate = useNavigate()
    const inputs = registerRules;
    const [values, setValues] = useState({
        username: "", email: "", phone: "", dob: "", zipcode: "", password: "", confirmPassword: "",
    })

    const userInfo = store.getState().totalUserInfo
    const validate = (_input, value) => {
        if (_input._pattern) {
            return _input._pattern.test(value);
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let allowContinue = true
        if (values.password !== values.confirmPassword) {
            allowContinue = false
        }
        if (allowContinue) {
            register(values).then(res => {
                console.log('reg res',res)
            if(res.result === "success"){

                login(values.username,values.password).then(res=>{
                        if (res.result === 'success'){
                            store.dispatch({
                                type:'change_user_info',
                                value:res.profile
                            })
                            // navigate('/')
                            navigate('/main',{replace: true})
                        } else {
                            console.log('login failed')
                           /* setTimeout(()=>{setFail(false)},2000)
                            console.log('login failed, failed after timeout?', fail)
                            setFail(true)*/
                        }
                    },
                ).catch(err=>{
                    console.log('login failed',err)
                    /*setTimeout(()=>{setFail(false)},2000)
                    setFail(true)*/
                })
            }
            }).catch(err=>{
                console.log('register failed',err)
            })
           /* return;
           if (userInfo.filter(user => user.username === values.username).length > 0){
               setUserExist(true)
               return
           }else{
               setUserExist(false)
           }

            const state = store.getState()
            const modifiedObject = {
                id: userInfo.length + 1,
                address: {
                    street: values.password, zipcode: values.zipcode
                },
                customReg: true,
                followers:[]
            }

            const userObj = Object.assign(modifiedObject, values)

            store.dispatch({
                type: 'change_user_info',
                value: userObj
            })

            state.totalUserInfo.push(userObj)
            const newTotalInfo = state.totalUserInfo

            store.dispatch({
                type: 'change_total_user_info',
                value: newTotalInfo
            })
            navigate('/main', {replace: true})*/
        }
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (<div className="register-form">
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map((input) => (<FormInput key={input.id}
                                               {...input}
                                               values={values}
                                               value={values[input.name]}
                                               onChange={onChange}
            />))}
            <button className="landing-btn">
                {/*<Link to="/main">Register</Link>*/}
                Register
            </button>
            {userExist && <span className="error-message">{'Username already exist!'}</span>}
        </form>
        {/*<button onClick={() => props.onFormSwitch("login")}>Already have an account? Login now!</button>*/}
    </div>);
};


// component for each input of the form
const FormInput = (props) => {
    const {label, errorMessage, onChange, id, values, ...inputProps} = props;
    const [showError, setShowError] = useState(false)

    const onBlur = () => {
        if (inputProps._pattern) {
            if (!inputProps._pattern.test(props.value)) {
                setShowError(true)
                console.log('onBlur', inputProps._pattern.test(props.value))
            } else {
                setShowError(false)
            }
        }
        if (inputProps.name === 'confirmPassword') {
            if (values.password && values.confirmPassword && values.password === values.confirmPassword) {
                setShowError(false)
            } else {
                setShowError(true)
            }
        }
    }

    return (<div className="register-form-input">
        <label>{label}</label>
        <input
            {...inputProps}
            onChange={onChange}
            value={props.value}
            onBlur={onBlur}
        />
        {showError && <span className="error-message">{errorMessage}</span>}
    </div>);
};
// export default FormInput;

/*                  JavaScript Identifier
* usually starts with a letter, underscore (_), or dollar sign ($)
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#identifiers
* https://stackoverflow.com/questions/16046532/what-does-variable-name-mean-in-javascript
* */
