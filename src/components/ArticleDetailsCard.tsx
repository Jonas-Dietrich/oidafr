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

interface ArticleDetailsCardProps {
    rssItem: RssItem,
    isChannelTrustWorthy?: boolean
}

const ArticleDetailsCard: React.FC<ArticleDetailsCardProps> = ({rssItem, isChannelTrustWorthy = true}) => {
    const [openAlertDialog, setOpenAlertDialog] = React.useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent) => {
        if (!isChannelTrustWorthy) {
            event.preventDefault()
            setOpenAlertDialog(true)
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
                    <CardDescription><button onClick={copyToClipboard}>Share{copied && <> 🗹</>}</button>
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
                        <Label htmlFor="name">Description</Label>
                        <p className="text-lg">{rssItem?.description}</p>
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
            <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
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

        </>
    );
};

export default ArticleDetailsCard;