'use strict'

let successState = 0 // 表示成功
let fialState = 1 // 表示失败
// 1.0 7牛云存储域名
// let domain = 'http://ofv795nmp.bkt.clouddn.com/'
let domain = 'http://demo.dtcms.net'

exports.getlunbo = (req, res) => {
  let resObj = {
    status: successState, message: [{
		id: 1,
      url: 'http://www.itcast.cn/subject/phoneweb/index.html',
      // img: 'http://www.liulongbin.top:3005/images/lunbo1-min.jpg'
		img: 'http://www.itcast.cn/subject/webzly/images/1.jpg'
    }, {
		id: 2,
      url: 'http://www.itcast.cn/subject/phoneweb/index.html',
      // img: 'http://www.liulongbin.top:3005/images/lunbo2-min.jpg'
		img: 'http://www.itcast.cn/subject/webzly/images/1.2.jpg'
    }, {
		id: 3,
      url: 'http://www.itcast.cn/subject/phoneweb/index.html',
      // img: 'http://www.liulongbin.top:3005/images/lunbo3-min.jpg'
		img: 'http://www.itcast.cn/images/newslide/homepageandphone/20185609105606277.jpg'
    }]
  }

  res.end(JSON.stringify(resObj))

}


// 1.0 获取图片新闻资讯列表
exports.getnewslist = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 3.0 利用orm发送sql语句查询出来分页数据即可
  /*
  id : 资讯主键
  ,title : 资讯标题
  ,add_time ：资讯创建的事件
  ,zhaiyao：摘要
  ,click：点击量
  ,img_url:图片地址，前缀是7牛云存储域名
   */
  let sql = " SELECT id,title,add_time,left(zhaiyao,25) as zhaiyao,click,concat('" + domain + "',img_url) as img_url FROM dt_article where img_url > '' and channel_id = 6 limit 0,10 "
  console.log('获取图文资讯sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
    // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

// 2.0 根据资讯id获取资讯详细内容
exports.getnew = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 1.0 获取参数值
  let newid = req.params.newid

  // 2.0 执行查询操作
  let sql = 'select id,title,click,add_time,content from dt_article  where id=' + newid
  console.log('获取资讯明细sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
    // 3.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 4.0 获取数据成功
    resObj.message = data
    res.end(JSON.stringify(resObj))
  })
}

// 3.0 商品
exports.getgoods = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }
  let pageindex = req.query.pageindex
  if (!pageindex) {
    pageindex = 1;
  }
  let pagesize = 10
  let skipcount = (pageindex - 1) * pagesize

  // 3.0 利用orm发送sql语句查询出来分页数据即可
  /*
  id : 资讯主键
  ,title : 资讯标题
  ,add_time ：资讯创建的事件
  ,zhaiyao：摘要
  ,click：点击量
  ,img_url:图片地址，前缀是7牛云存储域名
   */
  let sql = `SELECT a.id,a.title,a.add_time,left(a.zhaiyao,25) as zhaiyao,a.click,concat('${domain}',a.img_url) as img_url,b.sell_price,b.market_price,b.stock_quantity FROM dt_article as a,dt_article_attribute_value b where a.id = b.article_id and a.channel_id = 7 limit ${skipcount},${pagesize} `
  console.log('获取图文资讯sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
    // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

/*
3.0.1 获取商品详情页面数据
-- 获取商品详情页标题，图文介绍信息等
SELECT * FROM dt_article da WHERE da.channel_id = 7 AND da.title LIKE '%新科%';
-- 获取商品详情页中的滚动图片
select * FROM dt_article_albums daa WHERE daa.article_id = 101;

-- 获取商品参数区域信息
SELECT daav.goods_no,daav.stock_quantity FROM dt_article_attribute_value daav  WHERE daav.article_id =101;

-- 商品品论
select * from dt_article_comment dac WHERE dac.article_id=101
 */

// 商品图文描述
exports.getgooddesc = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  let id = req.params.id;
  let sql = ` SELECT title,content FROM dt_article da WHERE da.id = ${id} `
  console.log('获取商品图文描述sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
    // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

// 获取商品标题，价格，参数区数据
// getgoodsinfo
exports.getgoodsinfo = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  let id = req.params.id;
  let sql = ` SELECT da.id,da.title,da.add_time,daa.goods_no,daa.stock_quantity,daa.market_price,daa.sell_price FROM dt_article da , dt_article_attribute_value daa 
				WHERE  da.id = daa.article_id and da.id = ${id} `
  console.log('获取商品获取商品标题，价格，参数区数据sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
    // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

//获取购物车列表数据
exports.getshopcarlist = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 1.0 获取参数值
  let ids = req.params.ids

  // 2.0 执行查询操作
  let sql = `
  			  SELECT count(distinct tb1.id) as cou, tb1.* FROM (
				SELECT  da.id,da.title,daa.sell_price,alb.thumb_path
				  FROM dt_article da 
				  LEFT JOIN dt_article_attribute_value daa ON (da.id = daa.article_id)
				  LEFT JOIN dt_article_albums alb ON (da.id = alb.article_id)
				WHERE  da.id IN(${ids}) ) AS tb1 GROUP BY tb1.id
  `

  console.log('获取购物车列表sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
    // 3.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }
		
		
		// http://ofv795nmp.bkt.clouddn.com/
		// http://vue.studyit.io
	  data.forEach(item => item.thumb_path = 'http://demo.dtcms.net' + item.thumb_path)

    // 4.0 获取数据成功
    resObj.message = data
    res.end(JSON.stringify(resObj))
  })
}


// 4.0 图片分享
exports.getimages = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  let cateid = req.params.cateid - 0

  let sql = ' select id,title,img_url,zhaiyao from dt_article where channel_id = 9 and category_id=' + cateid

  if (cateid <= 0) {
    sql = ' select * from dt_article where channel_id = 9 '
  }

  // 3.0 利用orm发送sql语句查询出来分页数据即可
  /*

   */

  console.log('获取图片分享sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
    // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

	  datas.forEach(item => {
		// http://ofv795nmp.bkt.clouddn.com/
		// http://vue.studyit.io
		item.img_url = 'http://demo.dtcms.net' + item.img_url
	  })

    // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}


// 4.0.1 根据id获取图片详细内容
exports.getimage = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 1.0 获取参数值
  let newid = req.params.imgid

  // 2.0 执行查询操作
  let sql = `select thumb_path as src  from dt_article_albums where article_id =${newid}`

  console.log('获取图片分享明细中缩略图sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
    // 3.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }
	
	data.forEach(item => {
		// http://ofv795nmp.bkt.clouddn.com/
		// http://vue.studyit.io
		item.src = 'http://demo.dtcms.net' + item.src
	})

    // 4.0 获取数据成功
    resObj.message = data
    res.end(JSON.stringify(resObj))
  })
}


