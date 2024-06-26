import React, {useEffect, useState} from 'react';
import {useToast} from "@/components/ui/use-toast"
import {postUserComment} from "@/utils/requestHelper.ts";
import rssImage from "@/assets/rssCommentCollector.webp";

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 24.05.24
 */
const CreateComment = () => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [commentSubmitted, setCommentSubmitted] = useState(false);

    const {toast} = useToast();

    const descriptionLength: number = 50;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!author) {
            console.log("Author is required");
            toastError("Author is required", "Please enter an author")
            return;
        }

        if (!title) {
            console.log("Title is required");
            toastError("Title is required", "Please enter a title")
            return;
        }

        const urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
        if (!urlRegex.test(link)) {
            console.log("Please enter a valid URL");
            toastError("Please enter a valid URL", "URL must start with http:// or https:// and not contain spaces")
            return;
        }

        if (description.length <= descriptionLength) {
            console.log(`Description must be longer than ${descriptionLength} characters`);
            toastError(`Description must be longer than ${descriptionLength} characters`, description.length === 0 ? "Please enter a description" : "Please enter a longer description")
            return;
        }

        postUserComment(title, link, description, author).then(data => {
            if (data) {
                setCommentSubmitted(true);
                toast({
                    title: "Comment submitted",
                    description: "Your comment has been submitted successfully",
                })
            } else {
                toastError("Error submitting comment", "An unexpected error occurred while submitting your comment. Please try again later.");
            }
        })

        console.log({title, link, description});
    };

    const toastError = (title: string, description: string) => {
        toast({
            variant: "destructive",
            title: title,
            description: description,
        })
    }

    useEffect(() => {
        if (!commentSubmitted) {
            setTitle('');
            setLink('');
            setDescription('');
            setAuthor('');
        }
    }, [commentSubmitted]);

    return (
        <>
            <div className="flex justify-center">
                <div className="rounded-b-xl shadow-lg shadow-gray-400 px-8 pb-8 w-full max-w-lg">
                    <div className="flex justify-center">
                        <img src={rssImage} alt="our comment colloctor - please leave her a comment" content={"Content credentials: Generated with AI ∙ 24 May 2024 at 7:55 pm"} className="w-1/2 h-auto mb-6"/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-4">
                            <span className="text-gray-700">Author:</span>
                            <input
                                placeholder={"Who are you?"}
                                type="text"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                className="mt-2 block w-full rounded-md border-2 border-gray-200 p-2 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Title:</span>
                            <input
                                placeholder={"What's your comment about?"}
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="mt-2 block w-full rounded-md border-2 border-gray-200 p-2 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Link:</span>
                            <input
                                placeholder={"Link to your comment"}
                                type="text"
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                className="mt-2 block w-full rounded-md border-2 border-gray-200 p-2 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Description:</span>
                            <textarea
                                placeholder={"Write your comment here"}
                                rows={6}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="mt-1 block w-full rounded-md border-2 border-gray-200 p-2 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </label>
                        <button disabled={commentSubmitted} type="submit"
                                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${commentSubmitted ? "bg-gray-700 hover:bg-gray-700 opacity-15" : ""}`}>Submit
                        </button>
                        {commentSubmitted && <p className="text-green-500 mt-4">Comment submitted successfully</p>}
                        {commentSubmitted && <button
                            className={`w-full py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            onClick={() => setCommentSubmitted(false)}>Write a new comment</button>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateComment;