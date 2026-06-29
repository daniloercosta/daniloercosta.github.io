import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { GitHubServiceService } from '../../services/git-hub-service.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  repos: any[] = [];

  constructor(private githubService: GitHubServiceService) {}

  ngOnInit(): void {
    void this.carregarProjetos();
  }

  async carregarProjetos(): Promise<void> {
    const repos = await firstValueFrom(this.githubService.getProjetos());

    this.repos = await Promise.all(
      repos.map(async repo => {
        const [imagem, readme] = await Promise.all([
          firstValueFrom(this.githubService.adicionarImagemAoProjeto(repo.name)),
          firstValueFrom(this.githubService.getReadme(repo.name))
        ]);

        return {
          ...repo,
          imagem,
          readmeDescricao: repo.description?.trim() || this.githubService.extrairDescricao(readme) || 'Sem descrição detalhada.',
          linguagem: repo.language || 'Código',
          estrelas: repo.stargazers_count
        };
      })
    );
  }
}
