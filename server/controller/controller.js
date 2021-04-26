var Userdb = require('../model/model')

// create & save a user
exports.create = (req, res) => {
    // validate req
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
        return res
    }
    //new user
    const user = new Userdb({
        name: req.body.name, 
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in db
    user
        .save(user)
        .then(data =>{
            // res.send(data)
            res.redirect('/add_user')
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occureeded"})
        })
}

// returb users
exports.find = (req, res) => {
    Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "Error occureed while retriving user"})
    })
}

// returb users single user
exports.find = (req, res) => {

    if(req.query.id){

        const id = req.query.id
        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Not Found User"})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error with id"+id})
        })
    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occureed while retriving user" })
            })
    }

    
}


// update a user
exports.update = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({ message: "Data cannot be empty" })
        return res
    }
    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify:false })
    .then(data =>{
        if(!data){
            res.status(404).send({ message: `Cannot Update user ${id}. Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message:"Error updating user information"})
    })
}

// delete a user
exports.delete = (req, res) => {
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message:`Cannot delete ${id}. maybe id is wrong`})
        }else{
            res.send({ 
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({ message:"Counld not delete User with id " +id})
    })
}

// module.exports = Userdb