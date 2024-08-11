import mongoose from "mongoose";

interface TipRecord {
    userId: string,
    full_name: string,
    tip: string,
    country: string,
    tags: string,
    date: Date,
    upvotes: number,
    comment_numbers: number,
    liked_comments: string[],
    disliked_comments: string[]
    comments: CommentRecord[]
}

interface CommentRecord {
    comment: string,
    username: string,
    date_posted: Date
}

const commentRecordSchema = new mongoose.Schema<CommentRecord>({
    comment: { type: String, required: false },
    username: { type: String, required: false },
    date_posted: { type: Date, required: false }
});

const tipRecordSchema = new mongoose.Schema<TipRecord>({
    userId: { type: String, required: true},
    full_name: { type: String, required: true},
    tip: { type: String, required: true},
    country: { type: String, required: true},
    tags: { type: String, required: true},
    date: { type: Date, required: true},
    upvotes: { type: Number, default: 1},
    comment_numbers: { type: Number, default: 0},
    liked_comments: { type: [String], default: []},
    disliked_comments: { type: [String], default: []},
    comments: { type: [commentRecordSchema], default: []},
})

const TipRecordModel = mongoose.model<TipRecord>(
    "TipRecord",
    tipRecordSchema
);

export default TipRecordModel