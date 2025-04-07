import { GitHubServiceService } from './../../services/git-hub-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatButtonModule,CommonModule,MatIcon],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  repos: any[] = [];

  constructor(private http: HttpClient, private githubService: GitHubServiceService) {}

  ngOnInit(): void {
    this.githubService.getProjetos().subscribe(repos => {
      this.repos = repos;

      this.repos.forEach(repo => {
        this.githubService.adicionarImagemAoProjeto(repo.name).subscribe(imagem => {
          repo.imagem = imagem;
        });

        this.githubService.getReadme(repo.name).subscribe(readme => {
          const descricao = this.githubService.extrairDescricao(readme);
          repo.readmeDescricao = descricao || 'Sem descrição detalhada.';
        });
      });
    });
  }
}