import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { Liga } from '../../services/liga';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clasificacion',
  imports: [CommonModule, RouterLink],
  templateUrl: './clasificacion.html',
  styleUrl: './clasificacion.css',
})
export class Clasificacion implements OnInit {
  equipos: Equipo[] = [];

  constructor(private liga: Liga) {}

  ngOnInit(): void {
    this.cargarClasificacion();
  }

  cargarClasificacion(): void {
    this.equipos = this.liga.obtenerClasificacion();   // ← nombre exacto del método
  }
}

