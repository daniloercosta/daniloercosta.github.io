import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { firstValueFrom } from 'rxjs';
import { GitHubServiceService } from '../../services/git-hub-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    SlickCarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  projetos: any[] = [];
  perfil: any;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    dots: true,
    infinite: true,
    arrows: false,
    rtl: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(
    private githubService: GitHubServiceService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      void this.carregarPerfil();
      void this.carregarProjetosAleatorios();
    }
  }

  async carregarProjetosAleatorios(): Promise<void> {
    const projetos = await firstValueFrom(this.githubService.getProjetos());
    const selecionados = projetos.slice().sort(() => Math.random() - 0.5).slice(0, 6);

    this.projetos = await Promise.all(
      selecionados.map(async repo => {
        const imagem = await firstValueFrom(this.githubService.adicionarImagemAoProjeto(repo.name));
        const imagemFallback = this.githubService.getFallbackImagemProjeto(repo.name, repo.language);

        return {
          id: repo.name,
          nome: repo.name,
          descricao: repo.description?.trim() || 'Projeto disponível no GitHub.',
          imagem,
          imagemFallback,
          url: repo.html_url,
          linguagem: repo.language || 'Código',
          estrelas: repo.stargazers_count
        };
      })
    );
  }

  async carregarPerfil(): Promise<void> {
    this.perfil = await firstValueFrom(this.githubService.getPerfil());
  }
}
