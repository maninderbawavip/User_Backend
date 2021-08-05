const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const path = require('path')
const userModel = require('./model/userSchema')
const userImgModel = require('./model/userProfilePicSchema')
const { MulterUpload } = require('./controller/multerController')

const { promisify } = require('util')

const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://palprem:prem@123@cluster0.llozo.mongodb.net/node-tuts?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB connected");
    }).catch((error) => console.log("error"))

app.use(cors())

const dir = path.join(__dirname + '/public');
console.log(dir)
app.use('/static', express.static(dir))

const PORT = process.env.PORT || 5000

app.post('/userImage', MulterUpload.single('file'), async function (req, res, next) {
    const savedImage = new userImgModel(req.file)
    savedImage.save()
        .then((result) => {
            console.log("wellcome", result)
            res.status(200).json({
                status: 'success',
                data: result
            })
        })
        .catch((err) => {
            console.log("err", err)
            res.status(400)
        })
})

app.get('/userImage', async (req, res) => {
    userImgModel.find()
        .then((result) => {
            console.log("wellcome", result)
            res.status(200).json({
                status: 'success',
                data: result
            })
        })
        .catch((err) => {
            console.log("err", err)
            res.status(500).send()
        })
})

app.post('/users', jsonParser, async (req, res) => {
    console.log(req.body)
    try {
        const data = new userModel(req.body)
        data.save()
            .then((result) => {
                res.status(200).json({
                    status: 'success',
                    data: result
                })
            })
            .catch((err) => {
                console.log("err", err)
                res.status(400)
            })

    } catch (error) {
        console.log(error);
    }
});

//for all data
app.get('/users', async (req, res) => {
    try {
        const data = userModel.find().populate('profileImage').sort({'_id': -1})
            .then((result) => {
                res.status(201).json({
                    status: 'success',
                    data: result
                })
            })
            .catch(err => console.log("err", err))
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err
        })
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
