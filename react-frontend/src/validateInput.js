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

    let is_empty = ALLOWED_EMAIL_SUFFIXES.length===1 && ALLOWED_EMAIL_SUFFIXES[0]===""

    // email errors
    if ( !email || email === '' ) newErrors.email = 'Kann nicht leer sein!'
    else if ( !/^[ -~]+$/.test(email) ) newErrors.email = 'Keine Nicht-ASCII-Zeichen!'
    else if ( email.length > 60 ) newErrors.email = 'Email zu lang!!'
    else if ( !stringContains(email, ["@"]) ) newErrors.email = 'Keine gültige Adresse!'
    //don't check emails if no pattern is given
    else if ( !is_empty && !StrEndsWithOneOf(email, ALLOWED_EMAIL_SUFFIXES) ) newErrors.email = `Email von dem Typ nicht erlaubt, erlaubt sind:: ${ALLOWED_EMAIL_SUFFIXES}`


    // name errors
    if ( !username || username === '' ) newErrors.username = 'Kann nicht leer sein!'
    else if ( !/^[ -~]+$/.test(username) ) newErrors.username = 'Keine Nicht-ASCII-Zeichen!'
    else if ( username.length < 3 ) newErrors.username = 'Benutzername zu kurz!'
    else if ( username.length > 30 ) newErrors.username = 'Benutzername zu lang!'

    return newErrors
}

/*validates some specific fields vaguely for logging in
* takes into account if verification_code is set*/
export const findFormErrorsLogin = (form, verificationNeeded, adminLogin) => {
    const {username, verification_code, admin_password} = form
    const newErrors = {}

    // name errors
    if ( !username || username === '' ) newErrors.username = 'Kann nicht leer sein!'
    else if ( !/^[ -~]+$/.test(username) ) newErrors.username = 'Keine Nicht-ASCII-Zeichen!'
    else if ( username.length < 3 ) newErrors.username = 'Benutzername zu kurz!'
    else if ( username.length > 30 ) newErrors.username = 'Benutzername zu lang!'


    if(verificationNeeded){
        // verification_code errors
        if (verification_code === '' ) newErrors.verification_code = 'Kann nicht leer sein!'
        else if ( !/^[ -~]+$/.test(verification_code) ) newErrors.verification_code = 'Keine Nicht-ASCII-Zeichen!'
        else if ( !(parseInt(verification_code) >= 100000) || !(parseInt(verification_code) <= 999999) ) newErrors.verification_code = 'Muss 6-stellig sein!'
    }

    if(adminLogin){
        if (admin_password === '' ) newErrors.admin_password = 'Kann nicht leer sein!'
        else if ( !/^[ -~]+$/.test(admin_password) ) newErrors.admin_password = 'Keine Nicht-ASCII-Zeichen!'
    }

    return newErrors
}