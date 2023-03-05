import {ALLOWED_EMAIL_SUFFIXES} from "./env";

let signs = ["'","'","-","\\", "/"];
function stringContains(str, arr) {
    for(let i = 0;i<arr.length;  i++){
        if(str.indexOf(arr[i]) !== -1){
            return true
        }
    }
    return false
}

function StrEndsWithOneOf(str, arr){
    for(let i = 0;i<arr.length;  i++){
        if(str.endsWith(arr[i])){
            return true
        }
    }
    return false
}


/*validates some specific fields vaguely for creating a new user*/
export const findFormErrorsCreateUser = (form) => {
    const {username, email} = form
    const newErrors = {}

    // email errors
    if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
    else if ( !/^[ -~]+$/.test(email) ) newErrors.email = 'Non ascii not allowed'
    else if ( email.length > 60 ) newErrors.email = 'email is too long!'
    else if ( !stringContains(email, ["@"]) ) newErrors.email = 'no valid email!'
    //TODO uncomment when deployed
    //else if ( !StrEndsWithOneOf(email, ALLOWED_EMAIL_SUFFIXES) ) newErrors.email = `Email of this type not allowed! Allowed: ${ALLOWED_EMAIL_SUFFIXES}`


    // name errors
    if ( !username || username === '' ) newErrors.username = 'cannot be blank!'
    else if ( !/^[ -~]+$/.test(username) ) newErrors.username = 'Non ascii not allowed'
    else if ( username.length < 3 ) newErrors.username = 'username is too short!'
    else if ( username.length > 30 ) newErrors.username = 'username is too long!'

    return newErrors
}

/*validates some specific fields vaguely for logging in
* takes into account if verification_code is set*/
export const findFormErrorsLogin = (form, verificationNeeded, adminLogin) => {
    const {username, verification_code, admin_password} = form
    const newErrors = {}

    // name errors
    if ( !username || username === '' ) newErrors.username = 'cannot be blank!'
    else if ( !/^[ -~]+$/.test(username) ) newErrors.username = 'Non ascii not allowed'
    else if ( username.length < 3 ) newErrors.username = 'username is too short!'
    else if ( username.length > 30 ) newErrors.username = 'username is too long!'


    if(verificationNeeded){
        // verification_code errors
        if (verification_code === '' ) newErrors.verification_code = 'cannot be blank!'
        else if ( !/^[ -~]+$/.test(verification_code) ) newErrors.verification_code = 'Non ascii not allowed'
        else if ( !(parseInt(verification_code) >= 100000) || !(parseInt(verification_code) <= 999999) ) newErrors.verification_code = '6digit number!'
    }

    if(adminLogin){
        if (admin_password === '' ) newErrors.admin_password = 'cannot be blank!'
        else if ( !/^[ -~]+$/.test(admin_password) ) newErrors.admin_password = 'Non ascii not allowed'
    }

    return newErrors
}