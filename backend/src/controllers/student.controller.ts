import { Request, Response } from 'express';
import { StudentModel, IStudent } from '../models/student.model';
import UserController from './user.controller';

class StudentController extends UserController {
  // async addStudent(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { username, profile_pic, role, email, name, firstname, school, occupation, location, contact_info, formation, experience, skills, certification, languages } = req.body as IStudent;
      
  //     const newStudent = new StudentModel({ username, profile_pic, role, email, name, firstname, school, occupation, location, contact_info, formation, experience, skills, certification, languages });
      
  //     await newStudent.save();
      
  //     res.status(201).json({ message: 'Student added successfully', studentId: newStudent._id });
  //   }
  //   catch (error) {
  //     console.error('Error adding student:', error);
  //     res.status(500).json({ error: 'Error adding student' });
  //   }
  // }

  // async getAllStudents(req: Request, res: Response): Promise<void> {
  //   try {
  //     const students = await StudentModel.find({});
  //     res.json(students);
  //   } 
  //   catch (error) {
  //     console.error('Error retrieving students:', error);
  //     res.status(500).json({ error: 'Error retrieving students' });
  //   }
  // }

  // async getStudent(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { username } = req.params;
      
  //     const student = await StudentModel.findOne({ username });

  //     if (!student) {
  //       res.status(404).json({ message: 'Student not found' });
  //       return;
  //     }

  //     res.json(student);
  //   } 
  //   catch (error) {
  //     console.error('Error retrieving student:', error);
  //     res.status(500).json({ error: 'Error retrieving student' });
  //   }
  // }

  // async deleteStudent(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { username } = req.body;
      
  //     const result = await StudentModel.deleteOne({ username });

  //     if (result.deletedCount == 0) {
  //       res.status(404).json({ message: 'Student not found' });
  //       return;
  //     }

  //     res.status(200).json({ message: 'Student deleted successfully' });
  //   }
  //   catch (error) {
  //     console.error('Error deleting student:', error);
  //     res.status(500).json({ error: 'Error deleting student' });
  //   }
  // }

  // async updateStudent(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { username } = req.params;
  //     const updateData = req.body;
      
  //     const student = await StudentModel.findOne({ username });

  //     if (!student) {
  //       res.status(404).json({ message: 'Student not found' });
  //       return;
  //     }

  //     await StudentModel.updateOne({ username }, updateData);

  //     res.status(200).json({ message: 'Student updated successfully' });
  //   } catch (error) {
  //     console.error('Error updating student:', error);
  //     res.status(500).json({ error: 'Error updating student' });
  //   }
  // }
}

export default StudentController;

