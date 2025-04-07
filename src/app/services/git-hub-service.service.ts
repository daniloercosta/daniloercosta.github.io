import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitHubServiceService {
  private username = 'daniloercosta';
  private apiUrl = `https://api.github.com/users/${this.username}/repos`;

  constructor(private http: HttpClient) {}

  getProjetos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(repos => repos.slice(0, 10)) // top 10 repositórios
    );
  }

  adicionarImagemAoProjeto(repoName: string): Observable<string> {
    return this.buscarReadme(repoName, 'master').pipe(
      catchError(() => this.buscarReadme(repoName, 'main')),
      map(readme => {
        const imageUrl = this.extrairPrimeiraImagem(readme);
        return imageUrl || `https://raw.githubusercontent.com/${this.username}/${repoName}/master/projeto.png`;
      }),
      catchError(() => of(`https://raw.githubusercontent.com/${this.username}/${repoName}/master/projeto.png`))
    );
  }

  getReadme(repoName: string): Observable<string> {
    const url = `https://raw.githubusercontent.com/${this.username}/${repoName}/master/README.md`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(() => of(''))
    );
  }

  private buscarReadme(repoName: string, branch: string): Observable<string> {
    const url = `https://raw.githubusercontent.com/${this.username}/${repoName}/${branch}/README.md`;
    return this.http.get(url, { responseType: 'text' });
  }

  extrairPrimeiraImagem(readme: string): string | null {
    const regex = /!\[.*?\]\((https?:\/\/.*?\.(?:png|jpg|jpeg|gif|svg))\)/;
    const match = readme.match(regex);
    return match ? match[1] : null;
  }

  extrairDescricao(readme: string): string {
    return readme
      .replace(/!\[.*?\]\(.*?\)/g, '') // remove imagens
      .replace(/[#>*`_]/g, '')         // limpa markdown simples
      .split('\n')
      .filter(l => l.trim().length > 30)
      .slice(0, 3)
      .join(' ')
      .trim();
  }

  getPerfil(): Observable<any> {
    const url = `https://api.github.com/users/${this.username}`;
    return this.http.get<any>(url);
  }
}