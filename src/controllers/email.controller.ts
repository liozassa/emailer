import express from 'express';
import { EmailService } from '../services/email.service';

export class EmailController {
    public path = '/email';
    public router = express.Router();
    private emailService = new EmailService();

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/', async (req, res, next) => {
            try {
                if (!req.body.addresses || !req.body.message || !req.body.subject) {
                    throw 'Invalid email params';
                }
                this.emailService.sendMail(<string>req.body.addresses, <string>req.body.message, <string>req.body.subject);
                res.status(200).json({
                    message: "Email sent successfully!",
                    success: true
                });
            } catch (error) {
                res.status(401).json({
                    message: error,
                    success: false
                });
            }
        });

        this.router.post('/activation', async (req, res, next) => {
            try {
                if (!req.body.member) {
                    throw 'Invalid email params';
                }
                this.emailService.sendActivationEmail(req.body.member);
                res.status(200).json({
                    message: "Activation Email sent successfully!",
                    success: true
                });
            } catch (error) {
                res.status(401).json({
                    message: error,
                    success: false
                });
            }
        });
    }
}