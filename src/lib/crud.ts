import User from "../models/users";
import Class from "../models/classes";
import Teacher from "../models/teachers"
import mongoose from "mongoose";

export async function createClass(name:string, 
                           code:string, 
                           room?:string, 
                           time?:Date, 
                           day?:string, 
                           description?:string, 
                           department?:string, 
                           teacher?:string, 
                           teacher_contact?:string) 
{
    try {
        /* Teacher is to be created along with class,
           but only if the teacher field is added.

           Teachers cannot be created by themselves, and MUST
           be linked with a class.

           If teacher name is present, but NOT teacher contact
           then teacher can be created; however, if teacher_contact
           is present, but NOT teacher name then it shouldn't be created
        */
        let new_teacher = null;

        //teacher name denial (w/ contact only)
        if (!teacher && teacher_contact) {
            console.error("❌! Cannot create teacher with contact only.");
            return;
        }

        if (teacher) {
            new_teacher = await Teacher.findOne({
                teacher_name: teacher,
                ...(teacher_contact ? { teacher_contact } : {})
            });

            if(!new_teacher){
                new_teacher = await Teacher.create({
                    teacher_name: teacher,
                    teacher_contact: teacher_contact,
                    classes: []
                });
            }   
        }

        const newClass = await Class.create({
        name, 
        code, 
        room, 
        time, 
        day, 
        description, 
        department, 
        teacher: new_teacher ? new_teacher._id : undefined, 
        teacher_contact
        });

        if(new_teacher){
            new_teacher.classes.push(newClass._id as mongoose.Schema.Types.ObjectId)
            await new_teacher.save();
        }

        console.log("✅ Class created:", newClass.code);
    } catch (err) {
        console.error("❌! Error:", err);
    }
}

//TODO: Edit classes function

export async function editClass() {
    
}

//TODO: read classes:

/*
    option to link output to different places,
    for example link output to a json file, or to console, or to txt etc
    the idea is to have it be modular enough so that when i want to 
    for example display all classes or get a class later in an HTML frontend
    its possible either directly or through the json file.
*/