import express from 'express';
import path from "path";
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;
const app = express();

const uri = "mongodb+srv://<username>:<password>@<url>/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {});

require('./express')(app);

app.listen(port, () => {
    console.log(`server listening on ${port}`);
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/', require('./api'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../client/build', 'index.html'));
})
