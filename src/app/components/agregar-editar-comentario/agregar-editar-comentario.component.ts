import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  comentarios: FormGroup;
  idComentario = 0;
  accion = 'Agregar';
  loading= false;
  comentario: Comentario;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private comentarioService: ComentarioService, private router: Router) {
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

    if (this.accion === 'Agregar') {
      const comentario: Comentario = {
        fechaCreacion: new Date(),
        titulo: this.comentarios.get('titulo').value,
        creador: this.comentarios.get('creador').value,
        texto: this.comentarios.get('texto').value,
      };
      this.comentarioService.guardarComentario(comentario).subscribe(data => {
        this.router.navigate(['/']);
      })
    }else{
      const comentario: Comentario = {
        id: this.comentario.id,
        fechaCreacion: this.comentario.fechaCreacion,
        titulo: this.comentarios.get('titulo').value,
        creador: this.comentarios.get('creador').value,
        texto: this.comentarios.get('texto').value,
      };
      this.comentarioService.actualizarComentario(this.idComentario, comentario).subscribe(data => {
        this.router.navigate(['/']);
      })
    }
    console.log(this.comentarios);    
  }
  esEditar(){
    if (this.idComentario > 0) {
      this.accion = 'Editar';
      // para editar el comentario
      this.comentarioService.cragarComentario(this.idComentario).subscribe(data => {
        this.comentario = data;
        this.comentarios.patchValue({
          titulo: data.titulo,
          creador: data.creador,
          texto: data.texto
        });
      })

      // esto estaba cuando era por default
      // this.comentarios.patchValue({
      //   titulo: 'Gladiador',
      //   creador: 'Thomas',
      //   texto: 'Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you’ll see a slightly different style of feedback.'
      // })
    }
  }

}
