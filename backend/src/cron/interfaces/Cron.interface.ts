import { Document } from "mongoose";

export interface CronInterface extends Document{ 
    objectID: number;
	created_at: Date;
	title: string;
	url: string;
	author: string;
	points: string;
	story_text: string;
	comment_text: string;
	num_comments: string;
	story_id: number;
	story_title: string;
	story_url: string;
	parent_id: number;
	created_at_i: number;
	_tags: [];
	status_story:boolean;
}