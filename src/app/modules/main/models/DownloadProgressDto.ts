import { UploadDownloadStatusDto } from "./UploadDownloadStatusDto";

export class DownloadProgressDto{
    fileName!: string;
    status!: UploadDownloadStatusDto;
}