import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitHubServiceService {
  private username = 'daniloercosta'; // Seu nome de usuário do GitHub
  private apiUrl = `https://api.github.com/users/${this.username}/repos`;

  constructor(private http: HttpClient) {}

  getProjetos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(repos => repos.slice(0, 10)), // Pegamos apenas os 10 primeiros repositórios
      switchMap(repos => forkJoin(repos.map(repo => this.adicionarImagemAoProjeto(repo)))) // Retorna um Observable<any[]>
    );
  }

  private adicionarImagemAoProjeto(repo: any): Observable<any> {
    return this.buscarReadme(repo.name, 'master').pipe(
      catchError(() => this.buscarReadme(repo.name, 'master')), // Se não encontrar no "main", tenta no "master"
      map(readme => {
        const imageUrl = this.extrairPrimeiraImagem(readme);
        return {
          ...repo,
          imagem: imageUrl || `https://raw.githubusercontent.com/${this.username}/${repo.name}/master/projeto.png`
        };
      }),
      catchError(() => of({ ...repo, imagem: `https://raw.githubusercontent.com/${this.username}/${repo.name}/master/projeto.png` })) // Se tudo falhar, usa a imagem padrão da raiz
    );
  }

  // MÉTODO QUE ESTAVA FALTANDO
  private buscarReadme(repoName: string, branch: string): Observable<string> {
    const readmeUrl = `https://raw.githubusercontent.com/${this.username}/${repoName}/${branch}/README.md`;
    return this.http.get(readmeUrl, { responseType: 'text' }).pipe(
      catchError(() => of('')) // Se não encontrar o README, retorna uma string vazia
    );
  }

  private extrairPrimeiraImagem(readme: string): string | null {
    const regex = /!\[.*?\]\((https?:\/\/.*?\.(?:png|jpg|jpeg|gif|svg))\)/;
    const match = readme.match(regex);
    return match ? match[1] : null;
  }
}
