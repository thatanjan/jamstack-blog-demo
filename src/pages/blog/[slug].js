import React, { useEffect } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import useSWR from 'swr'
import axios from 'axios'

import BlogLayout from '../../components/Layouts/BlogLayout'

import connectDB from '../../mongoose/connectDB'
import BlogModel from '../../mongoose/BlogModel'

import components from '../../components/MdxComponents'

const Blog = ({ slug, blog, serializedBlog }) => {
	const { content: _, ...props } = blog

	const fetcher = async (url) => {
		const { data } = await axios.get(url)
		return data
	}

	const { data, mutate } = useSWR(`/api/views/${slug}`, fetcher)

	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source()

		;(async () => {
			try {
				await axios.post(`/api/views/${slug}`, {
					cancelToken: cancelTokenSource.token,
				})

				mutate()
			} catch (_) {}
		})()

		return () => {
			cancelTokenSource.cancel()
		}
	}, [])

	return (
		<BlogLayout
			{...{ ...props, totalViews: data ? data.totalViews : props.totalViews }}
		>
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

	return { props: { blog, serializedBlog, slug } }
}

export default Blog
