import mongoose, {Document, Schema, ObjectId} from "mongoose";
import crypto from 'crypto'

export interface UsersStructure extends Document{
    name: string;
    email: string; 
    set_password: (password: string) => void;
    valid_pass : (password: string) => boolean;
}

const UsersStructureSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, 
            required: true, 
            match: [/^[^@]+@[^@]+\.[^@]+$/g, 'must follow email pattern _@_._']
    },
    passwordHash: {type: String, required: true},
    passwordSalt: {type: String, required: true}, 
});

UsersStructureSchema.methods.set_password = function(password: string){
    this.passwordSalt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');
    return;
}

//Check against password hashes using crypto
UsersStructureSchema.methods.valid_pass = function(password: string){
    const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');
    return this.passwordHash === hash;
}

export default mongoose.model<UsersStructure>("User", UsersStructureSchema);