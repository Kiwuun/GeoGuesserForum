import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react"



export interface TipRecord {
    _id?: string;
    userId: string;
    full_name: string;
    date: Date;
    tip: string;
    country: string;
    tags: string;
    upvotes: number;
    comment_numbers: number;
    liked_comments: string[]
    disliked_comments: string[]
    comments: CommentRecord[]
}

export interface CommentRecord {
  comment: string,
  username: string,
  date_posted: Date
}

interface TipRecordContextType {
    records: TipRecord[];
    addRecord: (record: TipRecord) => void;
    updateRecord: (id: string, updatedRecord: TipRecord) => void;
    deleteRecord: (id: string) => void;
}

export const TipRecordContext = createContext<TipRecordContextType | undefined>(undefined)

export const TipRecordProvider = ({children,}: { children: React.ReactNode;}) => {
    const [records, setRecords] = useState<TipRecord[]>([])
    const { user } = useUser()

    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(
          `http://localhost:3001/tip-record/`
        );
    
        if (response.ok) {
          const records = await response.json();
          setRecords(records);
        }
      };

      useEffect(() => {
        fetchRecords();
      }, [user]);

    const addRecord = async (record: TipRecord) => {
        const response = await fetch("http://localhost:3001/tip-record", {
          method: "POST",
          body: JSON.stringify(record),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        try {
          if (response.ok) {
            const newRecord = await response.json();
            setRecords((prev) => [...prev, newRecord]);
          }
        } catch (err) {}
      };

      const updateRecord = async (id: string, updatedRecord: TipRecord) => {
        const response = await fetch(`http://localhost:3001/tip-record/${id}`, {
          method: "PUT",
          body: JSON.stringify(updatedRecord),
          headers: {
            "Content-Type": "application/json"
          }
        })
        
        try {
          if (response.ok) {
            const newRecord = await response.json();
            setRecords((prev) =>
              prev.map((record) => {
                if (record._id === id) {
                  return newRecord;
                } else {
                  return record;
                }
              })
            );
          }
        } catch (err) {}
    
      } 

      const deleteRecord = async (id: string) => {
        const response = await fetch(
          `http://localhost:3001/tip-record/${id}`,
          {
            method: "DELETE",
          }
        );
    
        try {
          if (response.ok) {
            const deletedRecord = await response.json();
            setRecords((prev) =>
              prev.filter((record) => record._id !== deletedRecord._id)
            );
          }
        } catch (err) {}
      };

    return (
        <TipRecordContext.Provider
          value={{ records, addRecord, updateRecord, deleteRecord }}>
          {children}
        </TipRecordContext.Provider>
      );
};

export const useTipRecords = () => {
    const context = useContext<TipRecordContextType | undefined>(TipRecordContext)

    if(!context) {
        throw new Error("useTipRecords must be used within a TipRecordsContext")
    }

    return context
}