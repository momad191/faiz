const nodemailer = require("nodemailer");
 
module.exports = async (email, subject,text) => {

    const transporter = nodemailer.createTransport({ 
        // pool: true,
        // host: "localhost",
        // port: 1025,
        // auth: { 
        //   user: "project.1",
        //   pass: "secret.1!"
    ///////////////////////

          host: "mail.privateemail.com",
          port: 465,
          secure: true,
          auth: {
            user: "support@faizads.com",
            pass: "Momad191!"


        }
    }); 
    
	try {

 
		await transporter.sendMail({
			from:"support@faizads.com",
			to: email,
			subject: subject,
			text: text,
			// html:html
		});
		// console.log("email sent successfully");
	} catch (error) {
		// console.log("email not sent!");
		console.log(error);
		return error;
	}
};