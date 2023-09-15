export class BadRequestExceptionError extends Error{
    message 
    statusCode 
    constructor(message:string){
        super(message)
        this.message = message
        this.statusCode = 400
    }
}
