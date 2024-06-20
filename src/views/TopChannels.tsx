import React, {useEffect, useState} from 'react';
import {fetchTopChannels, fetchUserFeeds} from "@/utils/requestHelper.ts";
import Loading from "@/components/Loading.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import NotFoundPage from "@/views/NotFoundPage.tsx";
import {ClipboardCheck, ClipboardCopy} from "lucide-react";
import supabase from "@/utils/supabase.tsx";

interface CustomError extends Error {
    code: string;
}

interface TopChannelsProps {
    session?: object | null;
}

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 14.06.24
 */
const TopChannels: React.FC<TopChannelsProps> = ({session}) => {
    const [topChannels, setTopChannels] = useState<ITopChannel[] | null>(null);
    const [beError, setBeError] = useState<CustomError | null>(null);
    const [userFeeds, setUserFeeds] = useState<string[] | null>([]);

    useEffect(() => {
        const fetchDataTopChannels = async () => {
            fetchTopChannels()
                .then(r => setTopChannels(r.data))
                .catch(e => {
                    setBeError(e);
                    console.log(e.message)
                    toast({
                        variant: "destructive",
                        title: `There has been an error fetching the top channels.`,
                        description: "Please try again later",
                    })
                });
        }

        const fetchDataUserFeeds = async () => {
            fetchUserFeeds()
                .then(r => setUserFeeds(r))
                .catch(e => {
                    console.log(e.message)
                    toast({
                        variant: "destructive",
                        title: `There has been an error fetching your feeds.`
                    })
                })
        }

        fetchDataTopChannels().then(() => console.log("fetch top channels executed"));
        if (session) fetchDataUserFeeds().then(() => console.log("fetch user feeds executed"));
    }, [session]);

    const copyToClipboard = (c: ITopChannel) => {
        navigator.clipboard.writeText(c.rssChannel.feedUrl).then(() => {
            c.copied = true;
            if (topChannels) setTopChannels([...topChannels]);
        });
    }

    const addToMyFeeds = async (channel: ITopChannel) => {
        const {data, error} = await supabase
            .from('user_feeds')
            .insert([
                {feedUrl: channel.rssChannel.feedUrl},
            ])
            .select()

        if (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: `There has been an error adding the feed to your feeds.`,
                description: "Please try again later",
            })
        }
        if (data?.length && data.length > 0) {
            toast({
                title: `Feed "${channel.rssChannel.title}" added to your feeds.`,
                description: "You can now see the feed in your feeds.",
            })
            if (userFeeds) setUserFeeds([channel.rssChannel.feedUrl, ...userFeeds]);
        }
    }


    return (
        <>
            {(!topChannels && !beError) &&
                <div className={"flex flex-col items-center justify-center py-5 divFullHeight text-gray-900"}>
                    <Loading/>
                </div>
            }

            <div className="flex flex-col">
                {topChannels && topChannels.map((channel: ITopChannel, index) => (
                    <div key={index} className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                <a href={channel.rssChannel?.link}>
                                    {channel.rssChannel?.title}
                                </a>
                            </h2>
                            <p className="text-gray-600">{channel.count} posts</p>
                            <p className={"text-gray-400"}>
                                {!session ? (
                                    <>
                                        <span className={"mr-1"}>Copy the feed url</span>
                                        <button onClick={() => copyToClipboard(channel)}>
                                            {channel.copied ? <ClipboardCheck size={15}/> :
                                                <ClipboardCopy size={15}/>}
                                        </button>
                                    </>
                                    )
                                    :
                                    (
                                        userFeeds?.includes(channel.rssChannel.feedUrl) ?
                                            <>You have already added this channel 🎉</>
                                            :
                                            <button onClick={() => addToMyFeeds(channel)}>Add to My Feeds</button>
                                    )}
                            </p>
                        </div>
                        {channel.rssChannel?.rssImage?.url &&
                            <a href={channel.rssChannel?.link} target="_blank" rel="noopener noreferrer"><img
                                src={channel.rssChannel.rssImage.url} alt="Channel logo"
                                className="ml-4 max-h-20"/></a>}
                        {!channel.rssChannel?.rssImage?.url && <a href={channel.rssChannel?.link}><img
                            src={"https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"}
                            alt="Channel logo" className="ml-4 max-h-20"/></a>}
                    </div>
                ))}

                {(!topChannels && beError) &&
                    <NotFoundPage errorText={"There has been an error fetching the top channels."}
                                  errCode={beError.code} errEasterEggLink={"https://www.stupidedia.org/stupi/Fehler"}/>}
            </div>

            <Toaster/>
        </>
    );
};

export default TopChannels;