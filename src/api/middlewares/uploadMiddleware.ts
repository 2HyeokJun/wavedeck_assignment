import { NextFunction, Request, Response } from "express";
import multer, { StorageEngine, Multer } from "multer";
import path from "path";
import fs from "fs/promises";
import { multerFileType, RequestBodyType } from "../types/utils";
import { BadRequestError, PayloadTooLargeError } from "../utils/ApiError";
import { AudioUploadRequest } from "../types/generated";

const fileUploadPaths: string = "uploads/"; // 파일 저장 경로
const MAXIMUM_FILE_SIZE: number = 10 * 1024 * 1024;

// 파일명을 읽어온 뒤 중복이면 파일명(1).확장자, 파일명(2).확장자, ...의 형태로 저장
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

/*
1. 파일이 업로드 됐는지 검증
2. req.body.fileSize가 10mb 이하인지 검증
3. 파일명이 multer로 받아온 파일명과 같은지 검증
*/
export const validateFileInfo = async (
  req: RequestBodyType<AudioUploadRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const file: multerFileType | undefined = req.file;
  if (file === undefined) {
    return next(new BadRequestError("file not exists"));
  }
  const fileSize = getFileSize(file);
  const checkIsValidFileName =
    req.body.fileName === file.originalname.normalize("NFC");
  const filePath: string = path.resolve(file.path);

  if (!checkIsValidFileName) {
    deleteFile(filePath);
    return next(new BadRequestError("invalid file metadata"));
  }

  if (!checkIsValidateSize(fileSize)) {
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

// 파일 삭제
export const deleteFile = async (filePath: string): Promise<Boolean> => {
  try {
    await fs.unlink(filePath);
    console.log(`${filePath} 삭제됨`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
