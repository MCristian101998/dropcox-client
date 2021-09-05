import { FileTypeDto } from "./FileTypeDto";

export class FilesDto{

    image!: string;
    uuId!: string;
    fileName!: string;
    addedDate!: Date;
    modifiedDate!: Date;
    size!: number;
    uploadedByUser!: string;
    fileType!: FileTypeDto; 
}