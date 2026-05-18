/** Contexto de rotas dinâmicas no App Router (Next.js 15+). */
export type RouteParams<T extends Record<string, string>> = {
  params: Promise<T>;
};

export type IdRouteParams = RouteParams<{ id: string }>;
