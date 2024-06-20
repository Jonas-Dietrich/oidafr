import { useToast } from "@/components/ui/use-toast";
import { fetchChannelByUrl } from "@/utils/requestHelper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const ChannelDetails = () => {

    const { channel_id } = useParams();
    const [channel, setChannel] = useState<RssChannel | null>(null);
    const [httpStatus, setHttpStatus] = useState<number | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        if (channel_id) {
            fetchChannelByUrl(channel_id).then(setChannel).catch(() => {
                toast({
                    variant: "destructive",
                    title: `The feed with url (${channel_id}) was not found.`,
                    description: "Please provide a valid channel url.",
                })
                console.log("not found")
                setHttpStatus(404)
            });
        }
    }, [channel_id]);

    return (<>
        {httpStatus === 404 && <NotFoundPage errorText={"Oops! The feed you are looking for does not exist in our database."} />}
        {channel && <p>It works! {channel.title}</p>}
    </>);
}

export default ChannelDetails;