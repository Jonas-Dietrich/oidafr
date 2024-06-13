import FeedList from "@/components/FeedList.tsx";
import rssChanneller from "../assets/rssChannelManager.webp";
import { Button } from "@/components/ui/button"

const MyFeeds = () => {
    return (
        <div>
            <div>
                <Button variant={"default"}>Add a Feed</Button>
            </div>
            <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
                <img src={rssChanneller} alt="Our Rss Article Lirarian"
                 content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72"/>
            </div>
            <div>
                <FeedList/>
            </div>
        </div>
    );
};

export default MyFeeds;