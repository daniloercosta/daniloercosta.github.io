import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GitHubRepo, GitHubServiceService } from '../../services/git-hub-service.service';

type ProjectDetailViewModel = GitHubRepo & {
  imagem: string;
  imagemFallback: string;
  descricaoCompleta: string;
  readme: string;
  topicos: string[];
};

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  projeto: ProjectDetailViewModel | null = null;
  resumo = '';
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubServiceService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      void this.carregarProjeto();
    } else {
      this.erro = 'Detalhes completos carregam no navegador.';
      this.carregando = false;
    }
  }

  async carregarProjeto(): Promise<void> {
    const repoName = this.route.snapshot.paramMap.get('repo');

    if (!repoName) {
      this.erro = 'Projeto não encontrado.';
      this.carregando = false;
      return;
    }

    try {
      const [repo, imagem, readme] = await Promise.all([
        firstValueFrom(this.githubService.getProjeto(repoName)),
        firstValueFrom(this.githubService.adicionarImagemAoProjeto(repoName)),
        firstValueFrom(this.githubService.getReadme(repoName))
      ]);

      this.projeto = {
        ...repo,
        imagem,
        imagemFallback: this.githubService.getFallbackImagemProjeto(repo.name, repo.language),
        readme,
        topicos: repo.topics || [],
        descricaoCompleta:
          repo.description?.trim() ||
          this.githubService.extrairDescricao(readme) ||
          'Projeto sem descrição detalhada disponível.'
      };
      this.resumo = this.githubService.extrairDescricao(readme) || this.projeto.descricaoCompleta;
    } catch {
      this.erro = 'Não consegui carregar os detalhes deste projeto agora.';
    } finally {
      this.carregando = false;
    }
  }
}
