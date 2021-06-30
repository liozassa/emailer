import { env } from "process";
import { IMember } from "../models/member";

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

export class EmailService {

  constructor() {}

  async sendMail(addresses: string, message: string, subject: string) {
    try {
      let transporter = await nodemailer.createTransport({
        service: env.SMTP_SERVICE,
        port: env.SMTP_PORT,
        auth: {
          user: env.EMAIL_ADDRESS,
          pass: env.EMAIL_PASSWORD,
        }
      });

      let info = await transporter.sendMail({
        from: env.EMAIL_ADDRESS,
        to: addresses,
        subject: subject,
        html: message
      });

      transporter.sendMail(info, function(error: any, info: any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) { 
      console.log('Error', error);
    }
  }

  async sendActivationEmail(member: IMember) {
    try {
      const source = fs.readFileSync(path.join(__dirname, '../templates/activation_email.hbs'), 'utf8');
      const template = handlebars.compile(source);

      member.last_name = member.last_name ? member.last_name : '';
      member.first_name = member.first_name ? member.first_name : '';
      const replacements = {
        member,
        secret: member.email?.secret
      };

      let transporter = await nodemailer.createTransport({
        service: env.SMTP_SERVICE,
        port: env.SMTP_PORT,
        auth: {
          user: env.EMAIL_ADDRESS,
          pass: env.EMAIL_PASSWORD,
        }   
      });

      const html_to_send = template(replacements);

      let info = await transporter.sendMail({
        from: env.EMAIL_ADDRESS,
        to: member.email?.address,
        subject: `אימות כתובת מייל עבור ${member.first_name} ${member.last_name}`,
        html: html_to_send
      });

      transporter.sendMail(info, function(error: any, info: any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      
    } catch (error) { 
      console.log('\nError', error);
    }
  }

  readHTMLFile (path: string, callback: any) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err: any, html: any) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
  };
}