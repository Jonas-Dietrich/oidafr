import React, {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Label} from "@/components/ui/label.tsx";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import rssImage from '../assets/rssWarning.webp';
import {useLocation} from "react-router-dom";
import {ClipboardCheck, ClipboardCopy} from "lucide-react";

interface ArticleDetailsCardProps {
    rssItem: RssItem,
    isChannelTrustWorthy?: boolean
}

const containsHtml = (str: string) => {
    const a = document.createElement('div');
    a.innerHTML = str;

    for (let c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType == 1) return true;
    }

    return false;
}

const descLength = 750;

const ArticleDetailsCard: React.FC<ArticleDetailsCardProps> = ({rssItem, isChannelTrustWorthy = true}) => {
    const [openRedirectAlertDialog, setOpenRedirectAlertDialog] = React.useState<boolean>(false);
    const [openHTMLAlertDialog, setOpenHTMLAlertDialog] = React.useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [renderHtml, setRenderHtml] = useState<boolean>(false);
    const shouldRenderHtml = containsHtml(rssItem?.description || '');
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);


    const handleClick = (event: React.MouseEvent) => {
        if (!isChannelTrustWorthy) {
            event.preventDefault()
            setOpenRedirectAlertDialog(true)
        }
    }

    const handleRenderHTML = (event: React.MouseEvent) => {
        if (!isChannelTrustWorthy && !renderHtml) {
            event.preventDefault()
            setOpenHTMLAlertDialog(true);
        } else {
            setRenderHtml(!renderHtml);
        }
    }

    const location = useLocation();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin + location.pathname).then(() => setCopied(true));
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{rssItem?.title}</CardTitle>
                    <CardDescription>
                        <button onClick={copyToClipboard}>{copied ? <ClipboardCheck size={15}/> :
                            <ClipboardCopy size={15}/>}</button>
                    </CardDescription>
                    <CardDescription>{rssItem?.author} - {rssItem?.pubDate.toDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>{rssItem?.enclosureURL?.url}</p>
                    </div>
                    <div>
                        <Label htmlFor="name">Link</Label>
                        <p className="text-lg">
                            <a href={rssItem?.link} onClick={handleClick}>{rssItem?.link}</a>
                        </p>
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="name">Category</Label>
                        <p className="text-lg">{rssItem?.category?.categoryName}</p>
                    </div>
                    <div className="mt-3">
                        <Label className={"mr-2"} htmlFor="name">Description</Label>
                        {rssItem?.description.length > descLength && (
                            <button className={"bg-gray-100 rounded-sm px-1 border-2"}
                                    onClick={() => setShowFullDescription(!showFullDescription)}>
                                {showFullDescription ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                        <p className="text-lg">
                            {showFullDescription || rssItem?.description.length <= descLength ? rssItem?.description : rssItem?.description.slice(0, descLength)}
                        </p>
                        {
                            shouldRenderHtml &&
                            <>
                                <button
                                    className={`${renderHtml ? 'bg-blue-500' : 'bg-red-700'} text-white mt-10 px-4 py-2 rounded-lg`}
                                    onClick={handleRenderHTML}>
                                    {renderHtml ? 'Hide HTML Content' : 'Show HTML Content'}
                                </button>
                                {renderHtml &&
                                    <div className={"p-8 mt-2 bg-blue-100 rounded-lg"}>
                                        <div className="p-5 bg-white" style={{
                                            height: '40vh',
                                            width: '40vw',
                                            overflowY: 'scroll',
                                            resize: 'both',
                                            overflow: 'auto'
                                        }}>
                                            <div dangerouslySetInnerHTML={{__html: rssItem?.description}}/>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="name">Comments</Label>
                        <p className="text-lg">{rssItem?.comments}</p>
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="name">GUID</Label>
                        <p className="text-lg">{rssItem?.guid}</p>
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="name">Source</Label>
                        <p className="text-lg">{rssItem?.source?.sourceName}</p>
                    </div>
                </CardContent>
            </Card>
            <AlertDialog open={openRedirectAlertDialog} onOpenChange={setOpenRedirectAlertDialog}>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={rssImage} alt="Our careful mascot - always taking care of her users"
                             content={"Content credentials: Generated with AI ∙ 24 May 2024 at 10:11 pm"}
                             className="size-40"/>
                    </div>

                    <AlertDialogHeader>
                        <AlertDialogTitle>You are about to leave this page and visit an external
                            website.</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to continue? Do you trust <span
                            className={"text-red-700"}>{rssItem?.link}</span>? Hackers might steal your data!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Cancel</AlertDialogAction>
                        <AlertDialogCancel onClick={() => window.open(rssItem?.link, '_blank')}>Continue to external
                            page</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openHTMLAlertDialog} onOpenChange={setOpenHTMLAlertDialog}>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={rssImage} alt="Our careful mascot - always taking care of her users"
                             content={"Content credentials: Generated with AI ∙ 24 May 2024 at 10:11 pm"}
                             className="size-40"/>
                    </div>

                    <AlertDialogHeader>
                        <AlertDialogTitle>You are about to render potentially unsafe HTML.</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to continue? Do you trust this comment by <span
                            className={"text-red-700"}>{rssItem?.author}</span>? Hackers might steal your data!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Cancel</AlertDialogAction>
                        <AlertDialogCancel onClick={() => setRenderHtml(true)}>Render HTML anyway</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ArticleDetailsCard;