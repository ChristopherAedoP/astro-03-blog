/** @format */

import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site }) => {

  const blogPosts = await getCollection('blog');  

  return rss({
		//stylesheet: '/style/rss.xsl',
		title: 'Chri’s Blog',
		description: 'Un blog simple de curso de astro',
		site: site ?? '',
		items: blogPosts.map(({ data, slug }) => ({
			title: data.title,
			pubDate: data.date,
			description: data.description,
			link: `/post/${slug}`,
		})),
		customData: `<language>es-cl</language>`,
	});
};
