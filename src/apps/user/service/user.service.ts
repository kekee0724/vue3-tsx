// import request from '../utils/request';

import { request } from "@levi-m/core";

export function fetch({ page = 1 }) {
  return request(`/code/users?_page=${page}&_limit=5`);
}
