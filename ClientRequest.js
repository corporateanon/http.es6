import http from 'axios';
import RequestTemplate from './RequestTemplate';

export default class ClientRequest {
  constructor(template, options = {}) {
    this.requestTemplate = new RequestTemplate(template);
    this.options = Object.assign({}, this.getDefaultOptions(), options);
  }

  execute(params) {
    var request = this.requestTemplate.apply(params);
    return http({
      url: buildUrl(this.options.base, this.options.prefix, request.path),
      method: request.verb,
      params: request.query,
      data: request.body,
      responseType: 'text',
    })
  }

  getDefaultOptions() {
    return {
      base: '',
      prefix: '',
    }; //TODO!!!
  }
}

function buildUrl(base, prefix, path) {
  return `${ base }${ prefix }${ path }`;
}
