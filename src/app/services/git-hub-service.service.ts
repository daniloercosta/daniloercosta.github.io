import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubServiceService {
  private readonly username = 'daniloercosta';
  private readonly reposUrl = `https://api.github.com/users/${this.username}/repos`;

  constructor(private http: HttpClient) {}

  getProjetos(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(this.reposUrl).pipe(
      map(repos =>
        repos
          .slice()
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, 9)
      )
    );
  }

  getPerfil(): Observable<any> {
    return this.http.get<any>(`https://api.github.com/users/${this.username}`);
  }

  getReadme(repoName: string): Observable<string> {
    return this.buscarReadme(repoName, 'main').pipe(
      catchError(() => this.buscarReadme(repoName, 'master')),
      catchError(() => of(''))
    );
  }

  adicionarImagemAoProjeto(repoName: string): Observable<string> {
    return this.getReadme(repoName).pipe(
      map(readme => this.extrairPrimeiraImagem(readme)),
      map(imageUrl =>
        imageUrl || `https://raw.githubusercontent.com/${this.username}/${repoName}/main/projeto.png`
      ),
      catchError(() =>
        of(`https://raw.githubusercontent.com/${this.username}/${repoName}/main/projeto.png`)
      )
    );
  }

  extrairPrimeiraImagem(readme: string): string | null {
    const regex = /!\[.*?\]\((https?:\/\/.*?\.(?:png|jpg|jpeg|gif|svg))\)/i;
    const match = readme.match(regex);
    return match ? match[1] : null;
  }

  extrairDescricao(readme: string): string {
    return readme
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/[#>*`_]/g, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 30)
      .slice(0, 3)
      .join(' ')
      .trim();
  }

  private buscarReadme(repoName: string, branch: string): Observable<string> {
    const url = `https://raw.githubusercontent.com/${this.username}/${repoName}/${branch}/README.md`;
    return this.http.get(url, { responseType: 'text' });
  }
}
