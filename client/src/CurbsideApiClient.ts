const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class CurbsideApiClient {
  base_url: string;

  constructor() {
    this.base_url = BASE_API_URL + '/api'
  }

  async request(options:options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json', 
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error :any) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error.toString(),
        }; }
      };
    }

    return {
      ok: response.ok, 
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    }
  }

  async get(url:string, query:query, options:options) {
    return this.request({method: 'GET', url, query, ...options})
  }

  async post(url:string, body:any, options:options) {
    return this.request({method: 'POST', url, body, ...options})
  }

  async patch(url:string, body:any, options:options) {
    return this.request({method:'PATCH', url, body, ...options})
  }

}

interface options {
  method?: string,
  url?: string,
  body?: any, 
  headers?: {[key:string]:string}
  [key:string]: any;
}

interface query {
  [key:string] : number | string
}