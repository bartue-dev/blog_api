const CustomErr  = require("../utils/customErr");

const handlePrismaError = (err) => {
  // let customErr;
  switch (err.code){
    case "P2001": 
      // record not found
       return new CustomErr(`${err.meta.target} not found`, 400);
       // break;
    case "P2002": 
      // handling duplicate err
       return new CustomErr(`Duplicate field value: ${err.meta.target}`, 400);
       // break;
    case "P2005":
      // handling invalid data err
       return new CustomErr(`Invalid input value: ${err.meta.target}`, 400);
       // break;
    case "P2025":
      // Operation failed due to records were not found
       return new CustomErr(`Invalid input value: ${err.meta.target}`, 400);
       // break;
    default: 
      // handling other err
      return new CustomErr(`Something went wrong: ${err.message}`, 500);
      // break;
  }

  // throw customErr;
}


module.exports = handlePrismaError;
