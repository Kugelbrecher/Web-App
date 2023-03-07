import {changeEmail,changePhone,changeDob,changeZipcode} from "../api/request";

const index = [{
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username",
    _pattern: /^[A-Za-z][a-zA-Z0-9]*$/,
    errorMessage: "Username must start with a letter, followed by numbers or letters",
    required: true,

}, {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "a@b.c",
    label: "Email",
    _pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
    errorMessage: "Email is invalid",
    required: true,
    changeMethod:changeEmail
}, {
    id: 3,
    name: "phone",
    type: "tel",
    placeholder: "123-456-7890",
    label: "Phone",
    _pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
    errorMessage: "Phone number format must be like 'xxx-xxx-xxxx'",
    required: true,
    changeMethod:changePhone
}, {
    id: 4, name: "dob", type: "date", placeholder: "Birthday", label: "Birthday", required: true,
    changeMethod:changeDob
}, {
    id: 5,
    name: "zipcode",
    type: "text",
    placeholder: "11111",
    label: "Zipcode",
    _pattern: /^[0-9]{5}$/,
    errorMessage: "Zipcode is invalid",
    required: true,
    changeMethod:changeZipcode
}, {
    id: 6, name: "password", type: "password", placeholder: "Password", label: "Password", required: true,
}, {
    id: 7,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    errorMessage: "Passwords do not match",
    required: true,
}];
export default index
