import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMemes } from '../api/data.js';
import { memeTemplate } from './catalog.js';

const searchTemplate = (memes, onSearch, params = '') => html`
<section id="search-page" class="dashboard">
    <h1>Search</h1>

    <form @submit=${onSearch}>
        <input type="text" name="search" .value=${params}>
        <input type="submit" value="Search"> 
    </form>

    ${memes.length == 0
        ? html`<p class="no-memes">No results</p>`
        : html`<ul class="other-memes-list">
            ${memes.map(memeTemplate)}
        </ul>`}
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let memes = [];

    if (params) {
        memes = await getMemes();
        memes = memes.filter(a => a.title.toLocaleLowerCase().includes(params.toLocaleLowerCase()));
    }

    ctx.render(searchTemplate(memes, onSearch, params));

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search');

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}