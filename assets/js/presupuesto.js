var arrayPresupuesto = []
var arrayGastos = []

/* objetos necesarios para guardar el presupuesto y gastos */
function encabezadoPresupuesto(){
    this.montoIncial = 0
    this.montoIngresos = 0
    this.montoGastos = 0
    this.montoSaldo = 0
    /*
    0.- ingreso inicial
    1.- ingreso gasto
    2.- ingreso ingreso

    3.- elimino gasto
    4.- elimino ingreso
     */
    this.updSaldo = function(tipo,monto){
        if(tipo === 0){
            this.montoIncial = Number(monto)
            this.montoSaldo = Number(monto)
        }else if(tipo === 1){
            this.montoGastos += Number(monto)
            this.montoSaldo -= Number(monto)
        }else if(tipo === 2){
            this.montoIngresos += Number(monto)
            this.montoSaldo += Number(monto)
        }else if(tipo === 3){
            this.montoGastos -= Number(monto)
            this.montoSaldo += Number(monto)
        }else if(tipo === 4){
            this.montoIngresos -= Number(monto)
            this.montoSaldo -= Number(monto)
        }
    }
}
function listaGastos(nombre,monto){
    this.nombre = nombre
    this.monto = Number(monto)
}

function validaPresupuesto(){
    if(arrayPresupuesto.length > 0){
        dibujarPresupuesto()
        $('#tablePresupuesto').removeClass('d-none')
    }else{
        $('#tablePresupuesto').addClass('d-none')
        $('#tableGastos').addClass('d-none')
    }
}

/* genero solo 1 presupesto */
function llenarPresupuesto(monto){
    if(arrayPresupuesto.length == 0){
        arrayPresupuesto.push(new encabezadoPresupuesto)
        arrayPresupuesto[0].updSaldo(0,monto)
    }else{
        alert('Ya existe un Presupuesto Ingresado')
    }
}

function ingresarGastos(nombre,monto){
    arrayGastos.push(new listaGastos(nombre,monto))
    arrayPresupuesto[0].updSaldo(1,monto)
    dibujarGastos()
    dibujarPresupuesto()
}

function eliminarGasto(id){
    var gNombre = arrayGastos[id].nombre
    var gMonto = arrayGastos[id].monto
    var confirmacion = confirm(`¿Esta seguro de eliminar ${gNombre} por ${gMonto.toLocaleString("es-cl",{style:"currency",currency:"CLP"})}?`)
    if(confirmacion){
        //elimino el gasto y vuelvo a dibujar
        arrayGastos.splice(id,1)
        arrayPresupuesto[0].updSaldo(3,gMonto)
        dibujarPresupuesto()
        dibujarGastos()
    }
}

function ingresarIngresos(nombre,monto){
    arrayGastos.push(new listaGastos(nombre,monto))
    arrayPresupuesto[0].updSaldo(2,monto)
    dibujarIngresos()
    dibujarPresupuesto()
}

function dibujarPresupuesto(){
    $('#tablePresupuesto').removeClass('d-none')
    $('#tablePresupuesto tbody').html('')
    for(const item of arrayPresupuesto){
        $('#tablePresupuesto tbody').append(`
            <tr>
              <td>${item.montoIncial.toLocaleString("es-cl",{style:"currency",currency:"CLP"})}</td>
              <td>${item.montoGastos.toLocaleString("es-cl",{style:"currency",currency:"CLP"})}</td>
              <td>${item.montoSaldo.toLocaleString("es-cl",{style:"currency",currency:"CLP"})}</td>
            </tr>
            `)
    }
}

function dibujarGastos(){
    $('#tableGastos').removeClass('d-none')
    $('#tableGastos tbody').html('')
    arrayGastos.forEach((gasto,index) =>{
        $('#tableGastos tbody').append(`
            <tr>
              <td>${gasto.nombre}</td>
              <td class="text-end">${gasto.monto.toLocaleString("es-cl",{style:"currency",currency:"CLP"})}</td>
              <td><button id="gasto${index}" onclick="eliminarGasto(${index})">-_-</button></span></td>
            </tr>
            `)
    })
}


$(document).ready(function(){
    validaPresupuesto()

    $(document).on('click','#btnPresupuesto',function(){
        var montoInicialPresupuesto = $('#inputPresupuesto').val()
        if(montoInicialPresupuesto == 0){
            alert('El presupuesto Inicial debe ser mayor a 0')
        }else{
            llenarPresupuesto(montoInicialPresupuesto)
            dibujarPresupuesto()
        }
    })

    $(document).on('click','#btnEgreso',function(){
        var montoGasto = $('#inputMontoEgreso').val()
        var nombreGasto = $('#inputNameEgreso').val()
        if(arrayPresupuesto.length > 0){
            if(montoGasto == 0){
                alert('El valor del gasto debe ser mayor a 0')
            }else{
                ingresarGastos(nombreGasto,montoGasto)
            }
        }else{
            alert('Antes de ingresar Gastos, debe Indicar un Presupuesto')
        }
    })
})
