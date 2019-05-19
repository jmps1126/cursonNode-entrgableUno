const fs = require('fs');
const courses = [
    {
        id: 1,
        nombre: 'Matamáticas',
        duracion: '20 horas',
        valor: '$ 4.000.000'
    },
    {
        id: 2,
        nombre: 'Fisica',
        duracion: '40 horas',
        valor: '$ 5.000.000'
    },
    {
        id: 3,
        nombre: 'Geometría',
        duracion: '60 horas',
        valor: '$ 6.000.000'
    }
];
const options = {
    id: {
        demand: true,
        alias: 'i'
    },
    nombre: {
        demand: true,
        alias: 'n'
    },
    cedula: {
        demand: true,
        alias: 'c'
    }
};

// creación del comando para inscribir al estudiante
const argv = require('yargs').command('inscribir', 'Matricular el curso ingresado', options).argv;

//Mostrar los cursos con intervalo de dos segundos
function showCourses() {
    for (let i = 0; i < courses.length; i++) {
        setTimeout(() => {
            let infoCourses = `El curso de ${courses[i].nombre} con número de identificación ${courses[i].id} tiene una duración de ${courses[i].duracion} y su valor es de ${courses[i].valor}\n`;
            console.log(infoCourses);
        }, i * 2000);
    }
};

// Crear el archivo con la información solicitada por la historia de usuario
function createFile(course) {
    const text = `El estudiante ${argv.n} identificado con el número de identificación ${argv.c}\n
Se ha registrado exitosamente al siguiente curso:\n
Identificación: ${course.id}\n
Nombre: ${course.nombre}\n
Duración: ${course.duracion}\n
Valor: ${course.valor}`;

    fs.writeFile('infoCourse.txt', text, (err) => {
        if (err) throw err;
        console.log('Archivo creado exitosamente');
    });
};

//matricular estudiante y gernarar el archivo
function registerEstudent() {
    // const courseSelected = courses.find((course) => { course.id == argv.i });
    const courseSelected = courses.find((course) => { return course.id == argv.i });

    console.log(courseSelected);

    if (courseSelected) {
        createFile(courseSelected);
    } else {
        console.log("No se encontro un curso con el id ingresado");
    }
};



//validamos si hay algún curso seleccionado y matriculamos al estudiante si no mostramos los cursos que hay actualmente
if (argv.i && argv.n && argv.c) {
    registerEstudent();
} else {
    showCourses();
}

