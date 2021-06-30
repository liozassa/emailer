import { Request, Response, Router } from 'express';

export class HealthController {
    public path = '';
    public router = Router();

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(['/', '/health'], async (req: Request, res: Response): Promise<void> => {
            res.status(200).json({
                status: 'Healthy',
                appName: 'Emails'
            });
        });
    }
}