import { FileTypeDto } from "./FileTypeDto";

export class FilesDto{

    image!: string;
    id!: string;
    fileName!: string;
    addedDate!: string;
    modifiedDate!: string;
    size!: number;
    parentId?:string;
    path!:string;
    fullPath!: string;
    uploadedByUser!: string;
    fileType!: FileTypeDto; 
}