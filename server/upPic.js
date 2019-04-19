const formidable=require("formidable");
const fs=require("fs");
module.exports.upPic=function(req,picName,cb){
    var form=new formidable.IncomingForm();
    form.encoding="utf-8";
    form.uploadDir="./upload";
    form.keepExtensions=true;
    form.parse(req,function(err,params,file){
        if(err){
            cb({
                ok:2,
                msg:"网络连接错误"
            })
        }
        else{
            var picInfo=file[picName];
            // 上传了图片
            if(picInfo){
                if(picInfo.size>0){
                    var keepArr=[".gif",".png",".jpg",".jpeg"];
                    var keepName=picInfo.name.substr(picInfo.name.lastIndexOf(".")).toLowerCase();
                    if(keepArr.includes(keepName)){
                        var newPicName=Date.now()+keepName;
                        fs.rename(picInfo.path,"./upload/"+newPicName,function(err){
                            cb({
                                ok:1,
                                params,
                                newPicName
                            })
                        })
                    }else{
                        fs.unlink(picInfo.path,function(err){
                            cb({
                                ok:2,
                                msg:"请选择正确的图片：.gif,.png,.jpg"
                            })
                        })
                    }
                }else{//  未上传图片
                    fs.unlink(picInfo.path,function(err){
                        cb({
                            ok:3,
                            params // 除图片以外的信息
                        })
                    })
                }
            }else{
                cb({
                    ok:3,
                    params
                })
            }
            
        }
    })
}