/* ./src/models/classes.ts*/
import mongoose, {Document, Schema, ObjectId} from "mongoose";


export interface ClassStructure extends Document{
    name: string;
    code: string;
    room: string;
    time: Date;
    day: string;
    description: string;
    department: string;
    teacher_name: string;
    teacher_contact: string;
}
/* TODO
[ ] Expand the regex here
-[ ] Fix the Date and Time validations
[ ] Change requirements statuses -- room, department, teacher & contact, description

*/

//ClassStructureSchema follows the structure
const ClassStructureSchema: Schema = new Schema({
    name: {type: String, required: true},
    code: {
            type: String, 
            required: true,
            set: (val: string) => val.toUpperCase(),
            match: [/^[A-Z]{3,4}\d{3}$/, 'Code must be 3–4 uppercase letters followed by 3 digits']
          },
    room: {type: String, required: true},
    time: { type: Date, required: true },
    day: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    teacher_name: { type: String, required: true },
    teacher_contact: { type: String, required: true }
});

export default mongoose.model<ClassStructure>("Class", ClassStructureSchema);