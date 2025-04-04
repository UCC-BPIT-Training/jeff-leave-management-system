import ky from 'ky';

export class ApiService {
  constructor(client) {
    this._client = client;
  }

  // Getter method .client (property)
  get client() {
    return this._client;
  }
}

let apiInstance = null;

export const api =
  apiInstance ??
  (apiInstance = new ApiService(
    ky.create({
      prefixUrl: import.meta.env.VITE_BACKEND_URL,
    }),
  ).client);
