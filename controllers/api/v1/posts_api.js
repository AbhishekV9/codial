const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

//index is usually used when you want to list down something as an action name
module.exports.index=async function(req,res){
    
    let posts=await Post.find({}) 
        .sort('-createdAt')
        .populate('user')           
        .populate({
            path:'comments',   
            populate:{         
                path:'user'     
            }
        });
       
    return res.json(200,{
        message:'List of Posts',
        posts: posts
    });
}

module.exports.destroy=async function(req,res){
    try{
        let post= await Post.findById(req.params.id)

     
            post.remove();

            await Comment.deleteMany({post:req.params.id});

            return res.json(200,{
                message:'Posts and associated comments got deleted'
            })
      
    }catch(err){
        cosnole.log(err);
        return res.json(500,{
            message:'Internal server error'
        })
    }
}
