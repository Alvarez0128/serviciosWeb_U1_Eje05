const Student = require('../models/student');

let students = [
  {noControl:"19400686",nombre:"Cesar",apellido:"alv",apellido2:"jim",calificacion1:"90",calificacion2:"70",calificacion3:"80",calificacion4:"0"},
  {noControl:"19400650",nombre:"Emmanuel",apellido:"alv",apellido2:"jim",calificacion1:"70",calificacion2:"70",calificacion3:"75",calificacion4:"100"},
  {noControl:"19400650",nombre:"Brandon",apellido:"Zuñ",apellido2:"Lop",calificacion1:"80",calificacion2:"70",calificacion3:"75",calificacion4:"80"},
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
  const calificaciones = [
    parseInt(student.calificacion1),
    parseInt(student.calificacion2),
    parseInt(student.calificacion3),
    parseInt(student.calificacion4)
  ];

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
  return students.map(student => {
    const average = calculateAverage(student);
    return {
      ...student,
      promedio: average,
    };
  }).filter(student => student.promedio<70);
}
function GetOneStu(noControl) {
  return StudenFound = students.find(a=> a.noControl === noControl);
}

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getTopPerformers,
  getFailingStudents,
  GetOneStu
};
