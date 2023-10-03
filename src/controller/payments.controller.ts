import { apiResponse } from "@helper";
import Messages from "@messages";
import { Request, Response, NextFunction } from "express";
import { PaymentsService } from "@service";

class PaymentsController {
  static async getPaymentMethods(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId: string = req.body.id;
    try {
      const response = await PaymentsService.getPaymentMethods(userId);
      if (!response) {
        const message = Messages.noCards;
        return apiResponse(res, 200, message);
      }
      const message = Messages.userCards;
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      return next(error);
    }
  }

  // static async makePayment(req: Request, res: Response, next: NextFunction) {
  //   const data = req.body;
  //   try {
  //     await PaymentsService.makePayment(data);
  //   } catch (error: any) {
  //     return next(error);
  //   }
  // }
}

export default PaymentsController;
