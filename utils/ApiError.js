class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        statck =""
    ){
        super(message)
        this.statusCode
        this.data = null
        this.message = message
        this.success = fales;
        this.errors = this.errors
        
        if(statck){
            this.stack = statck 
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    
    }
}

export {ApiError}