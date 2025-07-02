import mongoose, {Document, Schema, ObjectId} from "mongoose";
/* Teacher is to be created along with class,
   but only if the teacher field is added.
   
   Teachers cannot be created by themselves, and MUST
   be linked with a class.
*/
export interface TeacherStructure extends Document{
    teacher_name: string;
    teacher_contact: string;
    department: string;
    classes: ObjectId[];
}

const TeacherStructureSchema: Schema = new Schema({
    teacher_name: {type: String, required: true},
    teacher_contact: {type: String, required: true, match:[/^[^@]+@[^@]+\.[^@]+$/g, 'must follow email pattern _@_._']},
    department: {type: String},
    classes: {type: Schema.Types.ObjectId, ref: "Class"}
}); 

export default mongoose.model<TeacherStructure>("Teacher", TeacherStructureSchema);