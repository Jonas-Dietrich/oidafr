import {useEffect, useState} from "react";
import supabase from "@/utils/supabase.tsx";
import rssImage from "@/assets/rssAbout.webp";
import CountUp from 'react-countup';
import {fetchAboutStats} from "@/utils/requestHelper.ts";
import {toast} from "@/components/ui/use-toast.ts";
import Loading from "@/components/Loading.tsx";

const AboutUs = () => {
    const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);
    const [stats, setStats] = useState<IApiAboutStats | null>(null);
    const [beError, setBeError] = useState<string | null>(null);

    const fetchNumberOfUsers = async () => {
        supabase.rpc('count_users').then(({data, error}) => {
            if (error) {
                toast({
                    variant: "destructive",
                    title: `There has been an error fetching the number of users.`,
                    description: "Please try again later",
                })
                console.error(error);
            } else {
                setNumberOfUsers(data);
            }
        });
    }

    const fetchBeStats = async () => {
        fetchAboutStats()
            .then(s => setStats(s.data))
            .catch(e => {
                toast({
                    variant: "destructive",
                    title: `There has been an error fetching the stats.`,
                    description: "Please try again later",
                })
                setBeError("There has been an error fetching the number of users.")
                console.log(e)
            })
    }

    useEffect(() => {
        fetchNumberOfUsers().then(() => console.log('fetchNumberOfUsers executed!'))
        fetchBeStats().then(() => console.log("fetchBeStats executed!"))
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center mt-1 text-gray-900`}>
            <img src={rssImage} alt="Our RSS team - aren't they lovely"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            <div className="mt-1 w-full lg:w-1/2">
                <h2 className="font-bold text-2xl mb-4">Our Philosophy</h2>
                <p className="text-lg">
                    We believe in the power of community and the importance of free access to information. Our platform
                    is built on these principles, providing a space for users to share, discuss, and learn from a wide
                    variety of sources.
                </p>
            </div>
            <p className={"font-bold font-mono text-xl count-style mt-5"}>
                We have {numberOfUsers &&
                <span className="text-red-500"><CountUp end={numberOfUsers} duration={5}/></span>} happy users!
            </p>

            <div className="mt-8 mb-10">
                <h2 className="font-bold text-2xl mb-2">Features</h2>
                <ul className="list-disc list-inside text-lg">
                    <li>Track and follow a wide variety of RSS feeds</li>
                    <li>Engage in discussions with other users through comments</li>
                    <li>Discover new sources through our curated categories</li>
                    <li>Enjoy media content directly from our platform</li>
                </ul>
            </div>
            {stats && (
                <>
                    <p className={"font-bold font-mono text-xl count-style"}>
                        We are tracking {<span className="text-red-500"><CountUp end={stats.channelCount}
                                                                                 duration={3.75}/></span>} amazing
                        channels!
                    </p>
                    <p className={"font-bold font-mono text-xl count-style"}>
                        Our users have posted {<span className="text-red-500"><CountUp end={stats.commentCount}
                                                                                       duration={2.75}/></span>} insightful
                        comments!
                    </p>
                    <p className={"font-bold font-mono text-xl count-style"}>
                        We have gathered {<span className="text-red-500"><CountUp end={stats.itemCount}
                                                                                  duration={6}/></span>} interesting
                        items for you!
                    </p>
                    <p className={"font-bold font-mono text-xl count-style"}>
                        We have categorized these into {<span className="text-red-500"><CountUp
                        end={stats.categoryCount} duration={3.5}/></span>} unique categories!
                    </p>
                    <p className={"font-bold font-mono text-xl count-style"}>
                        We are sourcing from {<span className="text-red-500"><CountUp end={stats.sourceCount}
                                                                                      duration={2.5}/></span>} diverse
                        sources!
                    </p>
                    <p className={"font-bold font-mono text-xl count-style"}>
                        We have {<span className="text-red-500"><CountUp end={stats.enclosureUrlCount}
                                                                         duration={5}/></span>} media files for your
                        enjoyment!
                    </p>
                </>
            )}
            {(!stats && beError) && <p>{beError}</p>}
            {(!stats && !beError) && <Loading/>}
        </div>
    );
};

export default AboutUs;