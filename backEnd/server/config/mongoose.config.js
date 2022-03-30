const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Ayee you connected to MongoDB!!!"))
    .catch(err => console.log("Aw poop, you're no longer connected to the database", err));