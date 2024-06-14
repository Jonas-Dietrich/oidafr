import {useEffect, useState} from 'react';
import {fetchTopChannels} from "@/utils/requestHelper.ts";
import Loading from "@/components/Loading.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import NotFoundPage from "@/views/NotFoundPage.tsx";
import {ClipboardCheck, ClipboardCopy} from "lucide-react";

interface CustomError extends Error {
    code: string;
}

const TopChannels = () => {
    const [topChannels, setTopChannels] = useState<ITopChannel[] | null>(null);
    const [beError, setBeError] = useState<CustomError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData().then(() => console.log("fetch executed"));
    }, []);

    const copyToClipboard = (c: ITopChannel) => {
        navigator.clipboard.writeText(c.rssChannel.feedUrl).then(() => {
            c.copied = true;
            if (topChannels) setTopChannels([...topChannels]);
        });
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
                                <a href={channel.rssChannel?.link} target="_blank" rel="noopener noreferrer">
                                    {channel.rssChannel?.title}
                                </a>
                            </h2>
                            <p className="text-gray-600">{channel.count} posts</p>
                            <p className={"text-gray-400"}>
                                Copy feed url
                                <button onClick={() => copyToClipboard(channel)}>{channel.copied ?
                                    <ClipboardCheck size={15}/> :
                                    <ClipboardCopy size={15}/>}</button>
                            </p>
                        </div>
                        {channel.rssChannel?.rssImage?.url &&
                            <a href={channel.rssChannel?.link}><img src={channel.rssChannel.rssImage.url} alt="Channel logo" className="ml-4 max-h-20"/></a>}
                        {!channel.rssChannel?.rssImage?.url && <a href={channel.rssChannel?.link}><img src={"https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"} alt="Channel logo" className="ml-4 max-h-20"/></a>}
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