  const asyncErrorHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  

   const notFound = (req,res,next)=>{
    const error = new Error(`not found : ${req.originalUrl}`);
    res.status(404);
    next(error);
  
  }

  const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ==200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message : err?.message,
      stack : err?.stack,
    });
  }; 

  module.exports= {asyncErrorHandler , notFound , errorHandler};



