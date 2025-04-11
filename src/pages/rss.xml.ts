/** @format */

import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {
	const blogPosts = await getCollection('blog');

	return rss({
		//stylesheet: '/style/rss.xsl',
		title: 'Chri’s Blog',
		description: 'Un blog simple de curso de astro',
		xmlns: {
			media: 'http://search.yahoo.com/mrss/',
		},
		site: site ?? '',
		items: blogPosts.map(({ data, slug, body }) => ({
			title: data.title,
			pubDate: data.date,
			description: data.description,
			link: `/posts/${slug}`,

			content: sanitizeHtml(parser.render(body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
			}),

			customData: `<media:content
			type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
			width="${data.image.width}"
			height="${data.image.height}"
			medium="image"
			url="${site + data.image.src}" />
			`,
		})),
		customData: `<language>es-cl</language>`,
	});
};
