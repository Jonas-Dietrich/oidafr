import { useEffect, useState } from "react";
import {getPaginatedUserComments} from "../utils/requestHelper"
import UserCommentItem from "@/components/UserCommentItem";
import { Button } from "@/components/ui/button";

const UserComments = () => {

    const [comments, setComments] = useState<UserComment[]>([]);
    const [buttonActive, setButtonActive] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const loadMore = () => {
        const oida = currentPage + 1;
        setCurrentPage(oida);
    }

    useEffect(() => {
        if (currentPage >= 1) {
            getPaginatedUserComments(currentPage).then(data => {
                setComments([...comments, ...data.content]);
                if (currentPage + 1 >= data.pageable.pageNumber) setButtonActive(false);
            });
        }
    }, [currentPage]);

    useEffect(() => {
        getPaginatedUserComments(currentPage).then(r => setComments(r.content));
    }, [])
    

    return (<div>
        {comments.map(c => <UserCommentItem comment={c}/>)} 
        {buttonActive ? <Button onClick={loadMore}>Load more</Button> : <></>}
    </div>);
}
 
export default UserComments;