// 4.0.1 根据id获取图片详细内容
exports.getimageInfo = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 1.0 获取参数值
  let newid = req.params.imgid

  // 2.0 执行查询操作
  let sql = `select id,title,click,add_time,content from dt_article where id=${newid}`

  console.log('获取图片分享明细sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
    // 3.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 4.0 获取数据成功
    resObj.message = data
    res.end(JSON.stringify(resObj))
  })
}

// 5.0 获取图片分享分类
exports.getimgcategory = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 3.0 利用orm发送sql语句查询出来分页数据即可
  /*

   */
  let sql = ' select title,id from dtcmsdb4.dt_article_category where channel_id = 9 '
  console.log('获取图片分享分类sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
    // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

//6.0 获取评论信息
exports.getcomments = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 1.0 获取参数值
  let artid = req.params.artid
  let pageindex = req.query.pageindex
  let pagesize = 10;
  let skipCount = (pageindex - 1) * pagesize

  // 2.0 执行查询操作
  let sql = `select user_name,add_time,content from dt_article_comment where article_id = ${artid} order by add_time desc limit ${skipCount},${pagesize}`

  console.log('获取评论sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
    // 3.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 4.0 获取数据成功
    resObj.message = data
    res.end(JSON.stringify(resObj))
  })
}


//7.0 提交评论数据
exports.postcomment = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  // 1.0 获取参数值
  let artid = req.params.artid
  let commentObj = req.body;


  // 2.0 执行查询操作
  let sql = `insert into  dt_article_comment(channel_id,article_id,parent_id,user_id,user_name,user_ip,
                                  content,is_lock,add_time,is_reply,reply_content,reply_time)
                    values (7,${artid},0,0,'匿名用户','127.0.0.1','${commentObj.content}',0,NOW(),0,'',NOW())`

  console.log('post提交评论sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
    // 3.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

    // 4.0 获取数据成功
    resObj.message = '评论提交成功'
    res.end(JSON.stringify(resObj))
  })

}


// 获取品牌列表
exports.getprodlist = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  var sql = 'select * from dt_brands order by id';
  req.db.driver.execQuery(sql, (err, data) => {
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
    } else {
      resObj.message = data
      res.end(JSON.stringify(resObj))
    }
  });
}


// 根据品牌Id删除品牌列表
exports.delproduct = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  var id = req.params.id;

  var sql = 'delete from dt_brands where id=' + id;
  req.db.driver.execQuery(sql, (err, data) => {
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
    } else {
      resObj.message = '删除品牌数据OK'
      res.end(JSON.stringify(resObj))
    }
  });
}


// 添加新的品牌信息
exports.addproduct = (req, res) => {
  // 代表返回的数据结构
  let resObj = { status: successState, message: '' }

  var info = req.body;

  // var sql = 'insert into dt_brands (name, ctime) values ("' + info.name + '", "' + new Date() + '")';
  var sql = 'insert into dt_brands (name, ctime) values (?, ?)';
  req.db.driver.execQuery(sql, [info.name, new Date()], (err, data) => {
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
    } else {
      resObj.message = '添加成功'
      res.end(JSON.stringify(resObj))
    }
  });
}

// 获取评论列表
exports.getcmtlist = (req, res) => {
	// 代表返回的数据结构
	let resObj = { status: successState, message: '' }
	var sql = "select * from dt_comments order by id desc limit 0, 10"
	req.db.driver.execQuery(sql, (err, data) => {
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
    } else {
      resObj.message = data
      res.end(JSON.stringify(resObj))
    }
  });
}

// 发表新评论
exports.postcmt = (req, res) => {
	// 代表返回的数据结构
	let resObj = { status: successState, message: '' }
	// 提交过来的数据
	var info = req.body;
	var sql = "insert into dt_comments (name, content) values(?,?)"
	req.db.driver.execQuery(sql, [info.name,info.content], (err, data) => {
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
    } else {
      resObj.message = '发表评论成功！'
      res.end(JSON.stringify(resObj))
    }
  });
}