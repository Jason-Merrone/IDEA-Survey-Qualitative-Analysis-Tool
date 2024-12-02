import { PdfTextLine } from "@prisma/client"
import "~/styles/Comments.css"

interface CommentsProps {
    comments: PdfTextLine[]
}

const Comments = ({ comments }: CommentsProps) => {
    return (
        <>
            {comments.map((comment) => (
                <div className={`comment attr-${comment.attribute?.toLowerCase() ?? "other"}`} key={comment.id}>
                    <p>{comment.lineText}</p>
                </div>
            ))}
        </>
    )
}

export default Comments