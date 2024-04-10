function validateForm() {
    try {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        const generateIdCheckbox = document.getElementById('generateIdCheckbox');
        const userGeneratedID = document.getElementById('customerId').value;
        let randomNumber=0;
        if (generateIdCheckbox.checked) {
            // Checkbox is checked
             randomNumber = generateRandomNumber(1000, 9999);
        } 

        if(!generateIdCheckbox.checked && userGeneratedID === '' ){
            alert("enter your own customer ID")
            return false;
        }
        else if(!validateCustomerId(userGeneratedID)){
    
            return false;
        }
        else{
            randomNumber=userGeneratedID;
        }
        
        if (firstName.length < 2 || !validateName(firstName)) {
            alert('First Name must be at least 2 characters long and does not contain numbers');
            return false;
        }

        if (lastName.length < 2 || !validateName(lastName)) {
            alert("Last Name must be at least 2 characters long and does not contain numbers");
            return false;
        }

        if (email === '' || !isEmail(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if(!validateDateOfBirth(dob)){
            return false;
        }

        if (phone === '' || !validatePhoneNumber(phone)) {
            alert("Please enter a valid phone number format: +1(666)111-2222");
            return false;
        }

        if (password === '' || !isPasswordValid(password)) {
            alert("Password should be greater than 16 characters and must contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol.");
            return false;
        }

        console.log({
            firstName,
            lastName,
            dob,
            email,
            phone,
            password
        });


        

        alert("Form submitted succesfully. Your Customer ID is" + randomNumber);
        return true;
    } catch (error) {
        alert("Error: " + error.message);
        return false;
    }
}

function isEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateName(name) {
    let nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z'-]+)*$/;
    return nameRegex.test(name);
}

function validatePhoneNumber(phone) {
    let phoneRegex = /^\+\d{1,3}\(\d{3}\)\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
}

function isPasswordValid(password) {
    // Check if password length is greater than or equal to 16 characters
    if (password.length < 12) {
        return false;
    }

    // Check if password contains at least one lowercase letter, one uppercase letter, one digit, and one special symbol
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/;
    return regex.test(password);
}


function highlightInput(elm) {
    elm.style.background = "yellow";
}

function toUpperCase(input) {
    input.value = input.value.toUpperCase();
}

function removeHighlight(input) {
    input.style.backgroundColor = ''; // Remove background color
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleCustomerIdInput() {
    const customerIdInput = document.getElementById('customerId');
    const generateIdCheckbox = document.getElementById('generateIdCheckbox');

    if (generateIdCheckbox.checked) {
        // Generate a random ID and set it in the input field
        customerIdInput.value = generateRandomNumber(1000, 9999);
        customerIdInput.readOnly = true;
    } else {
        // Allow the user to enter a custom ID
        customerIdInput.value = '';
        customerIdInput.readOnly = false;
    }
}

function validateDateOfBirth(dobInput) {
   
    const dob = new Date(dobInput);
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());

    if (dob < minDate) {
        return true;  // DOB is valid
    } else {
        alert('Date of Birth must be at least 5 years ago.');
        return false;  // DOB is not valid
    }
}

function validateCustomerId(customerIdInput) {
    const customerId = parseInt(customerIdInput, 10);

    if (customerId >= 0 && customerId <= 9999) {
        return true;  // Customer ID is valid
    } else {
        alert('Customer ID must be between 0000 and 9999.');
        return false;  // Customer ID is not valid
    }
}