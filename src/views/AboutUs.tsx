import {useEffect, useState} from "react";
import supabase from "@/utils/supabase.tsx";
import rssImage from "@/assets/rssAbout.webp";

const AboutUs = () => {
    const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);

    const fetchNumberOfUsers = async () => {
        supabase.rpc('count_users').then(({data, error}) => {
            if (error) {
                console.error(error);
            } else {
                setNumberOfUsers(data);
            }
        });
    }

    useEffect(() => {
        fetchNumberOfUsers().then(() => console.log('Number of users fetched!'))
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
            <img src={rssImage} alt="Our RSS team - aren't they lovely"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            <p className={"font-bold font-mono text-xl"}>We have {numberOfUsers && numberOfUsers} users!</p>
        </div>
    );
};

export default AboutUs;