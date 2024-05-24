import React, { useState } from 'react';
import {useToast} from "@/components/ui/use-toast"

const CreateComment = () => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    const {toast} = useToast();

    const descriptionLength: number = 50;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title) {
            console.log("Title is required");
            toastError("Title is required", "Please enter a title")
            return;
        }

        // Validate URL with regex
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(link)) {
            console.log("Please enter a valid URL");
            toastError("Please enter a valid URL", "URL must start with http:// or https:// and not contain spaces")
            return;
        }

        if (description.length <= descriptionLength) {
            console.log(`Description must be longer than ${descriptionLength} characters`);
            toastError(`Description must be longer than ${descriptionLength} characters`, description.length === 0 ?  "Please enter a description" : "Please enter a longer description")
            return;
        }

        toast({
            title: "Comment submitted",
            description: "Your comment has been submitted successfully",
        })
        console.log({ title, link, description });
    };
    
    const toastError = (title: string, description: string) => {
        toast({
            variant: "destructive",
            title: title,
            description: description,
        })
    }

    return (
        <div className="bg-blue-50 p-10 flex justify-center pt-10">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-blue-500 mb-6">Write and leave your own Comment</h1>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        <span className="text-gray-700">Title:</span>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-2 border-gray-200 p-0.5 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Link:</span>
                        <input
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            className="mt-1 block w-full rounded-md border-2 border-gray-200 p-0.5 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Description:</span>
                        <textarea
                            rows={10}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="mt-1 block w-full rounded-md border-2 border-gray-200 p-2 shadow-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </label>
                    <button type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateComment;