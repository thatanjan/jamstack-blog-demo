import { Schema, model, models } from 'mongoose'

const requiredStringType = {
	type: String,
	required: true,
}

const schema = new Schema({
	title: { ...requiredStringType, text: true },
	slug: requiredStringType,
	banner: requiredStringType,
	description: requiredStringType,
	customID: requiredStringType,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	content: requiredStringType,
})

export default models.blog || model('blog', schema)
