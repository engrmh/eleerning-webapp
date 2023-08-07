const emailRegex = (value) => {
    //[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,5}
    const emailPattern = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,5}/g
    return emailPattern.test(value)
}

const nationalCodeRegex = () => {
    // ^[0-9]{10}$/g
    //^(?!(\d)\1{9})\d{10}$/g
}

const phoneNumber = () => {
    //09(1[0-9]|3[1-9]|2[1-9]|9[1-9])-?[0-9]{3}-?[0-9]{4}
    //static phone number (home and office) => ^0[0-9]{2,}[0-9]{7,}$
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    emailRegex,
    nationalCodeRegex,
    phoneNumber
}