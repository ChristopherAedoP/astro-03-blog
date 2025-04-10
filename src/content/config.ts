
import { defineCollection, reference, z } from 'astro:content';

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
			// author: z.string(),
			author: reference('author'), //referencia a la coleccion de autores

			//relacion
			tags: z.array(z.string()),

			//boleaan
			isDraft: z.boolean().default(false),
		}),
});

const authorCollection = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image(),
			twitter: z.string(),
			linkedIn: z.string(),
			github: z.string(),
			bio: z.string(),
			subtitle: z.string(),
		}),
});

export const collections = {
	blog: blogCollection,
	author: authorCollection,
};
