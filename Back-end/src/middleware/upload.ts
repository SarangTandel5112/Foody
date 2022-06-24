import express, { Request, Response } from "express";
import multer from 'multer';

// function imageFilter(req:Request, file:any, cb:any) {
  // console.log("asfdds")
  //   if (file.mimetype.startsWith("images")) {
  //     cb(null, true);
  //   } else {
  //     cb("Please upload only images.", false);
  //   }

  //   var storage = multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, "/resources/uploads/");
  //     },
  //     filename: (req, file, cb) => {
  //       cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  //     },
  // });
  // return multer({ storage: storage, fileFilter: imageFilter });
  // };

const fileStrogeEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'src/resource/images/')
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now()+ "--" + file.originalname)
  }
})

const upload = multer({storage:fileStrogeEngine})


export default upload;