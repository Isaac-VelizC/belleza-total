export interface CategoryInterface {
    id: number;
    name: string;
}

export interface GalleryInterface {
    id: number;
    categoryID: number;
    category: string;
    url: string;
    title: string;
    description: string;
}