const express = require('express');
const app = express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const bodyParser=require('body-parser');
const md5=require('md5');

const formidable=require("formidable");
const fs=require('fs');
app.use(express.static('./upload'))
app.use(bodyParser.json());

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
}
function insertOne(coll,insertObj,cb){
	_connect(function(db){
		db.collection(coll).insertOne(insertObj,cb)
	})
}
function find(coll,findObj,cb){
	findObj.select=findObj.select||{};
	findObj.sortObj=findObj.sortObj||{};
	findObj.skipNum=findObj.skipNum||0;
	findObj.limitNum=findObj.limitNum||0;
	_connect(function(db){
		db.collection(coll).find(findObj.select).sort(findObj.sortObj).skip(findObj.skipNum).limit(findObj.limitNum).toArray(cb)
	})
}
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
function updateMany(coll,whereObj,updateObj,cb){
	_connect(function(db){
		db.collection(coll).updateMany(whereObj,updateObj,cb)
	})
}
app.get('/getShopTypeList',function(req,res){
	find('shopTypeList',{},function(err,arr){
		var num=Math.ceil(arr.length/10);//2
    	var shopTypeList=[];
		for(var i=0;i<num;i++){
			shopTypeList[i]=[];
			for(var j=i*10;j<i*10+10 && j<arr.length;j++){
				shopTypeList[i].push(arr[j]);
			}
		}
		res.json({
			ok:1,
			shopTypeList
		})
	})
})
function randomRange(min,max){
	return Math.round(Math.random()*(max-min)+1)
}
app.get('/getVerify',function(req,res){
	var verifyCode=randomRange(1000,9999);
	findOne('clientList',{phone:req.query.phone},function(err,info){
		findOne('userList',{phone:req.query.phone},function(err,userInfo){
			if(!userInfo){
				insertOne('userList',{
					phone:req.query.phone,
					goldNum:9999,
				},function(){})
			}
			if(info){//判断时间是否过期
				if(info.addTime+5*60*1000>Date.now()){//没过期
					res.json({
						ok:1,
						verifyCode:info.verifyCode,
						msg:"获取验证码太频繁"
					})
				}else{
					console.log(verifyCode)
					updateOne('clientList',{phone:req.query.phone},{$set:{verifyCode,addTime:Date.now()}},function(){
						res.json({
							ok:1,
							verifyCode
						})
					})
				}
			}else{
				insertOne('clientList',{
					phone:req.query.phone,
					addTime:Date.now(),
					verifyCode
				},function(){
					res.json({
						ok:1,
						verifyCode
					})
				})
			}
		})
	})	
})
app.post('/goLogin',function(req,res){
	findOne('clientList',{phone:req.body.phone,verifyCode:req.body.verifyCode},function(err,info){
		if(info){
			res.json({
				ok:1,
				msg:"登录成功"
			})
		}else{
			res.json({
				ok:2,
				msg:"验证码不正确"
			})
		}
	})
})
app.get('/getUser',function(req,res){
	// console.log(req.query.phone)
	findOne('userList',{phone:req.query.phone},function(err,userInfo){
		console.log(userInfo)
		res.json({
			ok:1,
			userInfo
		})
	})
})
app.get('/getAdvList',function(req,res){
	// console.log(req.query.advClass)
	find('advList',{
		select:{
			advClasse:req.query.advClass
		}
	},function(err,advList){
		res.json({
			ok:1,
			advList
		})
	})
})
app.get('/getShopList',function(req,res){
	var pageIndex=req.query.pageIndex/1||1;
	// console.log(req.query.pageIndex)
	var pageNum=5;
	count('shopList',{},function(count){
		pageSum=Math.ceil(count/pageNum);
		if(pageIndex>pageSum)
		pageIndex=pageSum;
		if(pageIndex<1)
		pageIndex=1
		if(pageSum<1)
		pageSum=1;
		find('shopList',{
			sortObj:{addTime:-1},
			limitNum:pageNum,
			skipNum:(pageIndex-1)*pageNum
		},function(err,shopList){
			// console.log(shopList)
			res.json({
				ok:1,
				shopList,
				pageSum
			})
		})
	})
	
})
app.get('/getShopListById',function(req,res){
	var pageIndex=req.query.pageIndex/1||1;
	// console.log(req.query.pageIndex)
	var pageNum=5;
	count('shopList',{},function(count){
		pageSum=Math.ceil(count/pageNum);
		if(pageIndex>pageSum)
		pageIndex=pageSum;
		if(pageIndex<1)
		pageIndex=1
		if(pageSum<1)
		pageSum=1;
		find('shopList',{
			select:{shopTypeId:mongodb.ObjectID(req.query.id)},
			limitNum:pageNum,
			skipNum:(pageIndex-1)*pageNum
		},function(err,shopListById){
			res.json({
				ok:1,
				shopListById
			})
		})
	})
})
app.get('/getShopType',function(req,res){
	findOneById('shopTypeList',req.query.id,function(err,shopTypeInfo){
		res.json({
			ok:1,
			shopTypeInfo
		})
	})
})
function getGoodsListByST(id,cb){
	_connect(function(db){
		db.collection('goodsTypeList').aggregate([
			{
				$match:{
					shopId:mongodb.ObjectID(id)
				}
			},
			{
				$lookup:{
					from:'goodsList',
					localField:'_id',
					foreignField:'goodsTypeId',
					as:'list'
				}
			}
		]).toArray(cb)
	})

}
app.get('/getGoodsById',function(req,res){
	getGoodsListByST(req.query.id,function(err,goodsList){
		res.json({
			ok:1,
			goodsList
		})
	})
})
app.get('/getShopInfo',function(req,res){
	findOneById('shopList',req.query.id,function(err,shopInfo){
		res.json({
			ok:1,
			shopInfo
		})
	})
})
app.get('/getGoodsTypeById',function(req,res){
	find('goodsTypeList',{select:{
		shopId:mongodb.ObjectID(req.query.id)
	}},function(err,goodsTypeList){
		res.json({
			ok:1,
			goodsTypeList
		})
	})
})
app.get('/updateCart',function(req,res){
	//判断购物车中有没有这件商品，没有就加入，有就进行加减操作
	// console.log(req.query.id,req.query.type)
	findOne('cartList',{
		goodsId:mongodb.ObjectID(req.query.id),
		phone:req.query.phone,
		type:1
	},function(err,cartInfo){
		if(cartInfo){
			//存在就修改
			// console.log('修改',cartInfo)
			if(cartInfo.buyNum==1&&req.query.type/1===1){
				deleteOneById('cartList',cartInfo._id,function(){
					res.json({
						ok:1,
						msg:"成功"
					})
				})
			}else{
				var upObj={
					$inc:{}
				}
				if(req.query.type/1===1){
					upObj.$inc={
						buyNum:-1
					}
				}else{
					upObj.$inc={
						buyNum:1
					}
				}
				updateOneById('cartList',cartInfo._id,upObj,function(){
					res.json({
						ok:1,
						msg:"成功"
					})
				})
			}
			
		}else{
			//不存在就插入
			// console.log('插入',cartInfo)
			insertOne('cartList',{
				phone:req.query.phone,
				goodsId:mongodb.ObjectID(req.query.id),
				buyNum:1,
				type:1,
				createTime:Date.now(),
				overTime:0
			},function(){
				res.json({
					ok:1,
					msg:"加入成功"
				})
			})
		}
	})

})

