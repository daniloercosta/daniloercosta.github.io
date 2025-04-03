import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [HttpClientModule, MatCardModule, MatButtonModule,CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  repos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('https://api.github.com/users/daniloercosta/repos').subscribe(
      data => this.repos = data,
      error => console.error('Erro ao buscar repositórios', error)
    );
  }
}
