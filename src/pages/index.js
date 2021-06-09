import Head from 'next/head'
import matter from 'gray-matter'

import path from 'path'
import fs from 'fs'

import BlogModel from '../mongoose/BlogModel'

import BlogPreviewLayout from '../components/Layouts/BlogPreviewLayout'

import connectDB from '../mongoose/connectDB'

export default function Home({ allBlogs }) {
	return (
		<div>
			<Head>
				<title>Cules Blog</title>
			</Head>

			<>
				<BlogPreviewLayout allBlogs={allBlogs} />
			</>
		</div>
	)
}

export const getStaticProps = async () => {
	await connectDB()

	const root = process.cwd()
	const allBlogFileNames = fs.readdirSync(path.join(root, 'src', 'blogs'))

	const fileDatas = allBlogFileNames.map((fileName) => {
		const fileData = fs.readFileSync(
			path.join(root, 'src', 'blogs', fileName),
			'utf8'
		)

		const matterData = matter(fileData)

		const { data } = matterData

		const slug = fileName.replace('.mdx', '')

		data.slug = slug

		return matterData
	})

	const updateBlogPromise = fileDatas.map((fileData) => {
		const { data, content } = fileData

		return BlogModel.updateOne(
			{ customID: data.customID },
			{
				$set: { ...data, content },
			},
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		)
	})

	await Promise.all(updateBlogPromise)

	const allBlogsResult = await BlogModel.find({}, '-content -customID -_id')

	const allBlogs = allBlogsResult
		.map((blog) => blog.toObject())
		.map((blog) => {
			blog.createdAt = blog.createdAt.toDateString()

			return blog
		})

	return {
		props: { allBlogs },
	}
}
