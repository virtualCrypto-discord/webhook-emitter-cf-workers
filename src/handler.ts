export async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("invalid method", {
      status: 400
    });;
  }
  const ed25519 = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  const url = request.headers.get("X-Forward");
  if (!(url && ed25519 && timestamp)) {
    return new Response("invalid request", {
      status: 400
    });
  }
  const blob = await request.blob();
  const headers = new Headers();
  headers.append("X-Signature-Ed25519", ed25519)
  headers.append("X-Signature-Timestamp", timestamp);
  headers.append("Content-Type", "application/json");
  const res = await fetch(url, {
    body: blob,
    headers
  });
  return new Response(await res.blob());
}
