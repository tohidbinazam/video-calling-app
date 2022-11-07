import nodemailer from 'nodemailer'

const sentMail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        auth : {
            user : 'itvtexltd@gmail.com',
            pass : 'hjujfcrtkwqmqpax'
        }
    })

    await transporter.sendMail({
        from : 'V-Tex IT Ltd <itvtexltd@gmail.com>',
        to, subject, html
    })
}


export default sentMail