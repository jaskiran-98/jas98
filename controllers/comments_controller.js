const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create= async function(req, res)
{
    try
    {
        let post= await Post.findById(req.body.post);
        if(post)
        {
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment)
            {
                //handle error
                // adding comment to the post
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    }
    catch(err)
    {
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function(req, res)
{
    try
    {
        let comment= await Comment.findById(req.params.id);
        if(comment.user == req.user.id)
        {
            // to delete comment we go inside the post first and then delete it
            let postId= comment.post;
            comment.remove();
            let post= Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
            return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }
        
    }
    catch(err)
    {
        console.log('Error', err);
        return;
    }
}
