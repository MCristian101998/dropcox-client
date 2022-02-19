import { UploadDownloadStatusDto } from "./UploadDownloadStatusDto";

export class UploadProgressDto{
    file!: File;
    progress!: number;
    status!: UploadDownloadStatusDto;
    uploadFileName!: string;
}