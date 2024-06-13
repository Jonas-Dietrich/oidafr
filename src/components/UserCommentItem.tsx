import { shorten } from "@/utils/generalHelper";

interface UserCommentItemProps {
    comment: UserComment
}

const UserCommentItem:React.FC<UserCommentItemProps> = ({comment}) => {
    return ( <div className="border-2 border-teal-500 border-solid mb-4 rounded-md m-3">
        <div className="p-3">
            <p className="font-bold">{comment.title}</p>
            <div className="pl-3">
                <p>{shorten(comment.description)}</p>
            </div>
        </div>
    </div>);
}
 
export default UserCommentItem;