// variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos ');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners()

function cargarEventListeners(){
    // cuando agregar un curso presionando anadir al carrito
    listaCursos.addEventListener('click', agregarCurso)

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // vaciar carrito

    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = []; // reseteamos el arreglo
        limpiarHtml();// limpiamos el html
    })
}

// funciones 

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// elimina cursos del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //aliminar el arreglo del carrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}
// funcion lee el contenido del html al hacer click en agregar el carrito
function leerDatosCurso(curso){
    //console.log(curso)

    // objeto de data del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un producto ya esta en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        // actualizamos la cantidad en el carrito
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorno el objeto que no fue duplicado
            }
        });
        articulosCarrito = [...cursos]

    }else {
        // agregamos el curso al carrito
         articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}

// muestra el carrito de compra en el html

function carritoHTML(){

    //limpiar el html
    limpiarHtml()

    // recorre el carrito y genera el html
    articulosCarrito.forEach(curso =>{
        const {titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr')
        row.innerHTML=`
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>

        `;

        contenedorCarrito.appendChild(row)
    })
}

// elimina los cursos del tbody( para limpiar html).
function limpiarHtml(){
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}

}


