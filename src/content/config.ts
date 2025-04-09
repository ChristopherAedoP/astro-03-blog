/** @format */

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.date(),
			description: z.string(),
			// image: image().refine((img) => img.width > 100, {
			// 	message: 'The image width must be lower than 1000px.',
			// }),
			image: image(),
			//relacion
			author: z.string(),

			//relacion
			tags: z.array(z.string()),
		}),
});

export const collections = {
	blog: blogCollection,
};
