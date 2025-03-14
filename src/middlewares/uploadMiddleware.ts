import { NextFunction, Request, Response } from "express";
import multer, { StorageEngine, Multer } from "multer";
import path from "path";
import fs from "fs/promises";
import { multerFileType } from "../types/utils";
import { PayloadTooLargeError } from "../utils/ApiError";

const fileUploadPaths: string = "uploads/"; // 파일 저장 경로
const MAXIMUM_FILE_SIZE: number = 10 * 1024 * 1024;

const getFileName = async (
  destination: string,
  filename: string
): Promise<string> => {
  const fileExtension = path.extname(filename); // 확장자 추출
  const baseName = path.basename(filename, fileExtension); // 확장자를 제외한 파일명
  let newFilename = filename;
  let counter = 1;
  while (true) {
    try {
      await fs.access(path.join(destination, newFilename)); // 파일 존재 여부 확인
      newFilename = `${baseName}(${counter})${fileExtension}`; // 중복 시 숫자 추가
      counter++;
    } catch (error) {
      return newFilename; // 파일이 존재하지 않으면 사용 가능
    }
  }
};

const storageOptions: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileUploadPaths);
  },
  filename: async (req, file, cb) => {
    try {
      const uniqueFilename = await getFileName(
        fileUploadPaths,
        file.originalname
      );
      cb(null, uniqueFilename);
    } catch (error) {
      cb(error as Error, "");
    }
  },
});

export const fileUpload: Multer = multer({ storage: storageOptions });

export const validateFileSize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const file: multerFileType | undefined = req.file;
  if (file === undefined) {
    return next();
  }
  const fileSize = getFileSize(file);
  if (!checkIsValidateSize(fileSize)) {
    const filePath: string = path.resolve(file.path);
    deleteFile(filePath);
    return next(new PayloadTooLargeError(`File Size exceeds limit`));
  }
  next();
};

const getFileSize = (fileInfo: multerFileType | undefined): number => {
  return fileInfo?.size || 0;
};

const checkIsValidateSize = (fileSize: number): Boolean => {
  return fileSize <= MAXIMUM_FILE_SIZE;
};

export const deleteFile = async (filePath: string): Promise<Boolean> => {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
