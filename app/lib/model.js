import mongoose from "mongoose";

const traineeSchema = new mongoose.Schema({
    fname:{
        required: true,
        type: String,
        min:3,
        max:40,
    },
    mname:{
        required: false,
        type: String,
        min:3,
        max:40,
    },
    lname:{
        required: true,
        type: String,
        min:3,
        max:40,
    },
    img:{
        type:String
    },
    phone:{
        type:String,
        length: 11
    },
    email:{
        type:String
    }},
    {timestamps: true})


const coachSchema = new mongoose.Schema({
    fname:{
        required: true,
        type: String,
        min:3,
        max:40,
    },
    mname:{
        required: false,
        type: String,
        min:3,
        max:40,
    },
    lname:{
        required: true,
        type: String,
        min:3,
        max:40,
    },
    img:{
        type:String
    },
    phone:{
        type:String,
        length: 11
    },
    email:{
        type:String,
        min:5,
        max:60
    }},
    {timestamps: true})

export const Trainee = mongoose.models.Trainee || mongoose.model('Trainee', traineeSchema)
export const Coach = mongoose.models.Coach || mongoose.model('Coach', coachSchema)