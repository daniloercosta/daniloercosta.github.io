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
        const [imagem, readme] = await Promise.all([
          firstValueFrom(this.githubService.adicionarImagemAoProjeto(repo.name)),
          firstValueFrom(this.githubService.getReadme(repo.name))
        ]);

        return {
          id: repo.name,
          nome: repo.name,
          descricao: repo.description?.trim() || this.githubService.extrairDescricao(readme) || 'Projeto disponível no GitHub.',
          imagem,
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
