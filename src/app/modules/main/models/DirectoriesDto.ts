export class DirectoriesDto{
    id!: string;
    fileName!: string;
    parentId?: string;
    path!: string;
    subfolders?: DirectoriesDto[];
}