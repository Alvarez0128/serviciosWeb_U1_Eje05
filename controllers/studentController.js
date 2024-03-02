const Student = require('../models/student');

let students = [
  

];

function getAllStudents(){
  return students;
}

function createStudent(noControl,nombre,apellido,apellido2,calificacion1,calificacion2,calificacion3,calificacion4){
  const newStudent = new Student(noControl,nombre,apellido,apellido2,calificacion1,calificacion2,calificacion3,calificacion4);
  students.push(newStudent);
  return newStudent
}

function updateStudent(noControl, nombre, apellido, apellido2, calificacion1, calificacion2, calificacion3, calificacion4) {
  const studentIndex = students.findIndex(student => student.noControl === noControl);

  if (studentIndex !== -1) {
    students[studentIndex].nombre = nombre;
    students[studentIndex].apellido = apellido;
    students[studentIndex].apellido2 = apellido2;
    students[studentIndex].calificacion1 = calificacion1;
    students[studentIndex].calificacion2 = calificacion2;
    students[studentIndex].calificacion3 = calificacion3;
    students[studentIndex].calificacion4 = calificacion4;

    return students[studentIndex];
  }

  return null;
}

function deleteStudent(noControl) {
  const studentIndex = students.findIndex(student => student.noControl === noControl);

  if (studentIndex !== -1) {
    const deletedStudent = students.splice(studentIndex, 1);
    return deletedStudent[0];
  }

  return null;
}


function calculateAverage(student) {
  const calificaciones = [student.calificacion1, student.calificacion2, student.calificacion3, student.calificacion4];
  const sum = calificaciones.reduce((acc, calificacion) => acc + calificacion, 0);
  const average = sum / calificaciones.length;
  return average;
}

function getTopPerformers() {
  const sortedStudents = students.slice().sort((a, b) => calculateAverage(b) - calculateAverage(a));
  const topPerformers = sortedStudents.slice(0, 3); // Obtener los tres mejores estudiantes (puedes ajustar según sea necesario)

  const topPerformersWithAverage = topPerformers.map(student => ({
    ...student,
    promedio: calculateAverage(student)
  }));

  return topPerformersWithAverage;
}

function getFailingStudents() {
  return students.filter(student => calculateAverage(student) < 70);
}

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getTopPerformers,
  getFailingStudents
};
