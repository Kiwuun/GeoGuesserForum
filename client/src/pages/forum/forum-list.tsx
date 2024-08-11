import { useEffect, useState } from "react"
import { TipRecord, useTipRecords } from "../../context/tip-post-context"
import { CommentBox } from "./comments/comment-box"
import { PostBox } from "./posts/post-box"

interface ChildProps {
    country: string
}


export const TipRecordList: React.FC<ChildProps> = ({country}) => {
    const { records } = useTipRecords()

    const [showComments, setShowComments] = useState(new Array(records.length).fill(false))
    const [filteredRecords, setFilteredRecords] = useState<TipRecord[]>([])

    const toggleComment = (index: number) => {
        setShowComments(prev => {
          const newShowComments = [...prev];
          newShowComments[index] = !newShowComments[index];
          return newShowComments;
        });
      };

      const filterRecordsByCountryParam = () => {
        setFilteredRecords(country ? records.filter(record => record.country === country) : records);
      }

      useEffect(() => {
        filterRecordsByCountryParam()

      }, [country, records]);

    return (
        <div>
            {filteredRecords.map((record, index) => {
                return (
                    <div className="border rouned border-cyan-950 p-2" key={index}>
                        <PostBox record={record}/>
                        <p onClick={() => toggleComment(index)} className="hover:cursor-pointer select-none font-bold">Comments</p>
                        {showComments[index] ? <CommentBox record={record}/> : null}
                    </div>
                )
            })}
        </div>
    )
}