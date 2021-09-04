import { FileTypeDto } from "./FileTypeDto";

export class FilesDto{

    uuId!: string;
    fileName!: string;
    addedDate!: Date;
    modifiedDate!: Date;
    size!: number;
    uploadedByUser!: string;
    fileType!: FileTypeDto; 
}