export function isTrpcRequest(pathname: string): boolean {
  return pathname.startsWith("/api/trpc");
}
