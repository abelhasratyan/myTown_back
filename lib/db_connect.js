const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

module.exports = mongoose;