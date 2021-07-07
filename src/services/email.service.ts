import { env } from "process";
import { IEmailVerification } from "../models/IEmailVerification.model";

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

export class EmailService {

  constructor() {}

  async sendMail(address: string, message: string, subject: string) {
    try {
      let transporter = await this.createTransport();

      const info = {
        from: env.EMAIL_ADDRESS,
        to: address,
        subject: subject,
        text: message
      };

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

  async sendActivationEmail(email_verificastion: IEmailVerification) {
    try {
      const source = fs.readFileSync(path.join(__dirname, '../templates/activation_email.hbs'), 'utf8');
      const template = handlebars.compile(source);
      const replacements = {
        address: email_verificastion.address,
        secret: email_verificastion.secret,
        company_name: env.COMPANY_NAME
      };

      const html_template = template(replacements);
      let transporter = await this.createTransport();

      let info = {
        from: env.EMAIL_ADDRESS,
        to: email_verificastion.address,
        subject: `${env.COMPANY_NAME} Verification Email`,
        html: html_template
      };

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

  private async createTransport() {
    return await nodemailer.createTransport({
      service: env.SMTP_SERVICE,
      port: env.SMTP_PORT,
      auth: {
        user: env.EMAIL_ADDRESS,
        pass: env.EMAIL_PASSWORD,
      }
    })
  }

  private readHTMLFile (path: string, callback: any) {
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