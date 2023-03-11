

const Validations = () => {

    const passwordValidation = (password) =>{
        // Regex to check if a string contains uppercase, lowercase special character & number
        var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
 
        //if password
        if (password.length >= 8 ) {
         
            //comparing password with regex
            return passwordRegex.test(password);
           
        }
    }

    const validatePhone =(phone) => {

        var phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

        return phoneRegex.test(phone);
    }

    const validateEmail = (email) => {

        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return emailRegex.test(email);
    }
   

    return {passwordValidation, validateEmail, validatePhone}

}


export default Validations