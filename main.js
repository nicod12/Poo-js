
document.addEventListener('DOMContentLoaded', ()=> {
    
    const formulario = document.querySelector('#formulario');
    const cardsEstudiantes = document.querySelector('#cardsEstudiantes');
    const cardsProfesores = document.querySelector('#cardsProfesores');
    const templateEstudiante = document.querySelector('#templateEstudiante').content;
    const templateProfesor = document.querySelector('#templateProfesor').content;
    const alert = document.querySelector('.alert');


    const estudiantes = [];
    const profesores = [];

    document.addEventListener('click', e => {

        if(e.target.dataset.uid) {

            if(e.target.matches('.btn-success')) {
                estudiantes.map(item => {
                    if(item.uid === e.target.dataset.uid) {
                        item.setEstado = true;
                    }

                    return item;
                });
            }

            if(e.target.matches('.btn-danger')) {
                estudiantes.map(item => {
                    if(item.uid === e.target.dataset.uid) {
                        item.setEstado = false;
                    }

                    return item;
                });

            }
            Persona.pintarPersonaUI(estudiantes, 'Estudiante');
        }
    })

    formulario.addEventListener('submit', e => {
        e.preventDefault();

        alert.classList.add('d-none');

        const datos = new FormData(formulario);
        
        const [nombre, edad, email, opcion] = [...datos.values()];

        if(!nombre.trim() || !edad.trim() || !email.trim() || !opcion.trim()) {
            console.log('algun dato en blanco');
            alert.classList.remove('d-none');
            return;
        }
        
        if(opcion === 'Estudiante') {
            const estudiante = new Estudiante(nombre, edad, email);
            estudiantes.push(estudiante);
            Persona.pintarPersonaUI(estudiantes, opcion);
    
        }

        if(opcion === 'Profesor') {
            const profesor = new Profesor(nombre, edad, email);
            profesores.push(profesor);
            Profesor.pintarPersonaUI(profesores, opcion);
        }

    });



    class Persona {
        constructor(nombre, edad, email) {
            this.nombre = nombre;
            this.edad = edad;
            this.email = email;
            this.uid = `${Date.now()}`;
        }

        static pintarPersonaUI(personas, tipo) {
            if(tipo === 'Estudiante') {
                cardsEstudiantes.textContent = '';

                const fragment = document.createDocumentFragment();

                personas.forEach(item => {
                    fragment.appendChild(item.agregarNuevoEstudiante())
                });

                cardsEstudiantes.appendChild(fragment);
            }

            if(tipo === 'Profesor') {
                cardsProfesores.textContent = '';

                const fragment = document.createDocumentFragment();

                personas.forEach(item => {
                    fragment.appendChild(item.agregarNuevoProfesor())
                });

                cardsProfesores.appendChild(fragment);
            }

        }
    }
    
    class Estudiante extends Persona {
        #estado = false;
        #estudiante = 'Estudiante'
    
        set setEstado(estado) {
            this.#estado = estado;
        }
    
        get getEstudiante(){
            return this.#estudiante;
        }
    
        agregarNuevoEstudiante() {
            const clone = templateEstudiante.cloneNode(true);
            clone.querySelector('h4 .text-primary').textContent = this.nombre;
            clone.querySelector('h6').textContent = this.getEstudiante;
            clone.querySelector('.lead').textContent = this.edad;
            clone.querySelector('h5').textContent = this.email;

            if(this.#estado){
                clone.querySelector('.badge').className = 'badge bg-success';
                clone.querySelector('.btn-success').disabled = true;
                clone.querySelector('.btn-danger').disabled = false;
            } else {
                clone.querySelector('.badge').className = 'badge bg-danger';
                clone.querySelector('.btn-danger').disabled = true;
                clone.querySelector('.btn-success').disabled = false;
            }

            clone.querySelector('.badge').textContent = this.#estado 
            ? "Aprobado"
            : "Reprobado";

            clone.querySelector('.btn-success').dataset.uid = this.uid;
            clone.querySelector('.btn-danger').dataset.uid = this.uid;

            return clone;
        }
    }
    
    class Profesor extends Persona {
        
        #profesor = 'Profesor'

        agregarNuevoProfesor(){
            const clone = templateProfesor.cloneNode(true);
            clone.querySelector('h4').textContent = this.nombre;
            clone.querySelector('h6').textContent = this.#profesor;
            clone.querySelector('.lead').textContent = this.edad;
            clone.querySelector('h5').textContent = this.email;

            return clone;
        }
    }

});  

