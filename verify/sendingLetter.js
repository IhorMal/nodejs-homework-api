
const sgMail = require('@sendgrid/mail');

const sendingMail = async (email, verificationToken) => {
    const href = `http://localhost:3000/api/users/verify/${verificationToken}`
    const msg = {
      to: email,
      from: 'dimendor@meta.ua', 
      subject: 'Sending email from dimendor@meta.ua',
      html: `<p>Verify your account using the <a href="${href}">Link</a></p>`,
    }
    
    await sgMail.send(msg)
}



module.exports = {sendingMail}