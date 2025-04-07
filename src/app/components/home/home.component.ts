import { GitHubServiceService } from './../../services/git-hub-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { forkJoin, map } from 'rxjs';
import { ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatIconModule,
    SlickCarouselModule,
    MatCardModule,
    RouterModule,
    SlickCarouselModule 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  projetos: any[] = [];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  
  perfil: any;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    arrows: false,
    rtl: false, // mantém esquerda -> direita
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
  

  constructor(private githubService: GitHubServiceService) {}

  ngOnInit(): void {
    this.carregarPerfil();
    this.carregarProjetosAleatorios();
  }

  carregarProjetosAleatorios() {
    this.githubService.getProjetos().subscribe((projetos) => {
      const aleatorios = projetos.sort(() => Math.random() - 0.5).slice(0, 6);
      const projetosComImagem = aleatorios.map(repo => 
        this.githubService.adicionarImagemAoProjeto(repo.name).toPromise().then(imagem => ({
          nome: repo.name,
          descricao: this.githubService.extrairDescricao(repo.description || ''),
          imagem,
          id: repo.name
        }))
      );

      Promise.all(projetosComImagem).then(result => {
        this.projetos = result;
      });
    });
  }

  
  
  carregarPerfil() {
    this.githubService.getPerfil().subscribe(perfil => {
      this.perfil = perfil;
      console.log('Perfil carregado:', this.perfil);
    });
  }
}