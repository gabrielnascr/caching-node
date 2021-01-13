import cache from "./cache";
import api from "../services/api";

class Github {
  async getRepositories(username) {
    const cached = await cache.get(`repos:${username}`);

    if (cached) {
      return cached;
    }
    const { data } = await api.get(`/users/${username}/repos`);

    const response = data.map((repository) => {
      return {
        name: repository.name,
        fullname: repository.full_name,
      };
    });

    cache.set(`repos:${username}`, response, 60);
    return response;
  }

  async getUserInfo(username) {
    const cached = await cache.get(`userinfo:${username}`);

    if (cached) {
      return cached;
    }
    const { data } = await api.get(`/users/${username}`);

    const response = {
      id: data.id,
      name: data.name,
      bio: data.bio,
      localtion: data.location,
    };

    cache.set(`userinfo:${username}`, response, 60);
    return response;
  }
}

export default new Github();
