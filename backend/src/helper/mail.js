var nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/post');
const {EMAIL,PASSWORD}=require('../../../config/keys')


function sendMail(to,subject,content){//to ,subject ,html
    // console.log("to: "+to+"   subject : "+subject+"   content: "+content)
    
    var transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 465,
        // secure: true, 
        service:'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
        });
    
        var mailOptions = {
        from: '"Team Sakshi" <noreply@noreply.com>',
        to: to,
        subject: subject,
        text: "",
        html: content,
        // attachments: [
        //   {
        //     filename: 'mailtrap.png',
        //     path: __dirname + '/mailtrap.png',
        //     cid: 'uniq-mailtrap.png' 
        //   }
        // ]
        };
    
        return new Promise(function(resolve, reject) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error start');
                    console.log(error);
                    console.log('error end');
                    resolve({
                        error:true,
                        message:error
                    });
                }
                else{
                    resolve({
                        error : false,
                        message : 'Message sent: '+ info.response
                    })
                    
                }
            });
        })
        
    
} 

exports.sendMail =sendMail