const nodemailer = require("nodemailer")

module.exports = {

    sendConfirmationEmail: function({toUser, hash}){
        return new Promise((res, rej) =>{
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_MAILER_MAIL,
                pass: process.env.GMAIL_MAILER_PASSWORD
            }
        })
        const message = {
            from: process.env.GMAIL_MAILER_MAIL,
            //to: toUser.email,
            to: process.env.GMAIL_MAILER_MAIL,
            subject: 'Confirme sua conta',
            attachments: [{
                filename: 'saci1.png',
                path: __dirname + "/res/saci1.png",
                cid: 'sacibanner'
            }],
            html: `
            <div align="center">
                <div style="background: whitesmoke; max-width:50%; padding:20px;">
	                <img src="cid:sacibanner" width="250px">
	                <h1>Olá ${toUser.username}!</h1>
	                <p style="font-size:30px; color:red">Seja bem-vindo ao <b>SACI</b></p>
			        <p>Para finalizar o processo de criação da sua conta</p>
	                <p>Acesse o link abaixo:</p>
	                <a href="http://localhost:3000/register" style="font-size:30px;">Clique aqui!</a>
	                <p>Atenciosamente a equipe Saci!</p>
                </div>
            </div>
            `
        }
        transporter.sendMail(message, function(err, info){
            if(err){
                rej(err)
            }else{
                res(info);
            }
        })
        })
    }
}