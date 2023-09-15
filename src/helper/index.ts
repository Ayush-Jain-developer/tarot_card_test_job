import { Response } from "express"
import Joi from "joi"
import { BadRequestExceptionError } from "@exceptions"

export const errorMessage = (word:string,message:string)=>{
    const originalString = message
    const wordToReplace = '"value"'
    const newWord = word
    const regex = new RegExp (wordToReplace, "gi")
    return originalString.replace(regex,newWord)
}

export class ValidateFields {
    static stringRequired(field:any,word:string){
        const schema = Joi.string().required()
        const validation = schema.validate(field)
        if(validation.error){
            const message = errorMessage(
                word,
                validation.error.details[0].message
              );
              throw new BadRequestExceptionError(message);
        }
    }
}

export const apiResponse = (res:Response,statusCode:number,message:string,data?:any)=>{
    res.json({
        status: statusCode,
        message: message,
        data : data || []
    })
}