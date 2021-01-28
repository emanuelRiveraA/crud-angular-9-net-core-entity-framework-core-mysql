import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  comentarios: FormGroup;
  idComentario = 0;
  accion = 'Agregar';
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.comentarios = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required],
    });
    if (+this.route.snapshot.paramMap.get('id') > 0) { //con el '+' se quita el error
      this.idComentario = +this.route.snapshot.paramMap.get('id');
    }
   }

  ngOnInit(): void {
    this.esEditar();
  }
  guardarComentario(){
    console.log(this.comentarios);    
  }
  esEditar(){
    if (this.idComentario > 0) {
      this.accion = 'Editar';
      this.comentarios.patchValue({
        titulo: 'Gladiador',
        creador: 'Thomas',
        texto: 'Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you’ll see a slightly different style of feedback.'
      })
    }
  }

}