app.get('/getCart',function(req,res){
	findOne('cartList',{
		goodsId:mongodb.ObjectID(req.query.id),
		phone:req.query.phone,
		type:1
	},function(err,cartInfo){
		findOneById('goodsList',req.query.id,function(err,goodsInfo){
			if(cartInfo){
				// console.log(cartInfo)
				
					res.json({
						ok:1,
						buyNum:cartInfo.buyNum,
						goodsPrice:goodsInfo.goodsPrice
					})
				
			}else{
				res.json({
					ok:1,
					buyNum:0,
					goodsPrice:goodsInfo.goodsPrice
				})
			}
		})
	})
})
function getCartList(id,cb){
	_connect(function(db){
		db.collection('cartList').aggregate([
			{
				$match:{
					phone:id,
					type:1
				}
			},
			{
				$lookup:{
					from:'goodsList',
					localField:'goodsId',
					foreignField:'_id',
					as:'cartGoods'
				}
			}
		]).toArray(cb)
	})

}
app.get('/getCartList',function(req,res){
	getCartList(req.query.phone,function(err,cartGoodsList){
		// console.log(cart)
		res.json({
			ok:1,
			cartGoodsList
		})
	})
})
app.get('/deal',function(req,res){
	//修改用户的金币数，修改购物车类型
	//得判断类型是不是为1，为2是不修改
	var price=req.query.price/1;
	// console.log(price)
	find('cartList',{select:{
		type:1,
		phone:req.query.phone
	}},function(err,cartInfo){
		updateOne('userList',{phone:req.query.phone},{$inc:{goldNum:-price}},function(){
			updateMany('cartList',{phone:req.query.phone},{$set:{type:2},},function(){
				res.json({
					ok:1,
					msg:"成功"
				})
			})
		})
	})
})
app.listen(80,function(){
	console.log("服务开启成功")
})