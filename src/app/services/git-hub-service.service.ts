import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  pushed_at: string;
  updated_at?: string;
  created_at?: string;
  default_branch?: string;
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
    return this.getProjeto(repoName).pipe(
      switchMap(repo => this.buscarReadme(repoName, repo.default_branch || 'main')),
      catchError(() => this.buscarReadme(repoName, 'main')),
      catchError(() => this.buscarReadme(repoName, 'master')),
      catchError(() => of(''))
    );
  }

  adicionarImagemAoProjeto(repoName: string): Observable<string> {
    return this.getProjeto(repoName).pipe(
      switchMap(repo =>
        this.buscarReadme(repoName, repo.default_branch || 'main').pipe(
          map(readme => this.extrairPrimeiraImagem(readme, repoName, repo.default_branch || 'main')),
          catchError(() => this.buscarReadme(repoName, 'main').pipe(map(readme => this.extrairPrimeiraImagem(readme, repoName, 'main')))),
          catchError(() => this.buscarReadme(repoName, 'master').pipe(map(readme => this.extrairPrimeiraImagem(readme, repoName, 'master'))))
        )
      ),
      map(imageUrl => imageUrl || this.defaultProjectImage),
      catchError(() => of(this.defaultProjectImage))
    );
  }

  getFallbackImagemProjeto(repoName: string, language?: string | null): string {
    const label = this.criarImagemProjetoSvg(repoName, language);
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(label)}`;
  }

  extrairPrimeiraImagem(readme: string, repoName?: string, branch = 'main'): string | null {
    const markdownRegex = /!\[[^\]]*?\]\(([^)]+)\)/i;
    const htmlRegex = /<img[^>]*src=["']([^"']+)["']/i;
    const match = readme.match(markdownRegex) || readme.match(htmlRegex);
    if (!match) {
      return null;
    }

    const rawUrl = match[1].trim();
    return this.resolverUrlImagem(rawUrl, repoName, branch);
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
    const url = `https://api.github.com/repos/${this.username}/${repoName}/readme`;
    return this.http.get(url, {
      responseType: 'text',
      headers: {
        Accept: 'application/vnd.github.raw'
      }
    });
  }

  private resolverUrlImagem(url: string, repoName?: string, branch = 'main'): string {
    if (/^(https?:|data:|blob:|\/)/i.test(url)) {
      if (url.startsWith('/')) {
        const normalizedPath = url.replace(/^\/+/, '');
        return `https://raw.githubusercontent.com/${this.username}/${repoName}/${branch}/${normalizedPath}`;
      }

      return url;
    }

    const normalized = url.replace(/^\.\/+/, '').replace(/^\/+/, '');
    return `https://raw.githubusercontent.com/${this.username}/${repoName}/${branch}/${normalized}`;
  }

  private criarImagemProjetoSvg(repoName: string, language?: string | null): string {
    const title = this.apenasIniciais(repoName);
    const subtitle = language || 'GitHub repo';
    const palette = this.coresParaRepositorio(repoName);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${repoName}">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${palette[0]}" />
            <stop offset="100%" stop-color="${palette[1]}" />
          </linearGradient>
          <radialGradient id="glow" cx="20%" cy="20%" r="80%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.25)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="1200" height="675" rx="48" fill="url(#bg)" />
        <circle cx="170" cy="130" r="210" fill="url(#glow)" />
        <circle cx="1040" cy="560" r="180" fill="rgba(255,255,255,0.08)" />
        <rect x="72" y="72" width="180" height="56" rx="28" fill="rgba(255,255,255,0.16)" />
        <text x="102" y="109" fill="white" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700">Danilo Costa</text>
        <text x="72" y="520" fill="rgba(255,255,255,0.72)" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700">${this.escaparSvg(subtitle)}</text>
        <text x="72" y="592" fill="white" font-size="76" font-family="Arial, Helvetica, sans-serif" font-weight="800">${this.escaparSvg(this.truncarTitulo(repoName))}</text>
        <text x="74" y="636" fill="rgba(255,255,255,0.82)" font-size="26" font-family="Arial, Helvetica, sans-serif">Portfólio técnico e visual mais limpo</text>
        <rect x="900" y="72" width="228" height="228" rx="38" fill="rgba(255,255,255,0.12)" />
        <text x="1020" y="195" text-anchor="middle" fill="white" font-size="96" font-family="Arial, Helvetica, sans-serif" font-weight="800">${this.escaparSvg(title)}</text>
      </svg>
    `.trim();
  }

  private coresParaRepositorio(repoName: string): [string, string] {
    const hash = [...repoName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const palettes: [string, string][] = [
      ['#0f172a', '#0ea5e9'],
      ['#111827', '#14b8a6'],
      ['#1e1b4b', '#8b5cf6'],
      ['#052e16', '#22c55e'],
      ['#3b0764', '#ec4899'],
      ['#4c1d95', '#f59e0b']
    ];

    return palettes[hash % palettes.length];
  }

  private apenasIniciais(repoName: string): string {
    return repoName
      .split(/[-_.\s]+/)
      .filter(Boolean)
      .map(part => part[0]!)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'DC';
  }

  private truncarTitulo(repoName: string): string {
    return repoName.replace(/[-_.]+/g, ' ').slice(0, 28);
  }

  private escaparSvg(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
