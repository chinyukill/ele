const express = require('express');
const app = express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const bodyParser=require('body-parser');
const md5=require('md5');
const common =require('./common');
const formidable=require("formidable");
const fs=require('fs');
const {upPic}=require('./upPic');
app.use(bodyParser.json());
app.use(express.static('./upload'))
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','content-type');
	res.header('Access-Control-Allow-Methods','DELETE')
    next()
})
function _connect(cb){
	mongoClient.connect("mongodb://127.0.0.1:27017",{useNewUrlParser:true},function(err,client){
		cb(client.db("ele"))
	})
}//连接数据库

function insertOne(coll,insertObj,cb){
	_connect(function(db){
		db.collection(coll).insertOne(insertObj,cb)
	})
}//插入数据
function find(coll,findObj,cb){
	findObj.select=findObj.select||{};
	findObj.sortObj=findObj.sortObj||{};
	findObj.skipNum=findObj.skipNum||0;
	findObj.limitNum=findObj.limitNum||0;
	_connect(function(db){
		db.collection(coll).find(findObj.select).sort(findObj.sortObj).skip(findObj.skipNum).limit(findObj.limitNum).toArray(cb)
	})
}//查找
function findOneById(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
function count(coll,select,cb){
	_connect(function(db){
		db.collection(coll).countDocuments(select).then(cb)
	})
}
function deleteOneById(coll,selectId,cb){
	_connect(function(db){
		db.collection(coll).deleteOne({_id:mongodb.ObjectId(selectId)},cb)
	})
}
function deleteOneByOther(coll,deleteObj,cd){
	_connect(function(db){
		db.collection(coll).deleteOne(deleteObj,cb)
	})
}
function updateOneById(coll,selectId,updateObj,cb){
	_connect(function(db){
		db.collection(coll).updateOne({_id:mongodb.ObjectId(selectId)},updateObj,cb)
	})
}
function findOne(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).findOne(whereObj,cb)
    })
}
function updateOne(coll,whereObj,updateObj,cb){
	_connect(function(db){
		db.collection(coll).updateOne(whereObj,updateObj,cb)
	})
}
function getAdminLogList(skip,limit,cb){
	_connect(function(db){
		db.collection("adminLogList").aggregate([
			{$sort:{addTime:-1}},
			{$skip:skip},
			{$limit:limit},
			{
				$lookup:{
					from:"adminList",
					localField:"adminId",
					foreignField:"_id",
					as:"adminInfo"
			}
			},
			{
				$lookup:{
					from:"logType",
					localField:"type",
					foreignField:"typeNum",
					as:"typeInfo"

				}
			}
		]).toArray(cb);
	})
}
function getShopList(cb){
	_connect(function(db){
		db.collection('shopList').aggregate([
			{$sort:{addTime:-1}},
			{
				$lookup:{
					from:'shopTypeList',
					localField:'shopTypeId',
					foreignField:'_id',
					as:"typeInfo"
				}
			}
		]).toArray(cb)
	})
}
function getGoodsType(cb){
    _connect(function(db){
		db.collection('goodsTypeList').aggregate([
			{$sort:{addTime:-1}},
			{
				$lookup:{
					from:'shopList',
					localField:'shopId',
					foreignField:'_id',
					as:"shopInfo"
				}
			}
		]).toArray(cb)
	})
}
function getGoodsList(cb){
	_connect(function(db){
		db.collection('goodsList').aggregate([
			{$sort:{addTime:-1}},
			{
				$lookup:{
					from:'shopList',
					localField:'shopId',
					foreignField:'_id',
					as:"shopInfo"
				}
			},
			{
				$lookup:{
					from:'goodsTypeList',
					localField:'goodsTypeId',
					foreignField:'_id',
					as:"goodsTypeInfo"
				}
			}
		]).toArray(cb)
	})
}
app.post('/login',function(req,res){
	// console.log(md5(req.body.adminPassWord+'"@ele.me"'),req.body.adminName)
    findOne('adminList',{
		adminName:req.body.adminName,
		adminPassWord:md5(req.body.adminPassWord+'"@ele.me"')
	},function(err,adminInfo){
		if(adminInfo){
			updateOne('adminList',{
				adminName:adminInfo.adminName
			},{
				$set:{lastLoginTime:Date.now()}
			},function(err,results){
				// console.log(results)
				insertOne('adminLogList',{
					adminId:adminInfo._id,
					type:1,//操作类型，1：登录，2：增加商品，3：更新商品，4：删除商品，5：增加店铺，6：更新店铺，7：删除店铺
					detail:adminInfo.adminName+"在"+common.getNowTime()+"登录了该系统",//操作细节
					addTime:Date.now()//操作时间
				})
				res.json({
					ok:1,
					adminId:adminInfo._id,
					adminName:adminInfo.adminName,
					msg:"恭喜你登录成功"
				})				
			})
		}else{
			res.json({
				ok:2,
				msg:"用户名或密码错误"
			})
		}
		
	})
})
app.get('/getAdminLogList',function(req,res){
	count('adminLogList',{},function(count){
		var pageIndex=req.query.pageIndex/1||1;
		var pageNum=5;
		var pageSum=Math.ceil(count/pageNum);
		if(pageSum<1)
		pageSum=1;
		if(pageIndex>pageSum)
		pageIndex=pageSum;
		if(pageIndex<1)
		pageIndex=1;
		getAdminLogList((pageIndex-1)*pageNum,pageNum,function(err,adminLogList){
			res.json({
				ok:1,
				adminLogList,
				// logTypeEnum:eleEnum.logType
				pageSum,
				pageIndex
			})
		})
	})
	
})
app.get('/deletaAdminLog',function(req,res){
	deleteOneById('adminLogList',req.query.id,function(err,results){
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
})
app.post('/updateAdminPassWord',function(req,res){
	findOneById("adminList",req.body.adminId,function(err,adminInfo){
		if(adminInfo){
			if(adminInfo.adminPassWord==md5(req.body.passWord+'"@ele.me"')){
				insertOne('adminLogList',{
					adminId:adminInfo._id,
					type:2,//操作类型，1：登录，2：增加商品，3：更新商品，4：删除商品，5：增加店铺，6：更新店铺，7：删除店铺
					detail:adminInfo.adminName+"在"+common.getNowTime()+"修改了密码",//操作细节
					addTime:Date.now()//操作时间
				})
				updateOneById("adminList",adminInfo._id,{$set:{adminPassWord:md5(req.body.newPassWord+'"@ele.me"')}},function(err,results){
					res.json({
						ok:1,
						msg:"修改密码成功"
					})
				})
			}else{
				res.json({
					ok:2,
					msg:"旧密码输入错误"
				})
			}
		}else{
			res.json({
				ok:2,
				msg:"你的用户名不存在"
			})
		}
	})
})
app.get('/getAdminList',function(req,res){
	find('adminList',{},function(err,adminList){
		res.json({
			ok:1,
			adminList
		})
	})
})
app.post('/addAdmin',function(req,res){
	findOne('adminList',{adminName:req.body.adminName},function(err,results){
		if(!results){
			insertOne('adminList',{
				adminName:req.body.adminName,
				adminPassWord:md5(req.body.adminPassWord+'"@ele.me"'),
				addTime:Date.now(),
				lastLoginTime:0		
			},function(err,results){
				res.json({
					ok:1,
					msg:"添加成功"
				})
			})
		}else{
			res.json({
				ok:2,
				msg:"该用户已存在"
			})
		}

		
	})
	
})
app.post('/addShopType',function(req,res){
	upPic(req,'shopTypePic',function(obj){
		if(obj.ok==1){
			insertOne('shopTypeList',{
				shopType:obj.params.shopType,
				shopTypePic:obj.newPicName,
				orderNum:obj.params.orderNum,
				addTime:Date.now(),
				lastUpTime:Date.now()
			},function(){
				findOneById('adminList',obj.params.adminId,function(err,adminInfo){
					insertOne('adminLogList',{
						adminId:mongodb.ObjectID(obj.params.adminId),
						type:3,
						detail:adminInfo.adminName+"在"+common.getNowTime()+"增加了店铺类别"+obj.params.shopType,//操作细节
						addTime:Date.now()//操作时间
					},function(err,results){
						res.json({
							ok:1,
							msg:"增加店铺类型成功并写入管理员日志成功"
						})
					})
				})

				
			})
			
		}else{
			res.json({
				ok:obj.ok,
				msg:obj.msg
			})
		}
	})
})
app.get('/getShopType',function(req,res){
	find('shopTypeList',{sortObj:{addTime:-1}},function(err,shopTypeList){
		res.json({
			ok:1,
			shopTypeList
		})
	})
})
app.delete('/deleteShopType',function(req,res){//图片也需要删除
	findOneById('shopTypeList',req.query.id,function(err,shopTypeInfo){
		var picName=shopTypeInfo.shopTypePic;
		fs.unlink('./upload/'+picName,function(err){
			if(!err){
				deleteOneById('shopTypeList',req.query.id,function(err,results){
					deleteOneByOther('shopList',{shopTypeId:mongodb.ObjectId(req.query.id)},function(err,results){
						findOneById('adminList',req.query.adminId,function(err,adminInfo){
							insertOne('adminLogList',{
								adminId:mongodb.ObjectID(req.query.adminId),
								type:4,
								detail:adminInfo.adminName+"在"+common.getNowTime()+"删除了店铺类别"+shopTypeInfo.shopType,//操作细节
								addTime:Date.now()//操作时间
							},function(err,results){
								res.json({
									ok:1,
									msg:"删除店铺类型和此类型下所有店铺并写入管理员日志成功"
								})
							})
						})
					})
				})
			}
		})
	})
})
app.post('/addShop',function(req,res){
	upPic(req,'shopPic',function(obj){
		if(obj.ok===1){
			insertOne('shopList',{
				shopName:obj.params.shopName,
				shopPic:obj.newPicName,
				shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),
				addTime:Date.now(),
				lastUpTime:Date.now()
			},function(){
				findOneById('adminList',obj.params.adminId,function(err,adminInfo){
					insertOne('adminLogList',{
						adminId:mongodb.ObjectID(obj.params.adminId),
						type:5,
						detail:adminInfo.adminName+"在"+common.getNowTime()+"增加了店铺"+obj.params.shopName,
						addTime:Date.now()
					},function(err,results){
						res.json({
							ok:1,
							msg:"添加店铺且写入管理员日志成功"
						})
					})
				})
			})
		}else{
			res.json({
				ok:2,
				msg:obj.msg
			})
		}
	})
})
app.get('/getShop',function(req,res){
	getShopList(function(err,shopList){
		res.json({
			ok:1,
			shopList
		})
	})
})
app.delete('/deleteShop',function(req,res){
	findOneById('shopList',req.query.id,function(err,shopInfo){
		if(shopInfo){
			fs.unlink('./upload/'+shopInfo.shopPic,function(err){
				deleteOneById('shopList',req.query.id,function(err,results){
					findOneById('adminList',req.query.adminId,function(err,adminInfo){
						insertOne('adminLogList',{
							adminId:mongodb.ObjectID(req.query.adminId),
							type:6,
							detail:adminInfo.adminName+"在"+common.getNowTime()+"删除了店铺"+shopInfo.shopName,
							addTime:Date.now()
						},function(err,results){
							res.json({
								ok:1,
								msg:"删除店铺且写入管理员日志成功"
							})
						})
					})
				})
			})
		}else{
			res.json({
				ok:2,
				msg:"没有找到此条店铺信息"
			})
		}
	})
})
app.get('/getShopTypeById',function(req,res){
	findOneById('shopTypeList',req.query.id,function(err,shopTypeInfo){
		res.json({
			ok:1,
			shopTypeInfo
		})
	})
})
app.post('/updateShopType',function(req,res){
	upPic(req,'shopTypePic',function(obj){
		if(obj.ok==2){
			res.json({
				ok:obj.ok,
				msg:obj.msg
			})
		}else{
			var upObj={
				$set:{
					shopType:obj.params.shopType,
					orderNum:obj.params.orderNum,
					lastUpTime:Date.now()
				}
			}
			if(obj.newPicName){
				upObj.$set.shopTypePic=obj.newPicName;
				findOneById('shopTypeList',obj.params._id,function(err,shopTypeInfo){
					fs.unlink('./upload/'+shopTypeInfo.shopTypePic,function(err){
						console.log("删除旧图片成功")
					})
				})
				
			}
			updateOneById('shopTypeList',obj.params._id,upObj,function(err,results){
				findOneById('adminList',obj.params.adminId,function(err,adminInfo){
					insertOne('adminLogList',{
						adminId:mongodb.ObjectID(obj.params.adminId),
						type:7,
						detail:adminInfo.adminName+"在"+common.getNowTime()+"修改了店铺类型"+obj.params.shopType,
						addTime:Date.now()
					},function(){
						res.json({
							ok:1,
							msg:"成功修改店铺类型并写入管理员日志"
						})
					})
				})
			})
		}
	})
})
app.get('/getShopById',function(req,res){
	findOneById('shopList',req.query.id,function(err,shopInfo){
		res.json({
			ok:1,
			shopInfo
		})
	})
})
app.post('/updateShop',function(req,res){
	upPic(req,"shopPic",function(obj){
		if(obj.ok==2){
			res.json({
				ok:2,
				msg:obj.msg
			})
		}else{
			var upObj={
				$set:{
					shopName:obj.params.shopName,
					shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),
					lastUpTime:Date.now()
				}
			}
			if(obj.newPicName){
				upObj.$set.shopPic=obj.newPicName;
				findOneById('shopList',obj.params._id,function(err,shopInfo){
					fs.unlink('./upload/'+shopInfo.shopPic,function(err){
						console.log("删除店铺旧图片成功")
					})
				})
			}
			updateOneById('shopList',obj.params._id,upObj,function(err,results){
				findOneById("adminList",obj.params.adminId,function(err,adminInfo){
					insertOne('adminLogList',{
						adminId:mongodb.ObjectID(obj.params.adminId),
						type:8,
						detail:adminInfo.adminName+"在"+common.getNowTime()+"修改了店铺"+obj.params.shopName,
						addTime:Date.now()
					},function(){
						res.json({
							ok:1,
							msg:"修改店铺并写入管理员日志成功"
						})
					})
				})
			})
		}
	})
})
app.post('/addGoodsType',function(req,res){
	var form=new formidable.IncomingForm();
    form.encoding='utf-8';
    form.parse(req,function(err,params){
        insertOne('goodsTypeList',{
            shopId:mongodb.ObjectID(params.shopId),
            goodsTypeName:params.goodsTypeName,
            addTime:Date.now(),
            lastUpTime:Date.now()
        },function(err,results){
            findOneById('adminList',params.adminId,function(err,adminInfo){
                insertOne("adminLogList",{
                    adminId:mongodb.ObjectID(params.adminId),
                    type:9,
                    detail:adminInfo.adminName+"在"+common.getNowTime()+"添加商品类别"+params.goodsTypeName,
                    addTime:Date.now()
                },function(){
                    res.json({
                        ok:1,
                        msg:"添加商品类型并写入管理员日志成功"
                    })
                })
            })
        })
    })
})
app.get('/getGoodsType',function(req,res){
    getGoodsType(function(err,goodsTypeList){
        res.json({
            ok:1,
            goodsTypeList
        })
    })
})
app.get('/deleteGoodType',function(req,res){
    findOneById('goodsTypeList',req.query.id,function(err,goodsTypeInfo){
        deleteOneById('goodsTypeList',req.query.id,function(err,results){
            findOneById('adminList',req.query.adminId,function(err,adminInfo){
                insertOne('adminLogList',{
                    adminId:mongodb.ObjectID(req.query.adminId),
                    type:10,
                    detail:adminInfo.adminName+"在"+common.getNowTime()+"删除了商品类别"+goodsTypeInfo.goodsTypeName,
                    addTime:Date.now()
                },function(){
                    res.json({
                        ok:1,
                        msg:"删除类别并写入管理员日志成功"
                    })
                })
            })
        })
    })
})
app.get('/getGoodsTypeById',function(req,res){
    findOneById('goodsTypeList',req.query.id,function(err,goodsTypeInfo){
        res.json({
            ok:1,
            goodsTypeInfo
        })
    })
})
app.post('/updateGoodsType',function(req,res){
    var form=new formidable.IncomingForm();
    form.encoding='utf-8';
    form.parse(req,function(err,params){
        updateOneById('goodsTypeList',req.query._id,{
            $set:{
                goodsTypeName:params.goodsTypeName,
                shopId:mongodb.ObjectID(params.shopId),
                lastUpTime:Date.now()
            }
        },function(err,results){
            findOneById('adminList',params.adminId,function(err,adminInfo){
                insertOne('adminLogList',{
                    adminId:mongodb.ObjectID(params.adminId),
                    type:11,
                    detail:adminInfo.adminName+"在"+common.getNowTime()+"修改了商品类别"+params.goodsTypeName,
                    addTime:Date.now()
                },function(){
                    res.json({
                        ok:1,
                        msg:"修改店铺类型并写入管理员日志成功"
                    })
                })
            })
        })
    })
})
app.get('/getGoodsTypeByShop',function(req,res){
    find('goodsTypeList',{select:{shopId:mongodb.ObjectID(req.query.id)}},function(err,goodsTypeByShop){
        res.json({
            ok:1,
            goodsTypeByShop
        })
    })
})
app.post('/addGoods',function(req,res){
	upPic(req,'goodsPic',function(obj){
		if(obj.ok==1){
			insertOne('goodsList',{
				goodsName:obj.params.goodsName,
				goodsPrice:obj.params.goodsPrice,
				isHot:obj.params.isHot,
				shopId:mongodb.ObjectID(obj.params.shopId),
				goodsTypeId:mongodb.ObjectID(obj.params.goodsTypeId),
				goodsPic:obj.newPicName,
				addTime:Date.now(),
				lastUpTime:Date.now()
			},function(){
				findOneById('adminList',obj.params.adminId,function(err,adminInfo){
					insertOne('adminLogList',{
						adminId:mongodb.ObjectID(obj.params.adminId),
						type:12,
						detail:adminInfo.adminName+"在"+common.getNowTime()+"增加了商品"+obj.params.goodsName,
						addTime:Date.now()
					},function(){
						res.json({
							ok:1,
							msg:"添加商品并写入管理员日志成功"
						})
					})
				})
			})
		}
	})
})
app.get('/getGoodsList',function(req,res){
	getGoodsList(function(err,goodsList){
		console.log(goodsList)
		res.json({
			ok:1,
			goodsList
		})
	})
})
app.get('/deleteGoods',function(req,res){
	findOneById('goodsList',req.query.id,function(err,goodsInfo){
		deleteOneById('goodsList',req.query.id,function(err,results){
			findOneById('adminList',req.query.adminId,function(err,adminInfo){
				insertOne('adminLogList',{
					adminId:mongodb.ObjectID(req.query.adminId),
					type:13,
					detail:adminInfo.adminName+"在"+common.getNowTime()+"删除了商品"+goodsInfo.goodsName,
					addTime:Date.now()
				},function(err,results){
					fs.unlink('./upload/'+goodsInfo.goodsPic,function(err){
						res.json({
							ok:1,
							msg:"删除商品并写入管理员日志成功"
						})
					})
				})
			})
		})
	})
})
app.get('/getGoodsInfo',function(req,res){
	findOneById('goodsList',req.query.id,function(err,goodsInfo){
		res.json({
			ok:1,
			goodsInfo
		})
	})
})
app.post('/updateGoods',function(req,res){
	upPic(req,'goodsPic',function(obj){
		if(obj.ok==2){
			res.json({
				ok:2,
				msg:obj.msg
			})
		}else{
			var upObj={
				$set:{
					goodsName:obj.params.goodsName,
					goodsPrice:obj.params.goodsPrice,
					isHot:obj.params.isHot,
					shopId:mongodb.ObjectID(obj.params.shopId),
					goodsTypeId:mongodb.ObjectID(obj.params.goodsTypeId),
					lastUpTime:Date.now()
				}
			}
			if(obj.newPicName){
				upObj.$set.goodsPic=obj.newPicName;
				findOneById('goodsList',obj.params._id,function(err,goodsInfo){
					fs.unlink('./upload/'+goodsInfo.goodsPic,function(err){
						console.log("删除旧图片成功")
					})
				})
				
			}
			updateOneById('goodsList',obj.params._id,upObj,function(err,results){
				findOneById('adminList',obj.params.adminId,function(err,adminInfo){
					insertOne('adminLogList',{
						adminId:mongodb.ObjectID(obj.params.adminId),
						type:14,
						detail:adminInfo.adminName+"在"+common.getNowTime()+"修改了商品"+obj.params.goodsName,
						addTime:Date.now()
					},function(){
						res.json({
							ok:1,
							msg:"成功修改商品并写入管理员日志"
						})
					})
				})
			})
		}
	})
})
app.post('/addAdv',function(req,res){
	console.log(111)
	upPic(req,'advPic',function(obj){
		console.log(obj)
		if(obj.ok==1){
			insertOne('advList',{
				advName:obj.params.advName,
				advClasse:obj.params.advClass,
				advPic:obj.newPicName,
				addTime:Date.now(),
				lastUpTime:Date.now()
			},function(){
				res.json({
					ok:1,
					msg:"添加商品并写入管理员日志成功"
				})
			})
		}
	})
})
app.get('/getAdvList',function(req,res){
	find('advList',{},function(err,advList){
		res.json({
			ok:1,
			advList
		})
	})
})
app.listen(80,function(){
    console.log("服务开启成功");
})