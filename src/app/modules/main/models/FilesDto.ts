import { FileTypeDto } from "./FileTypeDto";

export class FilesDto{

    image!: string;
    id!: string;
    fileName!: string;
    addedDate!: string;
    modifiedDate!: string;
    size!: number;
    uploadedByUser!: string;
    fileType!: FileTypeDto; 
}