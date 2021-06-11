const Comment = require('../model/comment');
const Post = require('../model/post');
module.exports.create = async function(req, res) {

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);

            post.save(); 
            
            req.flash('success', 'Comment Added into the Post ! ');
            res.redirect('/');
        }
    }catch(err){
        req.flash('Error', err);
        return;
    }
};

module.exports.destroy = async function(req, res) {
    
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            // Before deleting the comment we are storing the post id so that we can 
            // update the comments array from that database later.
            let postId = comment.post;

            // Remove the comment
            comment.remove();

            // This pull update the comments array 
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            req.flash('success', 'Comment Deleted from the Post ! ');


            return res.redirect('back');
        } else {
            req.flash('Error', 'Cant delete others Comments');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('Error', err);
        return;
    }
}