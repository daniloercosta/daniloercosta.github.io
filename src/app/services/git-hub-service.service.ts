import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  pushed_at: string;
  updated_at?: string;
  created_at?: string;
  language: string | null;
  stargazers_count: number;
  forks_count?: number;
  open_issues_count?: number;
  topics?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GitHubServiceService {
  private readonly username = 'daniloercosta';
  private readonly reposUrl = `https://api.github.com/users/${this.username}/repos`;
  private readonly defaultProjectImage = '/img/default-project.png';

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

  getProjeto(repoName: string): Observable<GitHubRepo> {
    return this.http.get<GitHubRepo>(`https://api.github.com/repos/${this.username}/${repoName}`);
  }

  getReadme(repoName: string): Observable<string> {
    return this.buscarReadme(repoName, 'main').pipe(
      catchError(() => this.buscarReadme(repoName, 'master')),
      catchError(() => of(''))
    );
  }

  adicionarImagemAoProjeto(repoName: string): Observable<string> {
    return of(`https://opengraph.githubassets.com/1/${this.username}/${repoName}`).pipe(
      catchError(() => of(this.defaultProjectImage))
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
