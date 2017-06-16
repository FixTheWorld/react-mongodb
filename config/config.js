const path=require('path');
const config = {
    env:process.env.NODE_ENV||'development',
    api:"http://localhost:612",
    port:612,
    devScriptName:"devServer"
};
module.exports=config;
