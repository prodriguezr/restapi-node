const thisModel = require('../models/post');
const postCtrl = {};

postCtrl.getPosts = async (req, res) => {
    const posts = await thisModel.find({"deleted": false});

    res.json(posts);
}

postCtrl.getPost = async (req, res) => {
    const post = await thisModel.findById(req.params.id);

    res.json(post);
}

postCtrl.createPost = async (req, res) => {
    const post = new thisModel({
        title      : req.body.title,
        message    : req.body.message,
        user       : req.user,
        inserted   : new Date(),
        updated    : null,
        deleted    : false
    });

try {
    await post.save();
    
    res.status(200).json({
       status: 200, message: 'Post successfully saved'
    }); 
}
catch (err) {
    console.log(`postCtrl.createPost Err - ${err}`);
    res.status(500).json({status: 500, message: 'Error interno del servidor'});
}
}

postCtrl.editPost = async (req, res) => {
    const { id } = req.params;

    const post = await thisModel.findById(id);

    if (!post) {
        res.status(401).json({
            status: 401, message: 'The post does not exist'
        });
    }
    else {
        const post = {
            title   : req.body.title,
            message : req.body.message,
            updated : req.body.updated
        };
        
        await thisModel.findOneAndUpdate(id, {$set: post});

        res.status(200).json({
            status: 200, message: 'Post successfully updated'
        });
    }
}

postCtrl.deletePost = async (req, res) => {
    const post = await thisModel.findById(req.params.id);

    post.updated = new Date();
    post.deleted = true;

    await post.save();

    res.status(200).json({
        status: 200, message: 'Post successfully deleted'
    });
}

module.exports = postCtrl;