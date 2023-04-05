'use strict';


function validator(request, response, next) {
  console.log(request.body)
  let name = request.body.name;
  if (!name){
    console.log('ugh oh', request.query)
    next('No name found');
  } else {
    next();
  }
}
module.exports = validator;

/*'use strict';
const validator = (req, res, next) => {
  //   console.log("validator");    
  if (req.params.name){        
    next();
      } else {        
        throw new Error ('wrong name!');    }};
module.exports = {  validator,};*/