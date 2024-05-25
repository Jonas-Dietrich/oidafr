import {useEffect, useState} from "react";
import supabase from "@/utils/supabase.tsx";

const AboutUs = () => {
    const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);

    const fetchNumberOfUsers = async () => {
        supabase.rpc('count_users').then(({ data, error }) => {
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
        <div>
            <p>We have {numberOfUsers && numberOfUsers} users!</p>
        </div>
    );
};

export default AboutUs;