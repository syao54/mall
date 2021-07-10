const path = require('path');//引入path模块
const resolve = dir=>path.join(__dirname,dir);
module.exports={
  chainWebpack:(config)=>{
    config.resolve.alias
      .set('components',resolve('src/components'))
      .set('views',resolve('src/views'))
      .set('assets',resolve('src/assets'))
      .set('common',resolve('src/common'))
      .set('network',resolve('src/network'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  }
}
