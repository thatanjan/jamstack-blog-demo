import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import BlogLayout from '../../components/Layouts/BlogLayout'

import connectDB from '../../mongoose/connectDB'
import BlogModel from '../../mongoose/BlogModel'

import components from '../../components/MdxComponents'

const Blog = ({ blog, serializedBlog }) => {
	const { content: _, ...props } = blog

	return (
		<BlogLayout {...props}>
			<MDXRemote {...serializedBlog} components={components} />
		</BlogLayout>
	)
}

export const getStaticPaths = async () => {
	await connectDB()

	const allSlugs = await BlogModel.find({}, 'slug')

	const paths = allSlugs.map((slug) => ({ params: { slug: slug.slug } }))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async ({ params: { slug } }) => {
	await connectDB()

	const blogDocument = await BlogModel.findOne(
		{ slug },
		'-slug -customID -_id -__v'
	)

	const blog = blogDocument.toObject()

	blog.createdAt = blog.createdAt.toDateString()

	const serializedBlog = await serialize(blog.content)

	return { props: { blog, serializedBlog } }
}

export default Blog
