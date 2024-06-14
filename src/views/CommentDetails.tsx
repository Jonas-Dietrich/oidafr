interface CommentDetailsProps {
    comment: UserComment
}

const CommentDetails:React.FC<CommentDetailsProps> = ({comment}) => {
    return (<>
        <div>
            <p>{comment.title}</p>
            <p>{comment.author}</p>
            <p>{comment.link}</p>
            <p>{comment.description}</p>
        </div>
    </>);
}
 
export default CommentDetails;