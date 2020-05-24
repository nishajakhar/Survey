module.exports.sendResponse = async (res, statusCode, message, data = '') => {
   
    res.writeHead(statusCode, { 'Content-Type': 'application/json' , 'Access-Control-Allow-Credentials' : true, 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
  
    res.write(JSON.stringify({
      status : statusCode,
      message : message,
      data : data
    }))
    res.end()
  }
