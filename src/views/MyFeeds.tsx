import FeedList from "@/components/FeedList.tsx";
import rssChanneller from "../assets/rssChannelManager.webp";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/Dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { isFeedVaild } from "@/utils/requestHelper";


const MyFeeds = () => {

    const addFeed = (url:string) => {
        isFeedVaild(url).then((r) => {
            if (r) {
                
            } else {
                alert("OIDA DES WÜ MIR NID EINI");
            }
        });
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"default"}>Add a Feed</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a new feed</DialogTitle>
                        <DialogDescription>You can add a feed to your personal feed list.</DialogDescription>
                    </DialogHeader>
                    <div>
                        <input type="text" placeholder="http://feedurl.com/rssfeed"></input>
                        <br/>
                        <Button>Add</Button>
                    </div>

                    <DialogClose>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

            <div className={`flex flex-col items-center justify-center mt-5 text-gray-900`}>
                <img src={rssChanneller} alt="Our Rss Article Lirarian"
                    content={"Content credentials: Generated with AI ∙ 4 June 2024 at 15:36 pm"} className="mb-4 size-72" />
            </div>
            <div>
                <FeedList />
            </div>
        </div>
    );
};

export default MyFeeds;