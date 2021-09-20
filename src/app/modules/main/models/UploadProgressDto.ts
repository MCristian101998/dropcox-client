import { UploadStatusDto } from "./UploadStatusDto";

export class UploadProgressDto{
    file!: File;
    progress!: number;
    status!: UploadStatusDto;
}