import {useEffect, useState} from "react";
import supabase from "@/utils/supabase.tsx";
import rssImage from "@/assets/rssAbout.webp";
import CountUp from 'react-countup';
import {fetchAboutStats} from "@/utils/requestHelper.ts";
import {toast} from "@/components/ui/use-toast.ts";

const AboutUs = () => {
    const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);
    const [stats, setStats] = useState<IApiAboutStats | null>(null);

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
                console.log(e)
            })
    }

    useEffect(() => {
        fetchNumberOfUsers().then(() => console.log('fetchNumberOfUsers executed!'))
        fetchBeStats().then(() => console.log("fetchBeStats executed!"))
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
            <img src={rssImage} alt="Our RSS team - aren't they lovely"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            <p className={"font-bold font-mono text-xl"}>
                We have {numberOfUsers && <CountUp end={numberOfUsers} duration={2.75} />} users!
            </p>
            {stats && (
                <>
                    <p className={"font-bold font-mono text-xl"}>
                        We are tracking {<CountUp end={stats.channelCount} duration={2.75}/>} amazing channels!
                    </p>
                    <p className={"font-bold font-mono text-xl"}>
                        Our users have posted {<CountUp end={stats.commentCount} duration={2.75}/>} insightful comments!
                    </p>
                    <p className={"font-bold font-mono text-xl"}>
                        We have gathered {<CountUp end={stats.itemCount} duration={2.75}/>} interesting items for you!
                    </p>
                    <p className={"font-bold font-mono text-xl"}>
                        We have categorized these into {<CountUp end={stats.categoryCount} duration={2.75}/>} unique
                        categories!
                    </p>
                    <p className={"font-bold font-mono text-xl"}>
                        We are sourcing from {<CountUp end={stats.sourceCount} duration={2.75}/>} diverse sources!
                    </p>
                    <p className={"font-bold font-mono text-xl"}>
                        We have {<CountUp end={stats.enclosureUrlCount} duration={2.75}/>} media files for your
                        enjoyment!
                    </p>
                </>
            )}
        </div>
    );
};

export default AboutUs;