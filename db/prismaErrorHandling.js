const CustomErr  = require("../utils/customErr");

const handlePrismaError = (err) => {
  let customErr;
  switch (err.code){
    case "P2002": 
      //handling duplicate err
      customErr =  new CustomErr(`Duplicate field value: ${err.meta.target}`, 400);
      break;
    case "P2014":
      //handling invalid id err
      customErr = new CustomErr(`Invalid id: ${err.meta.target}`, 400);
      break;
    // case "P2003":
    //   //handling invalid data err
    //   customErr =  new CustomErr(`Invalid input data: ${err.meta.target}`, 400);
    //   break;
    case "P2005":
      //handling invalid data err
      customErr =  new CustomErr(`Invalid input value: ${err.meta.target}`, 400);
      break;
    default: 
      //handling other err
      customErr = new CustomErr(`Something went wrong: ${err.message}`, 500);
      break;
  }

  throw customErr;
}


module.exports = handlePrismaError;
