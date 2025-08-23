import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserData } from './models/user-info.js';

mongoose.connect('mongodb://localhost:27017/local')
const app = express();

app.use(cors());
app.use(express.json());

const port = 6060;
const hostName = '127.0.0.1';

app.get("/", (req, res) => {
    res.send("This Is My Backend Home Tab of Login Project")
});

app.post("/signUp", async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Check if user already exists
        const existingUser = await UserData.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({
                ok: false,
                message: "Email is already registered. Please log in.",
            });
        }

        // // Hash the password before saving (IMPORTANT)
        // const bcrypt = require("bcryptjs");
        // const hashedPassword = await bcrypt.hash(password, 10);

        const addUserData = {
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        };

        await UserData.create(addUserData);

        res.status(200).send({
            ok: true,
            message: `${name} signed up successfully.`,
        });

    } catch (err) {
        console.error(`Sign Up Error: ${err}`);
        res.status(500).send({
            ok: false,
            message: `Sign-up failed: ${err.message}`,
        });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        const result = await UserData.find({email:email, password:password});
        if(!result) {
            return res.status(400).send({
                ok: false,
                message: 'Email and PassWord is not Exist'
            });
        };

        console.log(result)
        res.status(200).send({
            ok: true,
            message: 'Login SuccessFully',
            data: result[0]
        })

    } catch(err) {
        console.log(`login ${err}`);
        res.send({
            ok: true,
            message: `login Failed due to '${err}' `
        })
    }
});

// app.get("/getData", async (req, res) => {
//     try {

//         const {email} = req.body;
//         let data = await UserData.find({email}, {email: 1, phoneNumber: 1, name: 1});
        
//         res.send({
//             ok: true,
//             data: data
//         });
        
//     } catch(err) {
//         console.log(`get ${err}`);
//         res.send({
//             ok: false,
//             message: `Some error Occured [${err}]`
//         });
//     }
// });

app.patch("/changePhoneNum", async (req, res) => {
    try {
        const {filter, update} = req.body;

        if(!filter || !update) {
            return res.send({
                ok: false,
                message: 'your New Phone-Number must be Required !!'
            });
        }

        const result = await UserData.updateOne(filter, {$set: update});
        if(result.matchedCount === 0 && result.modifiedCount === 0) {
            return res.status(400).send({
                ok: false,
                message: "No Matching Phone Number"
            })
        }

        res.send({
            ok: true,
            data: result,
            message: `${result.modifiedCount} Phone Number updated successfully`
        });
    } catch(err) {
        console.log(`patch ${err}`);
        res.send({
            ok: false,
            message: `some Error Occured [${err}]`
        })
    }
})

app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`);
});