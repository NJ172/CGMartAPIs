const config = require('config')

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('Fatal error jwtPrivate key not defined')
        process.exit(1)
    }
}