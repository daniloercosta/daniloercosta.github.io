import { GitHubServiceService } from './../../services/git-hub-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatIconModule,
    SlickCarouselModule,
    MatCardModule,
    RouterModule 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  projetos: any[] = [];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    arrows: true,
  };

  constructor(private githubService: GitHubServiceService) {}

  ngOnInit(): void {
    this.carregarProjetosAleatorios();
  }

  carregarProjetosAleatorios() {
    console.log('Carregando projetos aleatórios...');
    this.githubService.getProjetos().subscribe((projetos) => {
      this.projetos = projetos.sort(() => Math.random() - 0.5).slice(0, 3);
      console.log("Projetos aleatórios carregados:", this.projetos);
    });
  }
  

}