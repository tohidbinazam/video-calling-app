
const randomCode = (count) => {
    const list = "A1B2C3D4E5F6G7H8I9J1K2L3M4N5P6Q7R8S9T8U7V4W5X6Y3Z2";
    let code = ''
    for (let i = 0; i < count; i++) {
        const rnd = Math.floor( Math.random() * count ) 
        code = code + list.charAt(rnd)
    }

    return code
}

export default randomCode