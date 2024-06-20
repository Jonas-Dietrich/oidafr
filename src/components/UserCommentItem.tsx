import { shorten } from "@/utils/generalHelper";

/**
 * Project: RssFrontend
 * Created by: diejoc20
 * Date: 13. 6. 2024
 */

interface UserCommentItemProps {
    comment: UserComment
}

const UserCommentItem:React.FC<UserCommentItemProps> = ({comment}) => {
    return ( <div key={comment.itemId} className="border-2 border-teal-500 border-solid max-w-m p-5 m-4 flex flex-row rounded-lg">
        <div className="p-3 min-w-24">
            <a className="text-xl font-semibold" href={`https://really-sophisticated-story-feed.onrender.com/my-articles/${comment.itemId}`}>{comment.title}</a>
            <div className="pl-3">
                <p>{shorten(comment.description)}</p>
            </div>
        </div>
    </div>);
}
 
export default UserCommentItem;