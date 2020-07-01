const thisModel = require('../models/user');
const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    const users = await thisModel.find({"deleted": false});

    res.json(users);
}

userCtrl.getUser = async (req, res) => {
    const user = await thisModel.findById(req.params.id);

    res.json(user);
}

userCtrl.createUser = async (req, res) => {
    const user = new thisModel({
        username: req.body.username,
        name:     req.body.name,
        password: req.body.password,
        email:    req.body.email,
        office:   req.body.office,
        salary:   req.body.salary,
        inserted: new Date(),
        updated:  null,
        deleted:  false
    });

try {
    await user.save();
    
    res.json({
       status: 'User successfully saved'
    }); 
} catch (err) {
  console.log(`userCtrl.createUser Err - ${err}`);
  res.status(500).send('Error interno del servidor');
}
}

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;

    const User = await thisModel.findById(id);

    if (User == null) {
        res.json({
            status: 'The User does not exist'
        });
    }
    else {
        const User = {
            username: req.body.username,
            name:     req.body.name,
            password: req.body.password,
            email:    req.body.email,
            office:   req.body.office,
            salary:   req.body.salary,
            updated:  req.body.updated
        };
        
        await thisModel.findOneAndUpdate(id, {$set: User});

        res.json({
            status: 'User successfully updated'
        });
    }
}

userCtrl.deleteUser = async (req, res) => {
    const emp = await thisModel.findById(req.params.id);

    emp.updated = new Date();
    emp.deleted = true;

    await emp.save();

    res.json({
        status: 'User successfully deleted'
    });
}

module.exports = userCtrl;