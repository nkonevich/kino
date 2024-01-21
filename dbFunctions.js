const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  })
  
  const User = mongoose.model('User', userSchema)


// getAllDocs: async () => {
//     return await db.collection(coll).find().toArray()
// }