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
        const url = `http://localhost:3000/email/confirmation/${hash}`
        const message = {
            from: process.env.GMAIL_MAILER_MAIL,
            //to: toUser.email,
            to: process.env.GMAIL_MAILER_MAIL,
            subject: `Olá ${toUser.login}, Confirme sua conta`,
            attachments: [{
                filename: 'saci1.png',
                path: __dirname + "/res/saci1.png",
                cid: 'sacibanner'
            }],
            html: `
            <div align="center">
            <div style="background: white; max-width:50%; padding:20px; border: 1px solid black;">
                <img src="cid:sacibanner" width="250px">
                <h1>Olá ${toUser.login}!</h1>
                <p style="font-size:30px; color:red">Seja bem-vindo ao <b>SACI</b></p>
                <div align="left"style="background-color: whitesmoke; padding:50px;">
                    <div>
                        <h3>Dados de cadastro: </h3>
                    </div>
                    <p>Nome completo: <b>${toUser.name}</b></p>
                    <p>Nome de usuário: <b>${toUser.login}</b></p>
                    <p>Email: <b>${toUser.email}</b></p>
                </div>
                    <p>Para finalizar o processo de criação da sua conta</p>
                    <p>Acesse o link abaixo:</p>
                    <a href="${url}" style="font-size:30px;">Clique aqui!</a>
                    <p>Atenção! Esse link de ativação irá se expirar em <span style="color: red;">15 minutos</span> após o envio desta mensagem.</p>
                    <p>Atenciosamente a equipe Saci!</p>
                    <p style="font-size: 8pt;">Aviso: Caso tenha recebido esse email, porém não realizou nenhum cadastro, entre em contato com a equipe SACI em: <span style="color: red;">tccsaci@gmail.com</span></p>
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