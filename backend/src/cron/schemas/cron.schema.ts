import { Schema } from 'mongoose'

export const CronSchema = new Schema({
	objectID:Number,
    story_url: String,
	url:String,
	story_title: String, 
	title: String,
	author: String,
	status_story:{
		type:Boolean,
		default:null
	} ,
	created_at:{
		type: Date,
		default: Date.now
	}
})
