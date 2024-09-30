import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getMemes() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(meme) {
    return await api.post(host + '/data/memes', meme);
}

export async function getMemeById(id) {
    return await api.get(host + '/data/memes/' + id);
}

export async function updateMeme(id, meme) {
    return await api.put(host + '/data/memes/' + id, meme);
}

export async function deleteMeme(id) {
    return await api.del(host + '/data/memes/' + id);
}

export async function getMyMemes() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

//LIKE
//export async function likeMeme(memeId) {
//    return api.post('/data/likes', {
//        memeId
//    });
//}

//export async function getLikesByMemeId(memeId) {
//    return api.get(`/data/likes?where=memeId%3D%22${memeId}%22&distinct=_ownerId&count`);
//}

//export async function getMyLikeByMemeId(memeId, userId) {
//    return api.get(`/data/likes?where=memeId%3D%22${memeId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
//}