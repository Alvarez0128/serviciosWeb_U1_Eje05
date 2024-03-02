const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();


router.get('/',(req,res)=>{
  res.json(studentController.getAllStudents());
});

router.post('/',(req,res)=>{
  const {noControl,nombre,apellido,apellido2,calificacion1,calificacion2,calificacion3,calificacion4} = req.body;
  const newStudent = studentController.createStudent(noControl,nombre,apellido,apellido2,calificacion1,calificacion2,calificacion3,calificacion4);
  res.status(201).json(newStudent);
})

// Actualizar un estudiante por su número de control (PUT)
router.put('/:noControl', (req, res) => {
  const noControl = req.params.noControl;
  const { nombre, apellido, apellido2, calificacion } = req.body;

  const updatedStudent = studentController.updateStudent(noControl, nombre, apellido, apellido2, calificacion);

  if (updatedStudent) {
    res.json(updatedStudent);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
});

// Eliminar un estudiante por su número de control (DELETE)
router.delete('/:noControl', (req, res) => {
  const noControl = req.params.noControl;
  const deletedStudent = studentController.deleteStudent(noControl);

  if (deletedStudent) {
    res.json({ message: 'Estudiante eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
});

// Obtener los tres mejores estudiantes por promedio (GET)
router.get('/top-promedios', (req, res) => {
  const topPerformers = studentController.getTopPerformers();
  res.json(topPerformers);
});

// Obtener lista de estudiantes reprobados (GET)
router.get('/reprobados', (req, res) => {
  const failingStudents = studentController.getFailingStudents();
  res.json(failingStudents);
});

// obtener estudiante por Numero de control
router.get('/:noControl', (req, res)=> {
  const nc = req.params.noControl;
  const StudenFound = studentController.GetOneStu(nc);

  if (StudenFound) {
    res.json(StudenFound);
  } else {
    res.status(404).json({ error: 'No se encontro el alumno' });
  }
});

module.exports = router