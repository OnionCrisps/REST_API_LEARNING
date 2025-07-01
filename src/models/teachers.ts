import mongoose, {Document, Schema, ObjectId} from "mongoose";

export interface TeacherStructure extends Document{
    teacher_name: string;
    teacher_contact: string;
    department: string;
    classes: ObjectId[];
}

const TeacherStructureSchema: Schema = new Schema({
    teacher_name: {type: String, required: true},
    teacher_contact: {type: String, required: true},
    department: {type: String},
    classes: {type: Schema.Types.ObjectId, ref: "Class"}
});

export default mongoose.model<TeacherStructure>("Teacher", TeacherStructureSchema);