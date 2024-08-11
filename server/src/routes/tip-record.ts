import express, { Request, Response } from "express"
import TipRecordModel from "../schema/tip-record"

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const records = await TipRecordModel.find();
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});
  

  router.post("/", async (req: Request, res: Response) => {
    try {
      const newRecordBody = req.body;
      const newRecord = new TipRecordModel(newRecordBody);
      const savedRecord = await newRecord.save()
  
      res.status(200).send(savedRecord);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newRecordBody = req.body;
      const record = await TipRecordModel.findByIdAndUpdate(
        id,
        newRecordBody,
        { new: true }
      );
  
      if (!record) return res.status(404).send();
  
      res.status(200).send(record);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const record = await TipRecordModel.findByIdAndDelete(id);
      if (!record) return res.status(404).send();
      res.status(200).send(record);
    } catch (err) {
      res.status(500).send(err);
    }
  });

export default router