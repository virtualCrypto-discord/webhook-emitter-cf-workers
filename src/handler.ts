declare const USER_AGENT: string;
function buildRequest(url: string, blob: Blob, ed25519: string, timestamp: string) {
  const headers = new Headers();
  headers.append("X-Signature-Ed25519", ed25519)
  headers.append("X-Signature-Timestamp", timestamp);
  headers.append("Content-Type", "application/json");
  headers.append("User-Agent", USER_AGENT);
  return new Request(url, {
    method: "POST",
    body: blob,
    headers
  });
}

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
  const request_blob = await request.blob();
  const res = await fetch(buildRequest(url, request_blob, ed25519, timestamp));
  const response_blob = await res.blob();
  const headers = new Headers();
  headers.append("X-Status", String(res.status));
  return new Response(response_blob, {
    headers
  });
}
