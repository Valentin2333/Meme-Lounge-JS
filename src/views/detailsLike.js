import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteMeme, getMemeById, getLikesByMemeId, getMyLikeByMemeId, likeMeme } from '../api/data.js';
                             
const detailsTemplate = (meme, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}
    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2> 
            <p>${meme.description}</p>
            ${isOwner == true ? html` 
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : ''}
            ${likeControlsTemplate(showLikeButton, onLike)};
            <div class="likes">
                <span id="total-likes">Likes: ${likes ? likes : 0}</span>
            </div>
        </div>
    </div>
</section>`;

const likeControlsTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null;
    }
};

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId'); 
    const memeId = ctx.params.id;

    const [meme, likes, hasLike] = await Promise.all([
        getMemeById(memeId),
        getLikesByMemeId(memeId),
        userId ? getMyLikeByMemeId(memeId, userId) : 0
    ])

    const isOwner = userId === meme._ownerId;
    const showLikeButton = userId != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(meme, isOwner, onDelete, likes, showLikeButton, onLike)); 

    async function onDelete(){
        const confirmed = confirm('Are you sure?');
        if (confirmed){
            await deleteMeme(memeId);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        await likeMeme(memeId);
        ctx.page.redirect('/details/' + memeId);
    }
}