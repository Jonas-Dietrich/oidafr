import { useEffect, useState } from "react";
import {getUserComments} from "../utils/requestHelper"
import UserCommentItem from "@/components/UserCommentItem";

const UserComments = () => {

    const [comments, setComments] = useState<UserComment[]>([]);

    useEffect(() => {
        getUserComments("2020-12-12").then(r => setComments(r));
    }, [])
    

    return (<div>
        {comments.map(c => <UserCommentItem comment={c}/>)} 
    </div>);
}
 
export default UserComments;