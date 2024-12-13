const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear")
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

function validarCantidad(){if(txtNumber.value.length<=0){return false;} if(isNaN(txtNumber.value)){return false;} if(Number(txtNumber.value) <=0){return false;} return true;}//validarCantidad
//validación
    //1 length
    //2 Número
    //3 >0

function getPrecio(){
        return Math.round(Math.random()*10000)/100;
};//getPrecio

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont=0;
let datos = [] //con new array (); igual funciona

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true; //bandera roja al ser true permite agragar datos a tabla

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if (txtName.value.length <3){
    //1. Mostrar la alerta con el error
    //2. Borde de color rojo
    txtName.style.border = "solid red medium"
    alertValidacionesTexto.innerHTML = 
        "<strong>El nombre del producto no es correcto. </strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
    }//length<3

    if(!validarCantidad()){ //es decir, si regresa false
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += 
            "<br/><strong>La cantidad del producto no es correcto. </strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
}//!validarCantidad

if (isValid){
    cont++;
    let precio = getPrecio();

    let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`; //Agregar elementos a la tabla

                let elemento = {"cont": cont, 
                    "nombre": txtName.value,
                    "cantidad": txtNumber.value,
                    "precio": precio
    };

    datos.push(elemento)
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);

//-------------------------------------------------------- para los botones totales

costoTotal += precio * Number(txtNumber.value);
precioTotal.innerText = "$ " + costoTotal.toFixed(2);
contadorProductos.innerText = cont;
totalEnProductos += Number(txtNumber.value);
productosTotal.innerText = totalEnProductos;

//-------------------------------------------------------- para los botones totales

localStorage.setItem("costoTotal", costoTotal);
localStorage.setItem("totalEnProductos", totalEnProductos);
localStorage.setItem("cont", cont);

//-------------------------------------------------------- para el storage

txtName.value = "";
txtNumber.value = "";
txtName.focus();

}//is valid

}); //btnAgregar click

//------------------------------------------------------------------- btn clear

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
let costoTotal=0;
let totalEnProductos = 0;

btnClear.addEventListener("click",function(event){
    event.preventDefault();
    txtName.value = "";
    txtNumber.value = "";
    txtName.style.border = "";
    txtNumber.style.border = "";

    cont = 0;
    costoTotal=0;
    totalEnProductos = 0;
    
    precioTotal.innerText ="$ " + costoTotal;
    contadorProductos.innerText = cont;
    productosTotal.innerText=totalEnProductos;

    cuerpoTabla.innerText="";

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    precioTotal.innerText = "$ " + costoTotal;
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;

    cuerpoTabla.innerText = "";

})//btnClear click

//---------------------------------------------- storage en window (pantalla)
window.addEventListener("load", function(event){
    if(this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }//!null
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }//!null
    if(this.localStorage.getItem("cont")!=null){
        cont = Number(this.localStorage.getItem("cont"));
    }//!null
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//!null

    datos.forEach((r)=>{
        let row = `<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
                </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });//ir evaluando dato por dato de la tabla

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
})//window load
