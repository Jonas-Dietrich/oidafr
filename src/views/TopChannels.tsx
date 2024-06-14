import {useEffect, useState} from 'react';
import {fetchTopChannels} from "@/utils/requestHelper.ts";
import Loading from "@/components/Loading.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import NotFoundPage from "@/views/NotFoundPage.tsx";

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

    return (
        <>
            {(!topChannels && !beError) &&
                <div className={"flex flex-col items-center justify-center py-5 divFullHeight text-gray-900"}>
                    <Loading/>
                </div>
            }

            <div className="flex flex-col">
                {topChannels && topChannels.map((channel: ITopChannel, index) => (
                    <div key={index} className="p-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold">{channel.rssChannel.title}</h2>
                        <p className="text-gray-600">{channel.count} posts</p>
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