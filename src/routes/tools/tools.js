module.exports = {

    // find model object by id and handle errors
    getById: async function ( req, res, next, model, select=null ) {
        try {
            const { id } = req.params
            var foundObject = null
            if (select) {
                // e.g. "-password" to skip it in results
                foundObject = await model.findById(id).select(select)
            } else {
                // find
                foundObject = await model.findById(id)
            }
            
            if ( !foundObject ) {
                // id is valid but not found
                res.status(200).send({ message: "id not found" })
            } else {
                // return result
                return foundObject
            }
        } catch (error) {
            // other errors. Handled in errors.js
            next(error) 
        } 
    },


    // find all model objecs and handle errors
    getAll: async function ( req, res, next, model, select=null ) {
        try {
            var foundObjects = null
            if (select) {
                // e.g. "-password" to skip it in results
                foundObjects = await model.find().select(select)
            } else {
                // find
                foundObjects = await model.find()
            }
            return foundObjects
        } catch (error) {
            // handle errors (see errors.js)
            next(error) 
        } 
    },

    // add new
    postData: async function ( req, res, next, model ) { 
        try {
            const objectData = new model({ ...req.body });
            const newObject = await objectData.save();
            return newObject
        } catch (error) {
            next(error) 
        }
    },

    // edit
    putData: async function ( req, res, next, model ) { 
        try {
            const { id } = req.params;
            foundObject = await model.findById(id)
            if ( !foundObject ) {
                // id is valid but not found
                res.status(200).send({ message: "id not found" })
            }
            const updatedObject = await model.findByIdAndUpdate( id, req.body )
            return updatedObject
        } catch (error) {
            next(error) 
        }
    },

    // delete
    deleteData: async function ( req, res, next, model ) { 
        try {
            const { id } = req.params;
            foundObject = await model.findById(id)
            if ( !foundObject ) {
                // id is valid but not found
                res.status(200).send({ message: "id not found" })
            }
            const deletedObject = await model.findByIdAndDelete(id)
            return deletedObject
        } catch (error) {
            next(error) 
        }
    }
}