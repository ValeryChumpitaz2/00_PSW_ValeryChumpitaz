import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Cita {

  paciente: string;

  fecha: string;

  hora: string;

  especialidad: string;

}


@Component({

  selector: 'app-root',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './app.component.html',

  styleUrl: './app.component.css'

})


export class AppComponent {


  // =====================================================
  // MODO DE PRUEBA
  // =====================================================

  modoBugs: boolean = false;



  // =====================================================
  // CITA
  // =====================================================

  cita: Cita = {

    paciente: '',

    fecha: '',

    hora: '',

    especialidad: ''

  };



  // =====================================================
  // LISTA DE CITAS
  // =====================================================

  citas: Cita[] = [];



  // =====================================================
  // MENSAJES
  // =====================================================

  mensaje: string = '';

  tituloMensaje: string = '';

  tipoMensaje: 'success' | 'error' | 'bug' = 'success';



  // =====================================================
  // CAMBIAR MODO
  // =====================================================

  cambiarModo(): void {

    this.modoBugs = !this.modoBugs;

    this.mensaje = '';

    this.tituloMensaje = '';

    this.limpiarFormulario();

  }



  // =====================================================
  // REGISTRAR CITA
  // =====================================================

  registrarCita(): void {


    // ================================================
    // MODO BUGS
    // ================================================

    if (this.modoBugs) {

      this.registrarCitaConBug();

      return;

    }



    // ================================================
    // MODO CORRECTO
    // ================================================

    if (!this.validarCita()) {

      return;

    }



    const nuevaCita: Cita = {

      paciente: this.cita.paciente.trim(),

      fecha: this.cita.fecha,

      hora: this.cita.hora,

      especialidad: this.cita.especialidad

    };



    this.citas.push(nuevaCita);



    this.mostrarMensaje(

      'Cita registrada correctamente',

      `La cita de ${nuevaCita.paciente} fue registrada exitosamente.`,

      'success'

    );



    this.limpiarFormulario();

  }



  // =====================================================
  // REGISTRO CON BUG INTENCIONAL
  // =====================================================

  private registrarCitaConBug(): void {


    /*
      BUG INTENCIONAL:

      El sistema permite registrar una cita
      aunque falten datos.
    */


    const tieneAlgunDato =

      this.cita.paciente.trim() !== '' ||

      this.cita.fecha !== '' ||

      this.cita.hora !== '' ||

      this.cita.especialidad !== '';



    if (!tieneAlgunDato) {

      this.mostrarMensaje(

        'No hay datos para probar',

        'Introduce algún dato para ejecutar la prueba.',

        'error'

      );

      return;

    }



    /*
      Los campos vacíos son reemplazados
      automáticamente.
    */


    const citaBug: Cita = {

      paciente:
        this.cita.paciente.trim() ||
        'Paciente sin nombre',

      fecha:
        this.cita.fecha ||
        'Sin fecha',

      hora:
        this.cita.hora ||
        'Sin hora',

      especialidad:
        this.cita.especialidad ||
        'Sin especialidad'

    };



    this.citas.push(citaBug);



    this.mostrarMensaje(

      '🐛 Bug detectado',

      'El sistema permitió registrar una cita con información incompleta.',

      'bug'

    );



    this.limpiarFormulario();

  }



  // =====================================================
  // VALIDACIÓN
  // =====================================================

  private validarCita(): boolean {


    // ================================================
    // PACIENTE
    // ================================================

    if (!this.cita.paciente.trim()) {

      this.mostrarMensaje(

        'Falta el paciente',

        'Debes introducir el nombre del paciente.',

        'error'

      );

      return false;

    }



    // ================================================
    // LONGITUD
    // ================================================

    if (this.cita.paciente.trim().length < 3) {

      this.mostrarMensaje(

        'Nombre no válido',

        'El nombre debe tener al menos 3 caracteres.',

        'error'

      );

      return false;

    }



    // ================================================
    // FECHA
    // ================================================

    if (!this.cita.fecha) {

      this.mostrarMensaje(

        'Falta la fecha',

        'Debes seleccionar una fecha para la cita.',

        'error'

      );

      return false;

    }



    // ================================================
    // HORA
    // ================================================

    if (!this.cita.hora) {

      this.mostrarMensaje(

        'Falta la hora',

        'Debes seleccionar una hora para la cita.',

        'error'

      );

      return false;

    }



    // ================================================
    // ESPECIALIDAD
    // ================================================

    if (!this.cita.especialidad) {

      this.mostrarMensaje(

        'Falta la especialidad',

        'Debes seleccionar una especialidad médica.',

        'error'

      );

      return false;

    }



    // ================================================
    // FECHA PASADA
    // ================================================

    const hoy = new Date();

    hoy.setHours(
      0,
      0,
      0,
      0
    );



    const fechaSeleccionada =
      new Date(`${this.cita.fecha}T00:00:00`);



    if (fechaSeleccionada < hoy) {

      this.mostrarMensaje(

        'Fecha no válida',

        'No puedes registrar una cita con una fecha anterior a hoy.',

        'error'

      );

      return false;

    }



    return true;

  }



  // =====================================================
  // MENSAJE
  // =====================================================

  private mostrarMensaje(

    titulo: string,

    texto: string,

    tipo: 'success' | 'error' | 'bug'

  ): void {

    this.tituloMensaje = titulo;

    this.mensaje = texto;

    this.tipoMensaje = tipo;

  }



  // =====================================================
  // LIMPIAR FORMULARIO
  // =====================================================

  private limpiarFormulario(): void {

    this.cita = {

      paciente: '',

      fecha: '',

      hora: '',

      especialidad: ''

    };

  }



  // =====================================================
  // INICIAL DEL PACIENTE
  // =====================================================

  obtenerInicial(nombre: string): string {

    if (!nombre || !nombre.trim()) {

      return '?';

    }


    return nombre
      .trim()
      .charAt(0)
      .toUpperCase();

  }

}