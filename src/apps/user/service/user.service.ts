// import request from '../utils/request';

import { PAGE_SIZE, request } from "@levi-m/core";

export namespace usersService {
  export function fetch({ page }: { page: number }) {
    return request(`/code/users?_page=${page}&_limit=${PAGE_SIZE}`);
  }

  export function remove(id: any) {
    return request(`/code/users/${id}`, {
      method: "DELETE",
    });
  }

  export function patch(id: any, values: any) {
    return request(`/code/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
  }

  export function create(values: any) {
    return request("/code/users", {
      method: "POST",
      body: JSON.stringify(values),
    });
  }
}
